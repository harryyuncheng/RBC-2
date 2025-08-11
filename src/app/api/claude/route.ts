import { NextRequest, NextResponse } from 'next/server';

interface ConversationHistoryItem {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
  hasDOMContext?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CurrentMessageContent {
  type: 'text';
  text: string;
}

interface ApiResponse {
  content: Array<{ text: string }>;
  usage: { input_tokens: number; output_tokens: number; [key: string]: unknown };
}

export async function POST(request: NextRequest) {
  try {
    const { voiceInput, contextPrompt, domContext, conversationHistory }: {
      voiceInput: string;
      contextPrompt?: string;
      domContext?: string;
      conversationHistory?: ConversationHistoryItem[];
    } = await request.json();

    if (!voiceInput) {
      return NextResponse.json({ error: 'Voice input is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('No API key found in environment');
      return NextResponse.json({ error: 'Curtis API key not configured' }, { status: 500 });
    }

    // Build messages array with conversation history
    const messages: Message[] = [];

    // Add conversation history first (if any)
    if (conversationHistory && (conversationHistory as ConversationHistoryItem[]).length > 0) {
      const typedHistory = conversationHistory as ConversationHistoryItem[];

      // If we have a lot of history, include a summary at the beginning
      if (typedHistory.length > 20) {
        const recentHistory = typedHistory.slice(-20); // Last 20 messages
        const olderHistory = typedHistory.slice(0, -20);
        
        // Create a summary of older conversation
        const userMessages = olderHistory.filter((item: ConversationHistoryItem) => item.role === 'user').length;
        const assistantMessages = olderHistory.filter((item: ConversationHistoryItem) => item.role === 'assistant').length;
        const hasDOMContext = olderHistory.some((item: ConversationHistoryItem) => item.hasDOMContext);
        
        const conversationSummary = `[Previous conversation context: ${userMessages} user messages and ${assistantMessages} assistant responses${hasDOMContext ? ', included page context' : ''}. This conversation continues below.]`;
        
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
          recentHistory.forEach((item: ConversationHistoryItem) => {
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
          const firstHistoryItem = typedHistory[0];
          if (firstHistoryItem.role === 'user') {
            messages.push({
              role: 'user',
              content: `${contextPrompt}\n\nUser voice input: ${firstHistoryItem.content}`
            });
            
            // Add the rest of the history
            for (let i = 1; i < typedHistory.length; i++) {
              const item = typedHistory[i];
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
            typedHistory.forEach((item: ConversationHistoryItem) => {
              messages.push({
                role: item.role,
                content: item.content
              });
            });
          }
        } else {
          // No context prompt, just add history
          typedHistory.forEach((item: ConversationHistoryItem) => {
            messages.push({
              role: item.role,
              content: item.content
            });
          });
        }
      }
    }

    // Build current message content
    const currentMessageContent: CurrentMessageContent[] = [];
    
    // Add current voice input and context
    let textContent = voiceInput as string;
    
    // If this is the first message and no history, include context prompt
    if (messages.length === 0 && contextPrompt) {
      textContent = `${contextPrompt}\n\n[This is the start of a conversation with a user who is currently on the RBC website/app]\n\nUser voice input: ${voiceInput}`;
    } else {
      // For ongoing conversations, periodically remind Curtis of context
      const totalExchanges = (conversationHistory ? Math.floor((conversationHistory as ConversationHistoryItem[]).length / 2) : 0);
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

    // Add current message to messages array
    // Convert 'currentMessageContent' to a string before assigning
    messages.push({
      role: 'user',
      content: currentMessageContent.map(item => item.text).join('\n')
    });

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

    const data: ApiResponse = await response.json();

    // Minimal logging: log the uncensored Claude output content as returned by API
    try {
      const rawTextParts = Array.isArray(data.content)
        ? data.content.map((c: { text: string }) => (c && typeof c === 'object' && typeof c.text === 'string') ? c.text : '')
        : [];
      const fullCombined = rawTextParts.filter(Boolean).join('\n\n');
      if (fullCombined) console.log('Curtis raw API output:', fullCombined);
    } catch { /* no-op */ }

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
