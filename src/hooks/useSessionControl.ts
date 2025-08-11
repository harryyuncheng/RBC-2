import { useState, useEffect, useCallback, useRef } from 'react';

interface SessionState {
  isActive: boolean;
  elapsedTime: number; // in seconds
  conversationId: string | null;
  lastActiveTime: number | null;
}

const SESSION_STORAGE_KEY = 'curtis-session-state';

export const useSessionControl = () => {
  const [sessionState, setSessionState] = useState<SessionState>({
    isActive: false,
    elapsedTime: 0,
    conversationId: null,
    lastActiveTime: null
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Load session state from storage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsedState = JSON.parse(saved);
        setSessionState(parsedState);
      }
    } catch (error) {
      console.warn('Failed to load session state:', error);
    }
  }, []);

  // Save session state to storage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionState));
    } catch (error) {
      console.warn('Failed to save session state:', error);
    }
  }, [sessionState]);

  // Timer management
  useEffect(() => {
    if (sessionState.isActive) {
      startTimeRef.current = Date.now() - (sessionState.elapsedTime * 1000);
      
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const newElapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setSessionState(prev => ({
            ...prev,
            elapsedTime: newElapsedTime,
            lastActiveTime: Date.now()
          }));
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      startTimeRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [sessionState.isActive, sessionState.elapsedTime]);

  const startSession = useCallback(() => {
    const conversationId = sessionState.conversationId || `session-${Date.now()}`;
    
    setSessionState(prev => ({
      ...prev,
      isActive: true,
      conversationId,
      lastActiveTime: Date.now()
    }));
  }, [sessionState.conversationId]);

  const pauseSession = useCallback(() => {
    setSessionState(prev => ({
      ...prev,
      isActive: false,
      lastActiveTime: Date.now()
    }));
  }, []);

  const resetSession = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setSessionState({
      isActive: false,
      elapsedTime: 0,
      conversationId: null,
      lastActiveTime: null
    });

    // Clear from storage
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear session state:', error);
    }
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const getButtonText = useCallback((): string => {
    if (sessionState.isActive) {
      return formatTime(sessionState.elapsedTime);
    }
    
    // Determine if this is a new or existing conversation
    const hasExistingSession = sessionState.conversationId && sessionState.elapsedTime > 0;
    return hasExistingSession ? 'Resume Session' : 'Begin Session';
  }, [sessionState.isActive, sessionState.conversationId, sessionState.elapsedTime, formatTime]);

  const toggleSession = useCallback(() => {
    if (sessionState.isActive) {
      pauseSession();
    } else {
      startSession();
    }
  }, [sessionState.isActive, startSession, pauseSession]);

  return {
    sessionState,
    startSession,
    pauseSession,
    resetSession,
    toggleSession,
    getButtonText,
    formatTime,
    isNewConversation: !sessionState.conversationId || sessionState.elapsedTime === 0
  };
};
