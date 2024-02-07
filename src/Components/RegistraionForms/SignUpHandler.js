import React from 'react';
import { useParams } from 'react-router-dom';
import { GolfSignUpHandler } from './GolfSignUp/GolfSignUpHandler';

export const SignUpFormHandler = () => {
  const { eventName } = useParams();

  // Example conditional logic to render different forms based on the event name
  const renderForm = () => {
    switch (eventName) {
      case 'annual-golf-tournament':
        return <GolfSignUpHandler />;
      case 'nyc-marathon':
        return <h1>MARATHON</h1>;
      case 'annual-block-party':
        return <h1>BLOCK</h1>
      default:
        return <div>No registration form available for this event.</div>;
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
};
