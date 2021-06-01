import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'cumpleaños del jefe',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      note: 'comprar pan',
      user: {
        _id: '123',
        name: 'Javi',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActivate:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };

    default:
      return state;
  }
};
