import React from 'react';
import styled from 'styled-components';

const OrderConfirmationContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const OrderConfirmation = () => {
  return (
    <OrderConfirmationContainer>
      <div className="container text-center">
        <h1>Order Confirmation</h1>
        <p>Order confirmation page coming soon...</p>
      </div>
    </OrderConfirmationContainer>
  );
};

export default OrderConfirmation;