import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';
import { postAtom } from '../atoms/postAtom';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import './Profile.css';

const Profile = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [posts] = useAtom(postAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(auth.user?.description || '');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...auth.user, description };
    setAuth({ ...auth, user: updatedUser });
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <Breadcrumb />
      <h1>Profil de {auth.user?.username || 'Utilisateur inconnu'}</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Décrivez-vous ici..."
            required
          />
          <button type="submit">Sauvegarder</button>
          <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
        </form>
      ) : (
        <>
          <p>Description: {description || 'Aucune description fournie.'}</p>
          <button onClick={handleEditClick}>Modifier le Profil</button>
        </>
      )}
      <h2>Mes Posts</h2>
      <ul>
        {posts.filter(post => post.userId === auth.user?.id).map(post => (
          <li key={post.id}>
            {post.content}
          </li>
        ))}
      </ul>
      <Link to="/create-post">
        <button>Créer un Post</button>
      </Link>
    </div>
  );
};

export default Profile; 