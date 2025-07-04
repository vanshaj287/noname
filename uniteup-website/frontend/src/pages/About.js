import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const About = () => {
  return (
    <AboutContainer>
      <div className="container text-center">
        <h1>About UniteUp</h1>
        <p>About page coming soon...</p>
      </div>
    </AboutContainer>
  );
};

export default About;