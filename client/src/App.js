import React, { useEffect, useState } from 'react';

import './App.css';
//global font awesome icon
import './shared/FontAwesome/FontAwesome';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Alert } from './components/layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataFromCookie } from './store/auth';
import { Logout } from './components/auth/Logout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Spinner } from './shared/Spinner/Spinner';
import { CreateProfile } from './components/Profile/CreateProfile';
import { AddEducation } from './components/Profile/AddEducation';
import { AddExperienc } from './components/Profile/AddExperienc';
function App() {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [fetchDataProcess, setFetchDataProcess] = useState(false);
  // inside swith we can only put route
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDataFromCookie());
    setFetchDataProcess(true);
  }, [dispatch]);

  let route = (
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
      <Redirect to='/login' />
    </>
  );
  if (isAuthenticated && token) {
    route = (
      <>
        <section className='container'>
          <Alert />
          <Route exact path='/logout'>
            <Logout />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
          <Route exact path='/create-profile'>
            <CreateProfile />
          </Route>
          <Route exact path='/add-education'>
            <AddEducation />{' '}
          </Route>
          <Route exact path='/add-experience'>
            <AddExperienc />{' '}
          </Route>
          <Redirect to='/dashboard' />
        </section>
      </>
    );
  }
  if (!fetchDataProcess) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      {route}
    </>
  );
}

export default App;
