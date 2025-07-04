import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const Login = () => {
  return (
    <LoginContainer>
      <div className="container text-center">
        <h1>Login</h1>
        <p>Login page coming soon...</p>
      </div>
    </LoginContainer>
  );
};

export default Login;