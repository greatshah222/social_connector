import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLike, deleteSinglePost } from '../../store/post';

export const PostItem = ({
  post: { _id, description, user, likes, created_At, commentsQuantity },
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const likeHandler = () => {
    dispatch(updateLike(_id));
  };
  const deletePostHandler = () => {
    dispatch(deleteSinglePost(_id));
  };
  const likedByUserAlready = likes.some((el) => auth.user._id === el.user);
  console.log(likedByUserAlready);
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user._id}`}>
          <img className='round-img' src={user.avatar} alt='' />
          <h4>{user.name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{description}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/D'>{created_At}</Moment>
        </p>
        <button type='button' className='btn btn-light' onClick={likeHandler}>
          <FontAwesomeIcon
            icon='heart'
            color={likedByUserAlready ? 'red' : 'black'}
          />{' '}
          <span>{likes.length}</span>
        </button>

        <Link to={`/posts/${_id}`} className='btn btn-primary'>
          Comments <span className='comment-count'>{commentsQuantity}</span>
        </Link>
        {user._id === auth.user._id && (
          <>
            <button
              onClick={deletePostHandler}
              type='button'
              className='btn btn-success'
            >
              <FontAwesomeIcon icon={['fas', 'location-arrow']} /> Add Location
            </button>
            <button
              onClick={deletePostHandler}
              type='button'
              className='btn btn-danger'
            >
              <FontAwesomeIcon icon='times' />
            </button>
            <Link
              to={`/create-post/${_id}`}
              type='button'
              className='btn btn-primary'
            >
              <FontAwesomeIcon icon='edit' />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
