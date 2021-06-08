import React from 'react';

import { eventsStartDeleted } from '../../actions/events';
import { useDispatch } from 'react-redux';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleFabButton = () => {
    dispatch(eventsStartDeleted());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleFabButton}>
      <i className="fas fa-trash"></i>
      <span> Borrar</span>
    </button>
  );
};
