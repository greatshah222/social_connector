import React from 'react';
import Moment from 'react-moment';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../store/profile';

export const Experience = ({ experience }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteSingleExperience = async (ID) => {
    try {
      await dispatch(deleteExperience(ID, history));
    } catch (error) {}
  };
  const experiences = experience.map((el) => (
    <tr key={el._id}>
      <td>{el.company}</td>
      <td className='hide-sm'>{el.title}</td>
      <td>
        <Moment format='YYYY/MM/DD' date={el.from} />-
        {el.to === null || !el.to ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{el.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteSingleExperience(el._id)}
        >
          Delete
        </button>
        <Link className='btn btn-primary' to={`/add-experience/${el._id}`}>
          Edit
        </Link>
      </td>{' '}
    </tr>
  ));
  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};
