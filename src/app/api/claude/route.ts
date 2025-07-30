import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Curtis API route called');
    const { voiceInput, contextPrompt, screenCapture, domContext, conversationHistory } = await request.json();
    console.log('Voice input:', voiceInput);
    console.log('Context prompt length:', contextPrompt?.length || 0);
    console.log('Screen capture provided:', !!screenCapture);
    console.log('DOM context provided:', !!domContext);
    console.log('Conversation history items:', conversationHistory?.length || 0);

    if (!voiceInput) {
      return NextResponse.json({ error: 'Voice input is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('No API key found in environment');
      return NextResponse.json({ error: 'Curtis API key not configured' }, { status: 500 });
    }
    
    console.log('API key found, length:', apiKey.length);

    // Build messages array with conversation history
    const messages = [];

    // Add conversation history first (if any)
    if (conversationHistory && conversationHistory.length > 0) {
      console.log('Adding conversation history with', conversationHistory.length, 'items');
      
      // If we have a lot of history, include a summary at the beginning
      if (conversationHistory.length > 20) {
        const recentHistory = conversationHistory.slice(-20); // Last 20 messages
        const olderHistory = conversationHistory.slice(0, -20);
        
        // Create a summary of older conversation
        const userMessages = olderHistory.filter(item => item.role === 'user').length;
        const assistantMessages = olderHistory.filter(item => item.role === 'assistant').length;
        const hasScreenCaptures = olderHistory.some(item => item.hasScreenCapture);
        const hasDOMContext = olderHistory.some(item => item.hasDOMContext);
        
        const conversationSummary = `[Previous conversation context: ${userMessages} user messages and ${assistantMessages} assistant responses${hasScreenCaptures ? ', included screen captures' : ''}${hasDOMContext ? ', included page context' : ''}. This conversation continues below.]`;
        
        // Add context prompt with summary for long conversations
        if (contextPrompt) {
          messages.push({
            role: 'user',
            content: `${contextPrompt}\n\n${conversationSummary}\n\nUser voice input: ${recentHistory[0].content}`
          });
          
          // Add the rest of recent history
          for (let i = 1; i < recentHistory.length; i++) {
            const item = recentHistory[i];
            messages.push({
              role: item.role,
              content: item.content
            });
          }
        } else {
          // Add summary as first message
          messages.push({
            role: 'user',
            content: conversationSummary
          });
          
          // Add recent history
          recentHistory.forEach(item => {
            messages.push({
              role: item.role,
              content: item.content
            });
          });
        }
      } else {
        // Normal flow for shorter conversations
        // Add context prompt as system context at the beginning if we have history
        if (contextPrompt) {
          // For the first message, include the context prompt
          const firstHistoryItem = conversationHistory[0];
          if (firstHistoryItem.role === 'user') {
            messages.push({
              role: 'user',
              content: `${contextPrompt}\n\nUser voice input: ${firstHistoryItem.content}`
            });
            
            // Add the rest of the history
            for (let i = 1; i < conversationHistory.length; i++) {
              const item = conversationHistory[i];
              messages.push({
                role: item.role,
                content: item.content
              });
            }
          } else {
            // If first item isn't user, add context as separate message
            messages.push({
              role: 'user',
              content: contextPrompt
            });
            
            // Add all history
            conversationHistory.forEach(item => {
              messages.push({
                role: item.role,
                content: item.content
              });
            });
          }
        } else {
          // No context prompt, just add history
          conversationHistory.forEach(item => {
            messages.push({
              role: item.role,
              content: item.content
            });
          });
        }
      }
    }

    // Build current message content
    const currentMessageContent = [];
    
    // Add current voice input and context
    let textContent = voiceInput;
    
    // If this is the first message and no history, include context prompt
    if (messages.length === 0 && contextPrompt) {
      textContent = `${contextPrompt}\n\n[This is the start of a conversation with a user who is currently on the RBC website/app]\n\nUser voice input: ${voiceInput}`;
    } else {
      // For ongoing conversations, periodically remind Curtis of context
      const totalExchanges = conversationHistory ? Math.floor(conversationHistory.length / 2) : 0;
      const shouldReinforceContext = totalExchanges > 0 && totalExchanges % 3 === 0; // Every 3 exchanges (more frequent)
      
      if (shouldReinforceContext && contextPrompt) {
        textContent = `[Context reminder - Remember: ${contextPrompt}]\n\nUser voice input: ${voiceInput}`;
      } else {
        textContent = `User voice input: ${voiceInput}`;
      }
    }
    
    // Add DOM context if provided
    if (domContext) {
      textContent += `\n\nCurrent page context:\n${domContext}`;
    }
    
    currentMessageContent.push({
      type: 'text',
      text: textContent
    });

    // Add screen capture if provided
    if (screenCapture) {
      // Extract base64 data (remove data:image/jpeg;base64, prefix)
      const base64Data = screenCapture.split(',')[1];
      currentMessageContent.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: 'image/jpeg',
          data: base64Data
        }
      });
    }

    // Add current message to messages array
    messages.push({
      role: 'user',
      content: currentMessageContent
    });

    console.log('Total messages in conversation:', messages.length);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Curtis API error status:', response.status);
      console.error('Curtis API error details:', errorData);
      return NextResponse.json({ 
        error: 'Failed to get response from Curtis API',
        details: errorData,
        status: response.status
      }, { status: response.status });
    }

    console.log('Curtis API response successful');
    const data = await response.json();
    console.log('Response data structure:', Object.keys(data));
    
    return NextResponse.json({ 
      response: data.content[0].text,
      usage: data.usage 
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
