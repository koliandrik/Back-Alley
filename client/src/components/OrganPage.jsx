import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ORGANS = gql`
  query GetOrgans {
    products(category: "organs") {
      id
      name
      price
      image
      quantity
    }
  }
`;

const OrganPage = () => {
  const { data, loading, error } = useQuery(GET_ORGANS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Human Organs</h1>
      <ul>
        {data.products.map(({ id, name, price, image, quantity }) => (
          <li key={id}>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>${price}</p>
            <p>Available: {quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganPage;

