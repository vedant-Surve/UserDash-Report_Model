import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    role: 'Normal User' 
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Validation: Check if Email or Username is already taken
    if (existingUsers.find(u => u.email === formData.email || u.username === formData.username)) {
      alert("Username or Email already exists!");
      return;
    }

    // Save civilian to localStorage
    localStorage.setItem('users', JSON.stringify([...existingUsers, formData]));
    alert("Signup Successful! You can now login with your email or username.");
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Citizen Signup</h2>
        <input 
          type="text" 
          placeholder="Username" 
          required 
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;