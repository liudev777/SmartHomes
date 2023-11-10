import React, { createContext, useContext, useState } from 'react';

// Create a context for the user
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // list of users
  const [currentUser, setCurrentUser] = useState(null);

  // finding the user in the users list
  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true; // Login successful
    }
    return false; // Login failed
  };

  // Logout the current user
  const logout = () => {
    setCurrentUser(null);
  };

  //add a new user to users list
  const register = (username, password, role) => {
    const userExists = users.some(u => u.username === username);
    if (!userExists) {
      const newUser = { id: users.length + 1, username, password, role };
      setUsers([...users, newUser]);
      setCurrentUser(newUser); // Automatically login the new user
      return true; // Registration successful
    }
    return false; // Registration failed, user exists
  };

  // Export the user data and auth functions
  return (
    <UserContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => useContext(UserContext);
