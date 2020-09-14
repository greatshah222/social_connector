import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  const {
    company,
    title,

    to,
    from,
  } = experience;
  return (
    <div>
      <h3 className='text-dark'>{company && company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from && from}</Moment>-{' '}
        {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Position:</strong>
        {title && title}
      </p>
    </div>
  );
};

export default ProfileExperience;
