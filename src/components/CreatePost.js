import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';
import { postAtom } from '../atoms/postAtom';
import Breadcrumb from './Breadcrumb';
import './CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [auth] = useAtom(authAtom);
  const [posts, setPosts] = useAtom(postAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.user || !auth.user.id) {
      console.error('Utilisateur non authentifié');
      return;
    }
    try {
      const newPost = {
        data: {
          text: content,
          user: auth.user.id,
        },
      };
      const response = await fetch('http://localhost:1337/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Détails de l\'erreur:', errorData);
        throw new Error(`Erreur lors de la création du post: ${errorData.error?.message || 'Erreur inconnue'}`);
      }
      const savedPost = await response.json();
      setPosts([...posts, savedPost.data]);
      setContent('');
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
    }
  };

  return (
    <div className="create-post-container">
      <Breadcrumb />
      <h1>Créer un nouveau post</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Écrivez votre post ici..." required />
        <button type="submit">Créer un post</button>
      </form>
    </div>
  );
};

export default CreatePost; 