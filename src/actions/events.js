import { types } from '../types/types';

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActivate = (event) => ({
  type: types.eventSetActivate,
  payload: event,
});

export const eventClearActivateEvent = (event) => ({
  type: types.eventClearActiveEvent,
});

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
