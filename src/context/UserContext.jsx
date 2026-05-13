import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    // Initialize from localStorage if available
    return localStorage.getItem('userId') || 'u2';
  });

  // Sync userId changes to localStorage
  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
