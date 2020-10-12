import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileAbout = ({ profile }) => {
  const {
    bio,
    skills,
    user: { name },
  } = profile;
  // console.log(profile);
  return (
    <div className='profile-about bg-light p-2'>
      {
        <>
          {bio && (
            <>
              <h2 className='text-primary'>{name}'s Bio</h2>
              <p>{bio}</p>
            </>
          )}
        </>
      }
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((el, i) => (
          <div key={i} className='p-1'>
            {' '}
            <FontAwesomeIcon icon='check' /> {el}
          </div>
        ))}
      </div>
    </div>
  );
};
