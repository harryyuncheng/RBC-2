import { useState, useCallback } from 'react';

export const parseNameFromSpeech = (text: string): { firstName: string } | null => {
  const normalizedText = text.toLowerCase().trim();
  const namePattern = /(?:hi|hello|hey)?,?\s*my\s+name\s+is\s+([a-zA-Z]+)/i;
  
  const match = normalizedText.match(namePattern);
  if (match) {
    const firstName = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
    return { firstName };
  }
  
  return null;
};

export const useUserName = () => {
  const [nameUpdateStatus, setNameUpdateStatus] = useState("");

  const updateUserName = useCallback(async (firstName: string) => {
    try {
      setNameUpdateStatus("Updating your name...");
      
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName: '',
          fullName: firstName
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setNameUpdateStatus(`✓ Name updated to ${data.user.fullName}`);
        setTimeout(() => setNameUpdateStatus(""), 3000);
      } else {
        setNameUpdateStatus(`✗ Failed to update name: ${data.error}`);
        setTimeout(() => setNameUpdateStatus(""), 3000);
      }
    } catch (error) {
      console.error('Failed to update user name:', error);
      setNameUpdateStatus("✗ Failed to update name");
      setTimeout(() => setNameUpdateStatus(""), 3000);
    }
  }, []);

  return {
    nameUpdateStatus,
    updateUserName
  };
};
