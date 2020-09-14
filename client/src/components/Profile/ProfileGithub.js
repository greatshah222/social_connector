import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGitHubRepos } from '../../store/profile';
import { Spinner } from '../../shared/Spinner/Spinner';

export const ProfileGithub = ({ githubusername }) => {
  const dispatch = useDispatch();
  const { repos } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getGitHubRepos(githubusername));
  }, [dispatch, githubusername]);

  return !repos || repos.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <div className='profile-github'>
        <h2 className='text-primary my-1'>Github Repos</h2>
        {repos.map((el) => (
          <div key={el.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={el.html_url} target='_blank' rel='noopener noreferrer'>
                  {el.name}
                </a>
              </h4>
              <p>{el.description}</p>
              <ul>
                <li className='badge badge-primary'>
                  Stars:{el.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers:{el.watchers_count}
                </li>
                <li className='badge badge-light'>Forks:{el.forks_count}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
