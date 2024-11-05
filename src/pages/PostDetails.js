import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/posts/${id}?populate=user`);
        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du post:', error);
        setError(error.message);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div>{error}</div>; // Affichez l'erreur si elle se produit
  }

  if (!post || !post.data) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="post-details-container">
      <Breadcrumb />
      <h1>{post.data.attributes.title}</h1>
      <p>{post.data.attributes.text}</p>
      <p>Publié par: {post.data.attributes.user ? post.data.attributes.user.username : 'Utilisateur inconnu'}</p>
    </div>
  );
};

export default PostDetails;