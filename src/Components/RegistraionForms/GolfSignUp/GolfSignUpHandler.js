import React from 'react';
/*import { useLocation } from 'react-router-dom';
import { IndividualSignUpForm } from './IndividualSignUpForm';
import { FourSomeSignUpForm } from './FourSomeSignUpForm';
import { DinnerOnlySignUpForm } from './DinnerOnlySignUpForm';
import { SponsorSignUpForm } from './SponsorSignUpForm';*/

export const GolfSignUpHandler = () => {
  /*const location = useLocation();
  const { plan } = location.state || {}; // Default to an empty object if state is undefined

  const renderFormBasedOnPlan = () => {
    switch(plan) {
      case 'Individual':
        return <IndividualSignUpForm />;
      case '4-Some':
        return <FourSomeSignUpForm />;
      case 'Dinner Only':
        return <DinnerOnlySignUpForm />;
      case 'Sponsor':
        return <SponsorSignUpForm />;
      default:
        return <div>Select a plan to sign up.</div>;
    }
  };*/

  return (
    <div>
      {/*renderFormBasedOnPlan()*/}
      <div class="flex justify-center items-center h-screen">
          <p class="text-carolina mt-44 mb-44 text-center text-4xl">Golf Tournament Registration Coming Soon!!</p>
      </div>
    </div>
  );
};
