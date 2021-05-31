import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleFabButton = () => {
    dispatch(openModal());
  };
  return (
    <button className="btn btn-primary fab" onClick={handleFabButton}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
