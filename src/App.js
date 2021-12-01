import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component.jsx';
import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignIn from './components/sign-in/sign-in.component'; 

function App() {
  return (
    <div>
      <Header />
      <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignIn} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;