import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  margin: 1rem;
  background: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
`;
const HomePage = () => {
  return (
    <Container>
      <h1>Welcome to Exotic Emporium</h1>
      <Link to="/organs">Browse Organs</Link>
      <Link to="/animals">Browse Animals</Link>
    </Container>
  );
};

export default HomePage;