import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Login = () => {
  const { currentUser, login, logout, register } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newCustomerUsername, setNewCustomerUsername] = useState('');
  const [newCustomerPassword, setNewCustomerPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('customer');

  useEffect(() => {
    if (currentUser) {
      setUsername('');
      setPassword('');
      setIsRegistering(false);
    }
  }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(username, password, role);
  };

  const handleCreateCustomerAccount = (e) => {
    e.preventDefault();
    register(newCustomerUsername, newCustomerPassword, 'customer');
    setNewCustomerUsername('');
    setNewCustomerPassword('');
  };

  const handleLogout = () => {
    logout();
  };

  if (currentUser) {
    return (
      <div>
        <p>Welcome, {currentUser.username}! You are logged in as a {currentUser.role}.</p>
        <button onClick={handleLogout}>Logout</button>
        {currentUser.role === 'salesman' && (
          <div>
            <h3>Create Customer Account</h3>
            <form onSubmit={handleCreateCustomerAccount}>
              <input type="text" value={newCustomerUsername} onChange={(e) => setNewCustomerUsername(e.target.value)} placeholder="Username" required />
              <input type="password" value={newCustomerPassword} onChange={(e) => setNewCustomerPassword(e.target.value)} placeholder="Password" required />
              <button type="submit">Create Account</button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {isRegistering ? (
        // Registration Form
        <form onSubmit={handleRegister}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
            <option value="salesman">Salesman</option>
          </select>
          <button type="submit">Register</button>
          <button type="button" onClick={() => setIsRegistering(false)}>Back to Login</button>
        </form>
      ) : (
        // Login Form
        <form onSubmit={handleLogin}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
          <button type="button" onClick={() => setIsRegistering(true)}>Register</button>
        </form>
      )}
    </div>
  );
};

export default Login;
