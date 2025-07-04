import React from 'react';
import styled from 'styled-components';

const EventDetailContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const EventDetail = () => {
  return (
    <EventDetailContainer>
      <div className="container text-center">
        <h1>Event Details</h1>
        <p>Event detail page coming soon...</p>
      </div>
    </EventDetailContainer>
  );
};

export default EventDetail;