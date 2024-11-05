import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Post from './components/Post';
import Home from './pages/Home';
import CreatePost from './components/CreatePost';
import Login from './pages/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
