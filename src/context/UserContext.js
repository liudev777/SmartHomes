import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the user
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    // Retrieve users from local storage
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState({}); 

  // Sync users to local storage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // finding the user in the users list
  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true; // Login successful
    }
    return false; // Login failed
  };

  // Function to update orders for the current user
  const updateUserOrders = (updatedOrders) => {
    if (currentUser) {
      // Update orders for the current user
      const updatedUsers = users.map(user => {
        if (user.id === currentUser.id) {
          return { ...user, orders: updatedOrders };
        }
        return user;
      });

      setUsers(updatedUsers); // Update the users array
      setCurrentUser({ ...currentUser, orders: updatedOrders }); // Update the currentUser
    }
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

  const updateCheckoutInfo = (info) => {
    if (currentUser) {
      // Ensure currentUser.orders is an array before pushing new info
      if (!Array.isArray(currentUser.orders)) {
        currentUser.orders = [];
      }
      currentUser.orders.push(info);
      setCheckoutInfo(info);
    }
  };


  // Export the user data and auth functions
  return (
    <UserContext.Provider value={{ currentUser, login, logout, register, checkoutInfo, updateCheckoutInfo, updateUserOrders }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => useContext(UserContext);
