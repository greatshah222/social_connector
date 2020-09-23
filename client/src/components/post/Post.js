import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostByPostId } from '../../store/post';
import Moment from 'react-moment';
import { CreateComment } from '../CommentForm/CreateComment';
import { CommentItem } from '../Comment/CommentItem';

export const Post = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const { post } = useSelector((state) => state.post);
  const postId = useParams().id;
  useEffect(() => {
    dispatch(getPostByPostId(postId));
    setLoading(false);

    // even if there is not any postId we have to change the loading state to false
  }, [dispatch, postId]);
  console.log(post);
  return (
    !loading &&
    post && (
      <>
        <div className='post bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/${post.user._id}`}>
              <img className='round-img' src={post.user.avatar} alt='' />
              <h4>{post.user.name}</h4>
            </Link>
          </div>
          <div>
            <p className='my-1'>{post.description}</p>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/D'>{post.created_At}</Moment>
            </p>
          </div>
        </div>
        <CreateComment postId={post._id} />

        <div className='comments'>
          {post.comments.map((el) => (
            <CommentItem key={el._id} postId={post._id} comment={el} />
          ))}
        </div>
      </>
    )
  );
};