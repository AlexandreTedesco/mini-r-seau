import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postSlice';
import { logout } from '../redux/authSlice';
import Breadcrumb from '../components/Breadcrumb';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <div className="home-container">
      <Breadcrumb />
      <header className="header">
        <h1>Bienvenue !</h1>
        <nav className="nav-buttons">
          {user ? (
            <>
              <Link to="/profile">
                <button>Mon Profil</button>
              </Link>
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button>S'inscrire</button>
              </Link>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
            </>
          )}
          <Link to="/create-post">
            <button>Créer un post</button>
          </Link>
        </nav>
      </header>
      <div className="posts-container">
        {Array.isArray(posts) ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>{post.username || 'Utilisateur inconnu'}</h2>
              <p>{post.content}</p>
              <Link to={`/post/${post.id}`} className="view-button">Voir</Link>
            </div>
          ))
        ) : (
          <p>Aucun post à afficher.</p>
        )}
      </div>
    </div>
  );
};

export default Home; 