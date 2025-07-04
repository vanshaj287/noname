import React from 'react';
import styled from 'styled-components';

const EventTicketingContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const EventTicketing = () => {
  return (
    <EventTicketingContainer>
      <div className="container text-center">
        <h1>Event Ticketing</h1>
        <p>Event ticketing page coming soon...</p>
      </div>
    </EventTicketingContainer>
  );
};

export default EventTicketing;