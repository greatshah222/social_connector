import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteSingleComment } from '../../store/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '../../shared/Modal/Modal';
import classes from '../../shared/Inputs/Input.module.css';
import { CreateComment } from '../CommentForm/CreateComment';

export const CommentItem = ({ postId, comment }) => {
  const [showCommentEditForm, setShowCommentEditForm] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  console.log(comment);
  const deleteCommentHandler = async () => {
    await dispatch(deleteSingleComment(postId, comment._id));
  };
  const commentModalHandler = () => {
    setShowCommentEditForm((prevState) => !prevState);
  };
  return (
    comment && (
      <>
        <Modal
          show={showCommentEditForm}
          onCancel={commentModalHandler}
          header='EDIT COMMENT'
        >
          {' '}
          <CreateComment
            postId={postId}
            commentId={comment._id}
            closeModal={commentModalHandler}
          />
        </Modal>
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
              <>
                <button
                  onClick={deleteCommentHandler}
                  className='btn btn-danger'
                >
                  {' '}
                  <FontAwesomeIcon icon='trash' />
                </button>
                <button onClick={commentModalHandler}>
                  {' '}
                  <FontAwesomeIcon icon='edit' />
                </button>
              </>
            )}
          </div>
        </div>
      </>
    )
  );
};
