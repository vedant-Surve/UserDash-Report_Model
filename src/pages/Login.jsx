import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const { identifier, password } = loginData;

    // 1. Check Official Hardcoded Credentials (Admin/Gov)
    if ((identifier === 'admin@123.gmail.com' && password === '1234')) {
      login({ email: 'admin@123.gmail.com', role: 'Admin' });
      navigate('/admin');
      return;
    }
    if ((identifier === 'Goverment@123.gmail.com' && password === '12345')) {
      login({ email: 'Goverment@123.gmail.com', role: 'Government Authority' });
      navigate('/authority');
      return;
    }

    // 2. Check LocalStorage for Normal Users (Matches Email OR Username)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => 
      (u.email === identifier || u.username === identifier) && u.password === password
    );

    if (foundUser) {
      login(foundUser);
      navigate('/user');
    } else {
      alert("Invalid credentials. Please check your username/email and password.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>CivicLens Login</h2>
        <input 
          type="text" 
          placeholder="Username or Email" 
          required 
          onChange={(e) => setLoginData({...loginData, identifier: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
        />
        <button type="submit">Sign In</button>
        <p>Citizen? <a href="/">Sign up</a></p>
      </form>
    </div>
  );
};

export default Login;