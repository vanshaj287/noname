import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const Cart = () => {
  return (
    <CartContainer>
      <div className="container text-center">
        <h1>Shopping Cart</h1>
        <p>Cart page coming soon...</p>
      </div>
    </CartContainer>
  );
};

export default Cart;