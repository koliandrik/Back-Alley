import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrganList = ({ onAddToCart }) => {
  const [organs, setOrgans] = useState([]);

  useEffect(() => {
    axios.get('/api/organs')
      .then(response => setOrgans(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="organ-list">
      {organs.map(organ => (
        <div className="organ-item" key={organ._id}>
          <h2>{organ.name}</h2>
          <p>{organ.description}</p>
          <p>Price: {organ.price}</p>
          <button onClick={() => onAddToCart(organ)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default OrganList;
