import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initialize Official Accounts in LocalStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    const officialAccounts = [
      { email: 'admin@123.gmail.com', password: '1234', role: 'Admin' },
      { email: 'Goverment@123.gmail.com', password: '12345', role: 'Government Authority' }
    ];

    // Only add them if they aren't already there to avoid duplicates
    let updatedUsers = [...existingUsers];
    let added = false;

    officialAccounts.forEach(official => {
      const exists = existingUsers.some(u => u.email === official.email);
      if (!exists) {
        updatedUsers.push(official);
        added = true;
      }
    });

    if (added) {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    // 2. Check for active session
    const savedUser = localStorage.getItem('civicUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('civicUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civicUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);