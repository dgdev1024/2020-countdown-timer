/**
 * @file contexts/events.jsx
 */

// Imports
import React, { useEffect } from 'react';
import { useEventsReducer } from '../hooks/use-events-reducer';

// Context
const Context = React.createContext();

// Context Provider
const EventsProvider = ({ children }) => {
  const [events, dispatch] = useEventsReducer();

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('-cd-events'));
    if (savedEvents === null || Array.isArray(savedEvents) === false) { return; }

    savedEvents.forEach(event => {
      dispatch({
        type: 'ADD_EVENT',
        payload: {
          name: event.name,
          date: event.date
        }
      });
    });
  }, []);

  const saveEvent = ({ name, date }) => {
    const events = JSON.parse(localStorage.getItem('-cd-events'));
    if (events === null) {
      localStorage.setItem('-cd-events', JSON.stringify([{ name, date }]));
    } else {
      localStorage.setItem('-cd-events', JSON.stringify([...events, { name, date }]));
    }
  }

  const addEvent = ({ name, date, time }) => {
    const eventDate = new Date(`${date} ${time}`);
    dispatch({ type: 'ADD_EVENT', payload: { name, date: eventDate } });
    saveEvent({ name, date: eventDate });
  };

  const removeEvent = (index) => {
    dispatch({ type: 'REMOVE_EVENT', payload: index });

    const events = JSON.parse(localStorage.getItem('-cd-events'));
    if (events !== null) {
      localStorage.setItem('-cd-events', JSON.stringify(
        events.filter((_, i) => i !== index)
      ));
    }
  };

  return (
    <Context.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </Context.Provider>
  );
};

// Exports
export default EventsProvider;
export const EventsContext = Context;
