import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </div>
  );
};

export default PostItem;
