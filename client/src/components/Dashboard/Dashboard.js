import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile, deleteAccount } from '../../store/profile';
import { Spinner } from '../../shared/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { DashboardDetails } from './DashboardDetails';
import { Experience } from './Experience';
import { Education } from './Education';
import { Modal } from '../../shared/Modal/Modal';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  const confirmModalHandler = () => {
    setShowConfirmModal((prevState) => !prevState);
  };

  const deleteAccountHandler = async () => {
    await dispatch(deleteAccount());
  };

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
          <Modal
            show={showConfirmModal}
            onCancel={confirmModalHandler}
            header='ARE YOUR SURE ???'
            footer={
              <>
                <button
                  className='btn btn-primary'
                  onClick={confirmModalHandler}
                >
                  Cancel
                </button>
                <button
                  className='btn btn-danger'
                  onClick={deleteAccountHandler}
                >
                  Confirm
                </button>
              </>
            }
          >
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Do you want to proceed and delete your Account permanently? Please
              note that this action cannot be undone !!
            </p>
          </Modal>{' '}
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
            <div className='my-2'>
              <button className='btn btn-danger' onClick={confirmModalHandler}>
                <FontAwesomeIcon
                  icon='user-minus'
                  style={{ marginRight: '10px' }}
                />
                Delete my account
              </button>
            </div>
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
