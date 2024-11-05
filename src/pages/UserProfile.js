import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`http://localhost:1337/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Profil de {user.username}</h1>
      <p>Description: {user.description}</p>
      <h2>Posts de {user.username}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile; 