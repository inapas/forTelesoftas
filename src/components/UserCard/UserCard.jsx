import React from 'react';

const UserCard = ({ user, onSelect }) => {
  return (
    
    <div onClick={() => onSelect(user)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
