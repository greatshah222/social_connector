import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile } from '../../store/profile';
import { Spinner } from '../../shared/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { DashboardDetails } from './DashboardDetails';
import { Experience } from './Experience';
import { Education } from './Education';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  return loading && !profile ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <FontAwesomeIcon icon='user' />
        {/* if there is user then we will have profile name also we are cheking in the user cause of the user dont have any profile it will be displayed no profile yet plese create one */}
        Welcome {user && user.name}
      </p>
      {profile ? (
        <>
          {' '}
          <div
            style={{
              display: 'flex',
              placeItems: 'center',
              flexDirection: 'column',
            }}
          >
            <DashboardDetails />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
          </div>
        </>
      ) : (
        <>
          <p>No Profile Yet.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};
