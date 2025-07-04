import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <div className="container text-center">
        <h1>Contact Us</h1>
        <p>Contact page coming soon...</p>
      </div>
    </ContactContainer>
  );
};

export default Contact;