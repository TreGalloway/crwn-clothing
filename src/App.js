import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component.jsx';
import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignIn from './components/sign-in/sign-in.component'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
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
}

export default App;