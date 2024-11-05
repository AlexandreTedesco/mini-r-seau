import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';
import axios from 'axios';

const Auth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await axios.post('/api/auth/login', { email, password });
    setAuth({ isAuthenticated: true, user: response.data.user });
  };

  const handleSignup = async () => {
    const response = await axios.post('/api/auth/signup', { email, password });
    setAuth({ isAuthenticated: true, user: response.data.user });
  };

  return (
    <div>
      {/* Formulaire de connexion / inscription */}
      <h2>Connexion</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleLogin}>Se connecter</button>
      <button onClick={handleSignup}>S'inscrire</button>
    </div>
  );
};

export default Auth; 