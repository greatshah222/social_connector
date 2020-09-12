import React from 'react';
import Moment from 'react-moment';
export const Education = ({ education }) => {
  const educations = education.map((el) => (
    <tr key={el._id}>
      <td>{el.school}</td>
      <td className='hide-sm'>{el.degree}</td>
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
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};
