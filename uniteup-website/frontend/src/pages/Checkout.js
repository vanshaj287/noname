import React from 'react';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const Checkout = () => {
  return (
    <CheckoutContainer>
      <div className="container text-center">
        <h1>Checkout</h1>
        <p>Checkout page coming soon...</p>
      </div>
    </CheckoutContainer>
  );
};

export default Checkout;