import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const { isAuthenticated, token, loading } = useSelector(
    (state) => state.auth
  );

  let content;
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>Developers</Link>
        </li>
        {!isAuthenticated && !token && !loading && (
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
        )}
        {!isAuthenticated && !token && !loading && (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
        {isAuthenticated && token && (
          <li>
            <Link to='/logout'>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
