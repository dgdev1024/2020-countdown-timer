/**
 * @file components/event-item/index.jsx
 */

// Imports
import React from 'react';
import './style.scss';

// Helpful Constants
const SECONDS_PER_DAY = 86400;
const HOURS_PER_DAY = 24;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

// Helper function to place a zero in front of single-digit hours and minutes.
const formatSecOrMin = (secOrMin) => secOrMin.length === 1 ? `0${secOrMin}` : secOrMin;

// Component
const EventItem = ({ name, date, now, remove = () => {} } = {}) => {
  const timeRemaining = Math.floor(date.getTime() / 1000) - now;
  const seconds = timeRemaining % 60;
  const minutes = Math.floor(timeRemaining / SECONDS_PER_MINUTE) % SECONDS_PER_MINUTE;
  const hours = Math.floor(timeRemaining / SECONDS_PER_HOUR) % HOURS_PER_DAY;
  const days = Math.floor(timeRemaining / SECONDS_PER_DAY);

  return (
    <div className={`cd-event-item ${timeRemaining <= 0 && 'cd-time-up'}`}>
      <div className="cd-event-name">{name}</div>
      <div className="cd-event-time-until">
        {
          timeRemaining <= 0 ? (
            <span className="cd-time-up">TIME UP!</span>
          ) : (
            <>
                {days}D,{' '}
                {formatSecOrMin(hours.toString())}:
                {formatSecOrMin(minutes.toString())}:
                {formatSecOrMin(seconds.toString())}
            </>
          )
        }
        
      </div>
      <button className="cd-remove-button" type="button" onClick={() => remove()}>
        Remove
      </button>
    </div>
  )
};

// Exports
export default EventItem;
