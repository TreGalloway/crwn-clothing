import React from 'react';
import {BrowserRouter as Router ,Switch, Route } from 'react-router-dom';
// import { Router } from 'workbox-routing';
import './App.css';
import HomePage from './Pages/Homepage/Homepage.component';
import ShopPage from './Pages/Shop/Shop.component';

function App() {
  return (
    <div>
     <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
       </Switch>
      </Router>
    </div>
  );
}

export default App;