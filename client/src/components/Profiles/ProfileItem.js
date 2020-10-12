import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

export const ProfileItem = ({ profile }) => {
  const { token } = useSelector((state) => state.auth);

  const {
    user,
    // social,
    skills,

    company,
    // website,
    location,
    // bio,
    status,
    // githubusername,
    // experience,
    // education,
  } = profile;
  const { name, avatar } = user;
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {' '}
          {status}
          {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        {token ? (
          <Link to={`/profile/${user._id}`} className='btn btn-primary'>
            View Profile
          </Link>
        ) : (
          <button className='btn btn-primary'>
            Login to View the user details
          </button>
        )}
      </div>
      <div>
        <ul>
          {skills.map((el, i) => (
            <li key={i} className='text-primary'>
              <FontAwesomeIcon icon='check' />
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
