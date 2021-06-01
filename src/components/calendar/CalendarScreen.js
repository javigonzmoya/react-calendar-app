import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { messages } from '../../helpers/calendar-messages-spanish';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/ui';
import {
  eventClearActivateEvent,
  eventSetActivate,
} from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

/* const myEventsList = [
  {
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
]; */

export const CalendarScreen = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );
  const dispatch = useDispatch();

  const handleOnDoubleClickEvent = (e) => {
    dispatch(openModal());
  };

  const handleOnSelectEvent = (e) => {
    dispatch(eventSetActivate(e));
  };

  const handleOnView = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  };

  const handleOnSelectSlot = (e) => {
    dispatch(eventClearActivateEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={handleOnDoubleClickEvent}
        onSelectEvent={handleOnSelectEvent}
        onSelectSlot={handleOnSelectSlot}
        selectable={true}
        onView={handleOnView}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      {activeEvent && <DeleteEventFab />}
      <AddNewFab />

      <CalendarModal />
    </div>
  );
};
