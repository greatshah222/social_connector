import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfile } from '../../store/profile';
import { Spinner } from '../../shared/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileItem } from './ProfileItem';

export const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllProfile());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <FontAwesomeIcon icon='user' />
            Browse and Connect with developers
            <div className='profiles'>
              {profiles.length > 0 ? (
                profiles.map((el) => <ProfileItem key={el._id} profile={el} />)
              ) : (
                <h4>No profile found</h4>
              )}
            </div>
          </p>
        </>
      )}
    </>
  );
};
