import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Login = () => {
  const { currentUser, login, logout, register } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('customer');

  useEffect(() => {
    // If there's a logged in user, reset the form
    if (currentUser) {
      setUsername('');
      setPassword('');
    }
  }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (register(username, password, role)) {
      console.log('Registration successful');
    } else {
      console.log('Username already taken');
    }
  };

  const handleLogout = () => {
    logout();
    console.log('Logged out');
  };

  if (currentUser) {
    return (
      <div>
        <p>Welcome, {currentUser.username}! You are logged in as a {currentUser.role}.</p>
        <button onClick={handleLogout}>Logout</button>
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
