import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrganPage from './pages/OrganPage';
import AnimalPage from './pages/AnimalPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/organs" component={OrganPage} />
        <Route path="/animals" component={AnimalPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
};

export default App;
