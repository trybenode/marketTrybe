import React, { createContext, useState, useContext } from 'react';
// context provider manages user-related state and makes it accessible to all components in the app
// Create context
const UserContext = createContext();

// Context provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    userId: 'user1',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+1234567890',
    matricNumber: 'LCU/UG/XX/XXXX',
    profilePicture: '',
    address: '123 Market Street, Cityville',
    locationType: 'hostelite',
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
  );
};

// Hook for easier access
export const useUser = () => useContext(UserContext);
