import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Welcome to Exotic Emporium</h1>
    <div>
      <Link to="/organs">Browse Human Organs</Link>
    </div>
    <div>
      <Link to="/animals">Browse Endangered Animals</Link>
    </div>
  </div>
);

export default HomePage;
