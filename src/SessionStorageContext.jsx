import React, { createContext, useContext, useState } from 'react';

const SessionStorageContext = createContext();

export function useSessionStorageContext() {
  return useContext(SessionStorageContext);
}

export function SessionStorageProvider({ children }) {
  // State that will be synced with sessionStorage
  const [sessionData, setSessionData] = useState(() => {
    // Initialize the state with data from sessionStorage if available
    const storedData = sessionStorage.getItem('vikanSessionData');
    return storedData
      ? JSON.parse(storedData)
      : { isAdmin: false, hasCookie: false };
  });

  // Update the state and sessionStorage when needed
  const updateSessionData = (newData) => {
    setSessionData(newData);
    sessionStorage.setItem('vikanSessionData', JSON.stringify(newData));
  };

  return (
    <SessionStorageContext.Provider
      value={{
        isAdmin: sessionData.isAdmin,
        hasCookie: sessionData.hasCookie,
        updateSessionData,
      }}
    >
      {children}
    </SessionStorageContext.Provider>
  );
}


