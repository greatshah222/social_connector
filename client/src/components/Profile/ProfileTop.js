import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileTop = ({ profile }) => {
  console.log(profile);
  const {
    status,
    location,
    website,
    company,
    user: { name, avatar },
    social,
  } = profile;
  return (
    <div className='profile-top bg-primary p-2'>
      <img className={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} at {company && company}
      </p>
      <p>{location && location}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={['fas', 'globe']} size='2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={['fab', 'instagram']} size='2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={['fab', 'facebook']} size='2x' />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={['fab', 'twitter']} size='2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={['fab', 'youtube']} size='2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={['fab', 'linkedin']} size='2x' />
          </a>
        )}
      </div>
    </div>
  );
};
