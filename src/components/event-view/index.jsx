/**
 * @file components/event-view/index.jsx
 */

// Imports
import React, { useContext, useState, useEffect } from 'react';
import EventItem from '../event-item';
import { EventsContext } from '../../contexts/events';
import './style.scss';

// Component
const EventView = () => {
  const { events, removeEvent } = useContext(EventsContext);
  const [seconds, setSeconds] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const onTick = () => {
      setSeconds(Math.floor(Date.now() / 1000));
    };

    const tickInterval = setInterval(onTick, 1000);
    return () => clearInterval(tickInterval);
  }, []);

  const renderItems = () => {
    return events.map((event, index) => (
      <EventItem 
        key={index} 
        name={event.name} 
        date={new Date(event.date)} 
        now={seconds}
        remove={() => removeEvent(index)} />
    ));
  };

  return (
    <div className="cd-event-view">
      {
        events.length > 0 && (
          <div className="cd-event-header">
            <strong>Event Name</strong>
            <strong>Time Remaining</strong>
            <strong>Remove</strong>
          </div>
        )
      }
      {renderItems()}
    </div>
  );
};

// Export
export default EventView;
