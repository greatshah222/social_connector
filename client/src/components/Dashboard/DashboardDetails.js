import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DashboardDetails = () => {
  return (
    <>
      <div className='dash-buttons'>
        <Link to='/create-profile' className='btn btn-light'>
          <FontAwesomeIcon
            icon={['fas', 'edit']}
            className='text-primary'
            style={{ marginRight: '10px' }}
          />
          Edit Profile
        </Link>
        <Link to='/add-experience' className='btn btn-light'>
          <FontAwesomeIcon
            icon={['fab', 'black-tie']}
            className='text-primary'
            style={{ marginRight: '10px' }}
          />
          Add Experience
        </Link>
        <Link to='/add-education' className='btn btn-light'>
          <FontAwesomeIcon
            icon={['fas', 'graduation-cap']}
            className='text-primary'
            style={{ marginRight: '10px' }}
          />
          Add Education
        </Link>
      </div>
    </>
  );
};
