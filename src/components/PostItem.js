import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div>
      <Link to={`/user/${post.user.username}`}>{post.user.username}</Link>
      <p>{post.text}</p>
    </div>
  );
};

export default PostItem; 