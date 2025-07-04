import React from 'react';
import styled from 'styled-components';

const ProductDetailContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const ProductDetail = () => {
  return (
    <ProductDetailContainer>
      <div className="container text-center">
        <h1>Product Details</h1>
        <p>Product detail page coming soon...</p>
      </div>
    </ProductDetailContainer>
  );
};

export default ProductDetail;