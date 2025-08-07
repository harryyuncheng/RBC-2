'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  firstName: string;
  lastName: string;
  fullName: string;
};

type UserData = {
  user: User;
} | null;

interface UserContextType {
  userData: UserData;
  isLoading: boolean;
  refetchUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoading: true,
  refetchUserData: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refetchUserData = async () => {
    await fetchUserData();
  };

  return (
    <UserContext.Provider value={{ userData, isLoading, refetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
