import React, { useState } from 'react';
import OrganList from './components/OrganList';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(true);

  const handleAddToCart = (organ) => {
    setCart(prevCart => [...prevCart, organ]);
  };

  const handleToggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="App">
      <h1>Body Organs for Sale</h1>
      <button onClick={handleToggleCart}>
        {isCartVisible ? 'Hide Cart' : 'Show Cart'}
      </button>
      <OrganList onAddToCart={handleAddToCart} />
      {isCartVisible && <Cart cart={cart} />}
    </div>
  );
};

export default App;
