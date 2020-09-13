import React, { useState } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../store/profile';
import { useHistory, Link } from 'react-router-dom';
import { Modal } from '../../shared/Modal/Modal';
export const Education = ({ education }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // for showing modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // storing the id when user press the delete btn
  const [singleEducationID, setSingleEducationId] = useState(null);
  const deleteSingleEducation = async () => {
    try {
      await dispatch(deleteEducation(singleEducationID, history));
      ConfirmModalHandler();
    } catch (error) {}
  };
  const ConfirmModalHandler = (ID) => {
    setShowConfirmModal((prevState) => !prevState);
    if (ID) {
      setSingleEducationId(ID);
    }
  };

  const educations = education.map((el) => (
    <tr key={el._id}>
      <td>{el.school}</td>
      <td className='hide-sm'>{el.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD' date={el.from} /> -
        {el.to === null || !el.to ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{el.to}</Moment>
        )}
      </td>
      <td>
        <Link className='btn btn-primary' to={`/add-education/${el._id}`}>
          Edit
        </Link>
        <button
          onClick={() => ConfirmModalHandler(el._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>{' '}
    </tr>
  ));
  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={ConfirmModalHandler}
        header='ARE YOU SURE ?'
        footer={
          <>
            <button className='btn btn-primary' onClick={ConfirmModalHandler}>
              Cancel
            </button>
            <button className='btn btn-danger' onClick={deleteSingleEducation}>
              Delete
            </button>
          </>
        }
      >
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Do uou want to proceed and delete this field? Please note that it
          cannot be undone !!
        </p>
      </Modal>
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
