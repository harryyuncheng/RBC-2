import { useState, useCallback } from 'react';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  hasScreenCapture?: boolean;
  hasDOMContext?: boolean;
}

export const useConversation = () => {
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [curtisResponse, setCurtisResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sendToCurtis = useCallback(async (
    voiceText: string,
    contextPrompt: string,
    screenCapture: string | null = null,
    domContext: string | null = null
  ) => {
    if (!voiceText.trim()) return;
    
    console.log('Sending to Curtis:', { voiceText, hasScreenCapture: !!screenCapture, hasDOMContext: !!domContext });
    
    setIsProcessing(true);
    setCurtisResponse("");
    
    try {
      console.log('Sending request to Curtis API with:', {
        hasVoiceInput: !!voiceText,
        hasContextPrompt: !!contextPrompt,
        hasScreenCapture: !!screenCapture,
        hasDOMContext: !!domContext,
        conversationHistoryLength: conversationHistory.length,
        totalExchanges: Math.floor(conversationHistory.length / 2),
        willReinforceContext: conversationHistory.length > 0 && Math.floor(conversationHistory.length / 2) % 5 === 0
      });

      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceInput: voiceText,
          contextPrompt: contextPrompt,
          screenCapture: screenCapture,
          domContext: domContext,
          conversationHistory: conversationHistory
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Curtis responded successfully');
        const curtisResponseText = data.response;
        setCurtisResponse(curtisResponseText);
        
        setConversationHistory(prev => {
          const newHistory = [
            ...prev,
            {
              role: 'user',
              content: voiceText,
              timestamp: Date.now(),
              hasScreenCapture: !!screenCapture,
              hasDOMContext: !!domContext
            },
            {
              role: 'assistant',
              content: curtisResponseText,
              timestamp: Date.now()
            }
          ];
          
          return newHistory.slice(-40);
        });
      } else {
        console.warn('Curtis API error:', data.error || 'Unknown API error');
        setCurtisResponse(`Error: ${data.error || 'Unknown API error'}`);
      }
    } catch (error) {
      console.warn('Failed to send to Curtis:', error instanceof Error ? error.message : 'Unknown error');
      setCurtisResponse(`Failed to connect to Curtis API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  }, [conversationHistory]);

  const clearConversationHistory = useCallback(() => {
    setConversationHistory([]);
    setCurtisResponse("");
  }, []);

  return {
    conversationHistory,
    curtisResponse,
    isProcessing,
    sendToCurtis,
    clearConversationHistory,
    setCurtisResponse
  };
};
