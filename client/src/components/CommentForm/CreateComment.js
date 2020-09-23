import React, { useEffect, useState } from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import { Input } from '../../shared/Inputs/Inputs';
import { VALIDATOR_REQUIRE } from '../../shared/Validation/Validator';

import classes from '../../shared/Inputs/Input.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSingleComment, addNewComment } from '../../store/comment';
export const CreateComment = ({ commentId, postId }) => {
  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.post);

  const [loading, setLoading] = useState(true);

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
  console.log(state);
  const submitHanlder = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        comment: state.inputs.comment.value,
      };
      // we have to pass the history object cause of there is an error we want to stay in the same page and uf ut is success we will redirect to dashboard.
      await dispatch(addNewComment(formData, postId, commentId));
    } catch (error) {}
  };
  console.log(comment);
  return (
    !loading && (
      <>
        <FontAwesomeIcon />
        <div className={classes.formPrimary}>
          <div className={classes.formSecondary}>
            <form onSubmit={submitHanlder} className={classes.formBlog}>
              <h2 className={classes.formHeader}>leave a Comment</h2>

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
                  postId && commentId && comment && comment.comment
                    ? true
                    : false
                }
                // there is for update and will read this value when we have post which is not null
                initialValue={postId && commentId && comment && comment.comment}
              />

              <div>
                <button
                  disabled={!state.isValid}
                  className='btn btn-primary my-1'
                >
                  Sumbit
                </button>
                <Link className='btn btn-light my-1' to='/posts'>
                  Go Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
};
