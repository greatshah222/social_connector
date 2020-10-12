import React, { useEffect, useState } from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import { Input } from '../../shared/Inputs/Inputs';
import { VALIDATOR_REQUIRE } from '../../shared/Validation/Validator';

import classes from '../../shared/Inputs/Input.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getSingleComment, addNewComment } from '../../store/comment';
import { Spinner } from '../../shared/Spinner/Spinner';
export const CreateComment = ({ commentId, postId, closeModal }) => {
  const dispatch = useDispatch();
  const { comment, loading } = useSelector((state) => state.post);

  const [Loading, setLoading] = useState(true);

  const [state, InputHandler] = useForm(
    {
      comment: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (postId && commentId) {
      dispatch(getSingleComment(postId, commentId));
      setLoading(false);
    }

    setLoading(false);
  }, [dispatch, postId, commentId]);
  const submitHanlder = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        comment: state.inputs.comment.value,
      };

      await dispatch(addNewComment(formData, postId, commentId));
      if (postId && commentId) {
        // console.log(postId, commentId);
        closeModal();
      }
    } catch (error) {}
  };
  return loading || Loading ? (
    <Spinner />
  ) : (
    <>
      <div className={classes.formPrimary} style={{ width: '100%' }}>
        <div className={classes.formSecondary}>
          <form
            onSubmit={submitHanlder}
            className={classes.formBlog}
            style={{ width: '100%' }}
          >
            <h2 className={classes.formHeader}>
              {commentId ? 'Edit your Comment' : 'leave a Comment'}
            </h2>

            <Input
              id='comment'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your comment'
              errorText='Please Enter '
              label='Comment'
              validators={[VALIDATOR_REQUIRE()]}
              initialValid={
                postId && commentId && comment && comment.comment ? true : false
              }
              // there is for update and will read this value when we have post which is not null
              initialValue={postId && commentId && comment && comment.comment}
            />

            <div>
              <button
                disabled={!state.isValid}
                className='btn btn-primary my-1'
                type='submit'
              >
                Sumbit
              </button>
              {commentId ? (
                <button
                  className='btn btn-light my-1'
                  onClick={closeModal}
                  type='button'
                >
                  Cancel
                </button>
              ) : (
                <Link className='btn btn-light my-1' to={`/posts`}>
                  Go Back
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
