import React from 'react';
import styled from 'styled-components';

const EventsContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const Events = () => {
  return (
    <EventsContainer>
      <div className="container text-center">
        <h1>Upcoming Events</h1>
        <p>Events page coming soon...</p>
      </div>
    </EventsContainer>
  );
};

export default Events;