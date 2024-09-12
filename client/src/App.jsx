import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
// import LoginPage from './components/Login';
import OrganPage from './components/OrganPage';
import AnimalPage from './components/AnimalPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div>
      <Router>
      <NavBar />
        <Routes>
          {/* <Route path="/" element={<LoginPage/>} /> */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/organs" element={<OrganPage/>} />
          <Route path="/animals" element={<AnimalPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
