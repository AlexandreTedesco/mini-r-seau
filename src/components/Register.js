import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register; 