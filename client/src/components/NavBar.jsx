import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  background: #333;
  padding: 1rem;
  color: white;
`;

const NavBar = () => (
  <Navbar>
    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
    <Link to="/organs" style={{ color: 'white', textDecoration: 'none' }}>Organs</Link>
    <Link to="/animals" style={{ color: 'white', textDecoration: 'none' }}>Animals</Link>
    <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link>
    <Link to="/checkout" style={{ color: 'white', textDecoration: 'none' }}>Checkout</Link>
  </Navbar>
);

export default NavBar;
