import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteSingleComment } from '../../store/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CommentItem = ({ postId, comment }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  console.log(comment);
  const deleteCommentHandler = async () => {
    await dispatch(deleteSingleComment(postId, comment._id));
  };
  return (
    comment && (
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${comment.user._id}`}>
            <img
              className='round-img'
              src={comment.user.avatar}
              alt={comment.user.name}
            />
            <h4>{comment.user.name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{comment.comment}</p>
          <p className='post-date'>
            Posted <Moment fromNow>{comment.createdAt}</Moment>{' '}
          </p>
          {token && user._id === comment.user._id && (
            <button onClick={deleteCommentHandler} className='btn btn-danger'>
              {' '}
              <FontAwesomeIcon icon='times' />
            </button>
          )}
        </div>
      </div>
    )
  );
};