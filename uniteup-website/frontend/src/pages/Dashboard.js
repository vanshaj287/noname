import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: #f8f9fa;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <div className="container text-center">
        <h1>Dashboard</h1>
        <p>Dashboard page coming soon...</p>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;