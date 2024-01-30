import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import upcomingEvents from './EventCardData';

export const EventsCard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    // Initialze displayed events
    setDisplayedEvents(upcomingEvents.slice(0,3));
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleEventsDisplay = () => {
    if (showAllEvents) {
      setDisplayedEvents(upcomingEvents.slice(0, 3));
      setShowAllEvents(false);
    } else {
      setDisplayedEvents(upcomingEvents);
      setShowAllEvents(true);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // Ensure that the viewport can contain 5 cards of 400px plus some additional space for margins, paddings, etc.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      // Adjusted for 3 cards
      breakpoint: { max: 3000, min: 1600 },
      items: 3
    },
    tablet: {
      // Adjusted for 2 cards
      breakpoint: { max: 1600, min: 800 },
      items: 2
    },
    mobile: {
      // 1 card for mobile
      breakpoint: { max: 800, min: 0 },
      items: 1
    },
  };

  const renderCarousel = () => (
    <Carousel responsive={responsive} infinite={true} className="skill-slider">
      {upcomingEvents.map((event, index) => (
        <div key={index} className="item min-w-400 flex flex-wrap justify-center gap-4 p-4">
          <Link to={event.link} key={event.id} style={{ width: '400px' }}>
              <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} className="block rounded-lg overflow-hidden shadow-lg">
                <img src={event.image} alt={event.name} className="w-full h-64 object-cover"/>
                <div className="px-4 pt-4 pb-6 bg-deepCarolina">
                  <div className="mb-2 text-carolina text-sm uppercase tracking-wide font-semibold">{event.date}</div>
                  <h3 className="mb-2 text-left text-xl font-bold text-white whitespace-nowrap overflow-hidden ">{event.name}</h3>
                  <p className="mb-4 text-base text-gray-100">{event.location}</p>
                  <span className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:text-deepCarolina hover:bg-white focus:outline-none focus:ring-4 focus:ring-carolina-300 rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-white dark:focus:ring-carolina">Sign Up!</span>
                </div>
              </motion.div>
            </Link>
        </div>
      ))}
    </Carousel>
  );

  const renderStackedCards = () => (
    <div>
      <div className="flex flex-wrap justify-center gap-8 py-8">
        {displayedEvents.map((event) => (
          <Link to={event.link} key={event.id} style={{ width: '300px', height: 'auto' }}>
            <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} className="block rounded-lg overflow-hidden shadow-lg">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover"/>
              <div className="px-4 pt-4 pb-6 bg-deepCarolina">
                <div className="mb-2 text-carolina text-sm uppercase tracking-wide font-semibold">{event.date}</div>
                <h3 className="mb-2 text-left text-xl font-bold text-white">{event.name}</h3>
                <p className="mb-4 text-base text-gray-100">{event.location}</p>
                <span className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:text-deepCarolina hover:bg-white focus:outline-none focus:ring-4 focus:ring-carolina-300 rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-white dark:focus:ring-carolina">Sign Up!</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className='flex items-center justify-center'>
        <button onClick={toggleEventsDisplay} className="text-white bg-carolina hover:text-deepCarolina hover:bg-white focus:outline-none focus:ring-4 focus:ring-carolina-300 rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-white dark:focus:ring-carolina">
          {showAllEvents ? 'See Less...' : 'See More...'}
        </button>
      </div>
    </div>
  );

  return isMobile ? renderStackedCards() : renderCarousel();
};

