
import { useQuery, gql } from '@apollo/client';

const GET_ANIMALS = gql`
  query GetAnimals {
    products(category: "animals") {
      id
      name
      price
      image
      quantity
    }
  }
`;

const AnimalPage = () => {
  const { data, loading, error } = useQuery(GET_ANIMALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Endangered Animals</h1>
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

export default AnimalPage;
