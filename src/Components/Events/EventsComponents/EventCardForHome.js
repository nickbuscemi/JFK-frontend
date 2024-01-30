import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import upcomingEvents from './EventCardData';

export const RenderStackedCard = ({ event }) => {
    if (!event) return null;
  
    return (
      <div className="flex flex-wrap items-center justify-center">
        <Link to={event.link} className='lg:w-[600px] md:w-[500px] w-[350px]'>
          <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} className="block rounded overflow-hidden shadow-lg">
            <img src={event.image} alt={event.name} className="w-full h-52 lg:h-96 object-cover"/>
            <div className="px-4 pt-4 pb-6 bg-deepCarolina">
              <div className="mb-2 text-carolina text-sm uppercase tracking-wide font-semibold">{event.date}</div>
              <h3 className="mb-2 text-left text-xl font-bold text-white">{event.name}</h3>
              <p className="mb-4 text-base text-gray-100">{event.location}</p>
              <span className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:text-deepCarolina hover:bg-white focus:outline-none focus:ring-4 focus:ring-carolina-300 rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-white dark:focus:ring-carolina">Sign Up!</span>
            </div>
          </motion.div>
        </Link>
      </div>
    );
  };
  
  