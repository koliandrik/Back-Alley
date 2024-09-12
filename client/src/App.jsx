import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrganPage from './components/OrganPage';
import AnimalPage from './components/AnimalPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
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
