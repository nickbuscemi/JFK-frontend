import React from 'react';
import { useState, useEffect } from 'react';
import { DonationProgressBar } from './HomeComponents/DonationProgressBar';
import upcomingEvents from '../Events/EventsComponents/EventCardData';
import { RenderStackedCard } from '../Events/EventsComponents/EventCardForHome';

// WILL IMPORT DATA FROM API TO UPDATE PROGRESS BAR IN REAL TIME 

export const Home = () => {
    /*const currentDonation = 17583; // Example current donation amount
    const goal = 100000; // Example goal*/

    const [currentDonation, setCurrentDonation] = useState(0);
    const goal = 10000; // Example goal


    const mostRecentEvent = upcomingEvents[1];

    // In your React component
    useEffect(() => {
        fetch('http://localhost:4242/api/donations/total')
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCurrentDonation(data.totalDonations / 100); // Converting to dollars
            })
            .catch(error => console.error('Error fetching donation data:', error));
    }, []);
  

    return (
        <div>
            <div className='pb-10 pt-6'>
            <h1 className='flex justify-center text-carolina lg:mb-8 mb-4 lg:text-3xl font-bold'>Help us reach our goal for the year!</h1>
            <DonationProgressBar currentDonation={currentDonation} goal={goal} />
            {/* Other content */}
            </div>
            <section className="dark:bg-white">
                <div className="flex flex-col lg:grid lg:grid-cols-2 grid-cols-1 gap-16 items-center justify-center py-8 px-8 lg:px-0 mx-auto max-w-screen-xl lg:pb-16 lg:px-6">
                    
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-1">
                            <RenderStackedCard event={mostRecentEvent} />
                        </div>
                    </div>
                    
                    <div className="order-1 lg:order-2 font-light text-deepCarolina sm:text-lg">
                        <h2 className="text-center lg:text-left mb-4 text-4xl tracking-tight font-extrabold text-carolina">Join us in {`${mostRecentEvent.date.split(' ')[0]}`} for our next event</h2>
                        <p className='text-center lg:text-left mb-4 text-2xl tracking-tight text-carolina'>{`${mostRecentEvent.name}`}</p>
                        <p className="text-center lg:text-left text-deepCarolina">Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui, eget ornare lectus ex non
                                        libero. Nam rhoncus diam ultrices porttitor laoreet. Ut mollis fermentum ex, vel viverra lorem
                                        volutpat sodales. In ornare porttitor odio sit amet laoreet. Sed laoreet, nulla a posuere
                                        ultrices, purus nulla tristique turpis, hendrerit rutrum augue quam ut est. Fusce malesuada
                                        posuere libero, vitae dapibus eros facilisis euismod. Sed sed lobortis justo, ut tincidunt
                                        velit. Mauris in maximus eros.
                        </p>
                    </div>
                </div>
            </section>
        </div>
      );
}