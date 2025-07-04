import React from 'react';
import styled from 'styled-components';

const ShopContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const Shop = () => {
  return (
    <ShopContainer>
      <div className="container text-center">
        <h1>Shop for Good</h1>
        <p>Shop page coming soon...</p>
      </div>
    </ShopContainer>
  );
};

export default Shop;