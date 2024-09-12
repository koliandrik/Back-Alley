import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import axios from 'axios';

// Load your publishable key from Stripe
const stripePromise = loadStripe('your-publishable-key-here');

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #333;
  border: none;
  cursor: pointer;
`;

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      return;
    }

    try {
      await axios.post('/api/checkout', {
        paymentMethodId: paymentMethod.id,
        shippingAddress,
      });

      // Redirect to a confirmation page or show success message
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <Container>
      <h1>Checkout</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Street Address"
          value={shippingAddress.street}
          onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="City"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="State"
          value={shippingAddress.state}
          onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="ZIP Code"
          value={shippingAddress.zip}
          onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
          required
        />
        <CardElement />
        <Button type="submit" disabled={!stripe}>Pay Now</Button>
        {error && <p>{error}</p>}
      </Form>
    </Container>
  );
};

const CheckoutPageWrapper = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);




export default CheckoutPageWrapper;
