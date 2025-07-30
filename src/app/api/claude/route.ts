import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Curtis API route called');
    const { voiceInput, contextPrompt } = await request.json();
    console.log('Voice input:', voiceInput);
    console.log('Context prompt length:', contextPrompt?.length || 0);

    if (!voiceInput) {
      return NextResponse.json({ error: 'Voice input is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('No API key found in environment');
      return NextResponse.json({ error: 'Curtis API key not configured' }, { status: 500 });
    }
    
    console.log('API key found, length:', apiKey.length);

    // Combine context prompt with voice input
    const fullPrompt = `${contextPrompt || ''}\n\nUser voice input: ${voiceInput}`;
    console.log('Full prompt length:', fullPrompt.length);

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
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ]
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
