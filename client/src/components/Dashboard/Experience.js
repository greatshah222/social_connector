import React from 'react';
import Moment from 'react-moment';
export const Experience = ({ experience }) => {
  const experiences = experience.map((el) => (
    <tr key={el._id}>
      <td>{el.company}</td>
      <td className='hide-sm'>{el.title}</td>
      <td>
        <Moment format='YYYY/MM/DD' date={el.from} /> -
        {el.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{el.to}</Moment>}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
        {/* <button className='btn btn-danger'>Delete</button> */}
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
