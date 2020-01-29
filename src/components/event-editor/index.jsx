/**
 * @file components/event-editor/index.jsx
 */

// Imports
import React, { useState, useContext } from 'react';
import { EventsContext } from '../../contexts/events';
import './style.scss';

const eventNameLimits = { 
  min: 1, max: 140
};

const eventDateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const eventTimeRegex = /([0-1][0-9]|2[0-3]):[0-5][0-9]/;

const getTodaysDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (mm < 10) { mm = `0${mm}`; }
  if (dd < 10) { dd = `0${dd}`; }

  return `${yyyy}-${mm}-${dd}`;
}

// Component
const EventEditor = () => {
  const {addEvent} = useContext(EventsContext);

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(getTodaysDate());
  const [eventTime, setEventTime] = useState('00:00');
  const [eventError, setEventError] = useState('');

  const validateEventName = () => {
    const { min, max } = eventNameLimits;
    if (eventName.length < min || eventName.length > max) {
      setEventError(`The event name must be between ${min} and ${max} characters.`);
      return false;
    }

    return true;
  }

  const validateEventTime = (date, time) => {
    if (eventDateRegex.test(date) === false) {
      setEventError("Event date must be in the form 'YYYY-MM-DD'.");
      return false;
    }

    if (eventTimeRegex.test(time) === false) {
      setEventError("Event time must be in the form 'HH:MM");
      return false;
    }

    return true;
  };

  const hasEventTimePassed = (date) => {
    return date.getTime() <= Date.now();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setEventError('');

    if (validateEventName() === false) {
      return;
    }

    if (validateEventTime(eventDate, eventTime) === false) {
      return;
    }

    const date = new Date(`${eventDate} ${eventTime}`);
    if (hasEventTimePassed(date) === true) {
      setEventError('The event time specified has already passed.');
      return;
    }

    addEvent({ name: eventName, date: eventDate, time: eventTime });

    setEventName('');
  }

  return (
    <div className="cd-event-editor">
      {
        eventError && <p className="cd-error">{eventError}</p>
      }
      <form onSubmit={onSubmit}>
        <div className="cd-form-element">
          <label className="cd-label" htmlFor="event-name-input">
            Event Name {
              eventName.length < eventNameLimits.min ?
                `(Minimum ${eventNameLimits.min})` :
                `(${eventName.length} / ${eventNameLimits.max})`
            }:
          </label>
          <input
            className="cd-input cd-text"
            id="event-name-input"
            name="event-name-input"
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={ev => setEventName(ev.target.value)}
          />
        </div>
        <div className="cd-form-element">
          <label htmlFor="event-date-input" className="cd-label">
            Event Date:
          </label>
          <input
            className="cd-input cd-date"
            id="event-date-input"
            name="event-date-input"
            type="date"
            placeholder="Event Date"
            value={eventDate}
            onChange={ev => setEventDate(ev.target.value)}
          />
        </div>
        <div className="cd-form-element">
          <label htmlFor="event-time-input" className="cd-label">
            Event Time:
          </label>
          <input
            className="cd-input cd-time"
            id="event-time-input"
            name="event-time-input"
            type="time"
            placeholder="Enter Time"
            value={eventTime}
            onChange={ev => setEventTime(ev.target.value)}
          />
        </div>
        <div className="cd-form-element">
          <button
            className="cd-button cd-confirm"
            type="submit"
          >Add Event</button>
        </div>
      </form>
    </div>
  );
};

// Export
export default EventEditor;
