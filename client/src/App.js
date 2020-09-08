import React from 'react';

import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Alert } from './components/layout/Alert';

function App() {
  // inside swith we can only put route
  return (
    <>
      <Navbar />
      <>
        <Route path='/' exact>
          <Landing />
        </Route>
        <section className='container'>
          <Alert />

          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
          </Switch>
        </section>
      </>
    </>
  );
}

export default App;
