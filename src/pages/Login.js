import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import Breadcrumb from '../components/Breadcrumb';
import './Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      navigate('/profile'); // Redirige si l'utilisateur est déjà connecté
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { identifier, password };
    const resultAction = await dispatch(login(userData));
    if (login.fulfilled.match(resultAction)) {
      localStorage.setItem('token', resultAction.payload.jwt);
      localStorage.setItem('user', JSON.stringify(resultAction.payload.user));
      navigate('/profile');
    } else {
      console.error('Erreur de connexion');
    }
  };

  return (
    <div className="login-container">
      <Breadcrumb />
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email ou Nom d'utilisateur"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login; 