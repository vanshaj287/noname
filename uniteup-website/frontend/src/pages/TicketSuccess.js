import React from 'react';
import styled from 'styled-components';

const TicketSuccessContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const TicketSuccess = () => {
  return (
    <TicketSuccessContainer>
      <div className="container text-center">
        <h1>Ticket Booking Success</h1>
        <p>Ticket success page coming soon...</p>
      </div>
    </TicketSuccessContainer>
  );
};

export default TicketSuccess;