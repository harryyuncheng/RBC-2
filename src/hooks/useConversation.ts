import { useState, useCallback } from 'react';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  hasDOMContext?: boolean;
}

// Extract only the advisor speakable script from the full Curtis response
function extractAdvisorScript(full: string): string {
  if (!full) return '';
  let text = full.trim();

  const advIdx = text.toLowerCase().indexOf('advisor script:');
  if (advIdx !== -1) {
    text = text.substring(advIdx + 'advisor script:'.length).trimStart();
  }
  const structIdx = text.toLowerCase().indexOf('structured actions:');
  if (structIdx !== -1) {
    text = text.substring(0, structIdx).trimEnd();
  }
  const actionsIdx = text.indexOf('ACTIONS: [');
  if (actionsIdx !== -1) {
    text = text.substring(0, actionsIdx).trimEnd();
  }
  text = text.replace(/\r\n/g, '\n');
  // Ensure inline bullets are line separated while otherwise preserving original line breaks
  text = text.replace(/([^\n])\s-\s+/g, (m, p1) => `${p1}\n- `);
  // Do NOT collapse multiple blank lines to preserve original spacing as requested
  return text.replace(/\s+$/,'');
}

export const useConversation = () => {
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [curtisResponse, setCurtisResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sendToCurtis = useCallback(async (
    voiceText: string,
    contextPrompt: string,
    domContext: string | null = null
  ) => {
    if (!voiceText.trim()) return;
    // Minimal logging requested
    console.log('Voice input:', voiceText);
    setIsProcessing(true);
    setCurtisResponse("");
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voiceInput: voiceText,
          contextPrompt: contextPrompt,
          domContext: domContext,
          conversationHistory: conversationHistory
        })
      });
      const data = await response.json();
      if (response.ok) {
        const rawResponseText: string = data.response || '';
        // Minimal logging requested
        console.log('Curtis raw response:', rawResponseText);
        const cleanedScript = extractAdvisorScript(rawResponseText);
        setCurtisResponse(cleanedScript);
        setConversationHistory(prev => {
          const newHistory: ConversationMessage[] = [
            ...prev,
            {
              role: 'user',
              content: voiceText,
              timestamp: Date.now(),
              hasDOMContext: !!domContext
            },
            {
              role: 'assistant',
              content: cleanedScript,
              timestamp: Date.now()
            }
          ];
          return newHistory.slice(-40);
        });
      } else {
        setCurtisResponse(`Error: ${data.error || 'Unknown API error'}`);
      }
    } catch (error) {
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
