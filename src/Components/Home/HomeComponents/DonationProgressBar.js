import React from 'react';
import './DonationProgressBar.css'; // Make sure this CSS file contains the updated styles

export const DonationProgressBar = ({ currentDonation, goal }) => {
  const progress = Math.min((currentDonation / goal) * 100, 100); // Calculate the progress percentage

  return (
    <div>
    <div className="progress-bg">
      <div className="progress-bar" style={{ width: `${progress}%`, maxWidth: '100%' }}>
        {/* The progress bar itself */}
      </div>
    </div>
      <div className='header-containers'>
        <h3 className="raised">${currentDonation.toLocaleString()} raised</h3>
        <h3 className="goal">Goal: ${goal.toLocaleString()}</h3>
      </div>
    </div>
  );
}; 
