import React from 'react';
import { useParams } from 'react-router-dom';
import upcomingEvents from './EventCardData';

export const EventDetail = () => {
  const { eventName } = useParams();
  const event = upcomingEvents.find(e => e.link === `/events/${eventName}`);

  console.log(eventName)
  return (
    <div>
      {event ? (
        <>
          <h1 className='py-80'>{event.name}</h1>
          {/* Other event details here */}
        </>
      ) : (
        <p className='py-80'>Event not found</p>
      )}
    </div>
  );
};

