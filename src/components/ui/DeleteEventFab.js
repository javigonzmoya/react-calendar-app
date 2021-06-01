import React from 'react';

import { eventDeleted } from '../../actions/events';
import { useDispatch } from 'react-redux';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleFabButton = () => {
    dispatch(eventDeleted());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleFabButton}>
      <i className="fas fa-trash"></i>
      <span> Borrar</span>
    </button>
  );
};
