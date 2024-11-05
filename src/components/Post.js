import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { postAtom } from '../atoms/postAtom';

const Post = () => {
  const [posts, setPosts] = useAtom(postAtom);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    setPosts([...posts, { content }]);
    setContent('');
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Créer un post</button>
      <div>
        {posts.map((post, index) => (
          <div key={index}>{post.content}</div>
        ))}
      </div>
    </div>
  );
};

export default Post; 