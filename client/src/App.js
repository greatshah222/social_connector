import React, { useEffect, useState } from 'react';

import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Alert } from './components/layout/Alert';
import { useDispatch } from 'react-redux';
import { fetchUserDataFromCookie } from './store/auth';
import { Logout } from './components/auth/Logout';
function App() {
  const [fetchDataProcess, setFetchDataProcess] = useState(false);
  // inside swith we can only put route
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDataFromCookie());
    setFetchDataProcess(true);
  }, [dispatch]);
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
            <Route exact path='/logout'>
              <Logout />
            </Route>
          </Switch>
        </section>
      </>
    </>
  );
}

export default App;
