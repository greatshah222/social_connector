import React from 'react';
import Moment from 'react-moment';

export const ProfileEducation = ({ education }) => {
  const {
    school,
    degree,
    fieldofstudy,

    to,
    from,
    description,
  } = education;
  return (
    <div>
      <h3 className='text-dark'>{school && school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment>-{' '}
        {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree:</strong>
        {degree && degree}
      </p>
      <p>
        <strong>Fieldofstudy:</strong>
        {fieldofstudy && fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong>
        {description && description}
      </p>
    </div>
  );
};
