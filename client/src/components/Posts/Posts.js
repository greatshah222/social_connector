import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../shared/Spinner/Spinner';
import { getAllPosts } from '../../store/post';
import { PostItem } from './PostItem';
import { Link } from 'react-router-dom';

export const Posts = () => {
  const { posts, loading } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className='large text-primary'>Posts</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <p className='lead'>
          <FontAwesomeIcon icon='user' /> Welcome to the community
        </p>
        <Link to='/create-post' className='btn btn-primary'>
          <FontAwesomeIcon icon='plus' /> Add New Post
        </Link>
      </div>

      <div className='posts'>
        {posts.map((el) => (
          <PostItem key={el._id} post={el} />
        ))}
      </div>
    </>
  );
};
