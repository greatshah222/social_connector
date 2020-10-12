import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileByUserID } from '../../store/profile';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '../../shared/Spinner/Spinner';
import { ProfileTop } from './ProfileTop';
import { ProfileAbout } from './ProfileAbout';
import { ProfileEducation } from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import { ProfileGithub } from './ProfileGithub';
export const Profile = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const { token, user } = useSelector((state) => state.auth);
  const userID = useParams().userID;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileByUserID(userID));
  }, [dispatch, userID]);
  // console.log(profile);
  return (
    <>
      {!profile || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles{' '}
          </Link>
          {token && user && user._id === profile.user._id && (
            <Link to='/create-profile' className='btn btn btn-dark'>
              Edit
            </Link>
          )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience </h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((el) => (
                    <ProfileExperience key={el._id} experience={el} />
                  ))}
                </>
              ) : (
                <h4>No Experience credentials</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education </h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((el) => (
                    <ProfileEducation key={el._id} education={el} />
                  ))}
                </>
              ) : (
                <h4>No Education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub githubusername={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};
