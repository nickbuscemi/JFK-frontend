import React from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    title: 'Individual',
    price: '99',
    features: [
      '1 Individual Entry',
      'Access to Tournament',
      'Free Lunch Included'
    ],
    buttonText: 'Select'
  },
  {
    title: '4-Some',
    price: '349',
    features: [
      '4 Person Team Entry',
      'Access to Tournament',
      'Free Lunch Included'
    ],
    buttonText: 'Select'
  },
  {
    title: 'Dinner Only',
    price: '49',
    features: [
      'Dinner Event Access',
      'No Tournament Entry',
      'Networking Opportunities'
    ],
    buttonText: 'Select'
  },
  {
    title: 'Sponsor',
    price: '499',
    features: [
      'Sponsorship Recognition',
      'Promotional Opportunities',
      'Multiple Team Entries'
    ],
    buttonText: 'Select'
  }
];



const Card = ({ title, price, features, buttonText }) => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate(`/events/annual-golf-tournament/sign-up-form`, { state: { plan: title } })
  }

  return (
    <div className="p-2 flex justify-center w-full min-w-[280px] max-w-[350px] mb-4">
      <div className="w-full p-4 bg-white border rounded-lg shadow sm:p-8 dark:bg-deepCarolina dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{title}</h5>
        <ul className="my-7 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mb-4 flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">{price}</span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/entry</span>
        </div>
        <button onClick={handleSignUpClick} type="button" className="text-white bg-carolina hover:bg-deepCarolina focus:outline-none focus:ring-4 focus:ring-carolina-300 font-extrabold rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:text-deepCarolina dark:hover:bg-white dark:focus:ring-carolina">
          {buttonText}
        </button>
      </div>
    </div>
  )
};

export const GolfTournamentRegistrationForm = () => {

  return (
    <div>
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-carolina">Choose your entry option below to sign up!</h2>
      </div>

      <div className="flex flex-wrap justify-center bg-white px-4 sm:px-10 md:px-20 lg:px-60 py-16">
        {plans.map((plan, i) => (
          <Card key={i} {...plan} />
        ))}
      </div>
    </div>
  )
};


