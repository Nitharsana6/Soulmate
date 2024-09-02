// Events.js

import React from 'react';


const Events = () => {
  const containerStyle = {
    backgroundColor: '#ffe6e6', // Light pink background
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#333', // Darker color for the heading
    fontSize: '24px',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Schedule the Events</h1>
      {/* Event scheduling form or other components will go here */}
    </div>
  );
};

export default Events;
