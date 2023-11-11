import React from 'react';
import { useUser } from '../context/UserContext';

const Edit = () => {
  const { currentUser } = useUser();

  // Only show Edit component if the user is a manager
  return (
    <div>
      {currentUser && currentUser.role === 'manager' && <div>HI</div>}
    </div>
  );
};

export default Edit;
