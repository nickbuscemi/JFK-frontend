import React from 'react';
import { useParams } from 'react-router-dom';
import upcomingEvents from './EventCardData';
import { MarathonRegistrationForm } from '../../RegistraionForms/MarathonRegistrationForm';
import { GolfTournamentRegistrationForm } from '../../RegistraionForms/GolfTournamentRegistrationForm';
import { BlockPartyRegistrationForm } from '../../RegistraionForms/BlockPartyRegistrationForm';


export const EventDetail = () => {
  const { eventName } = useParams();
  const event = upcomingEvents.find(e => e.link === `/events/${eventName}`);

  let RegistrationForm;
  if (event) {
    switch(event.registrationFormComponent) {
      case "MarathonRegistrationForm":
        RegistrationForm = MarathonRegistrationForm;
        break;
      case "GolfTournamentRegistrationForm":
        RegistrationForm = GolfTournamentRegistrationForm;
        break;
      case "BlockPartyRegistrationForm":
        RegistrationForm = BlockPartyRegistrationForm;
        break;
      default:
        RegistrationForm = null;
    }
  }

  console.log(eventName)
  return (
    <div>
      {event ? (
        <>
          <div>
            <section>
              <div className="hero min-h-screen flex justify-center items-center text-white md:animate-backgroundPanning" style={{
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content flex flex-col justify-center items-center">
                  <div className="max-w-md mt-28">
                    <div>
                      <h1 className="mb-5 text-5xl font-bold">{event.name}</h1>
                    </div>
                    <div>
                      <button className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:text-deepCarolina hover:bg-white focus:outline-none focus:ring-4 focus:ring-carolina-300 rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-white dark:focus:ring-carolina">
                        Sign Up!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {RegistrationForm && <RegistrationForm />}
          </div>
        </>
      ) : (
        <p className='py-80'>Event not found</p>
      )}
    </div>
  );
};

