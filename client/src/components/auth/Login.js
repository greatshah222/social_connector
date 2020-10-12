import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
  };
  if (isAuthenticated && token) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Login to Your Account
      </p>
      <form className='form' onSubmit={formSubmitHandler}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Create a new Account? <Link to='/signup'>Register</Link>
      </p>
    </section>
  );
};
