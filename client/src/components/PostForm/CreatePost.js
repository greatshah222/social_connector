import React, { useEffect, useState } from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import { Input } from '../../shared/Inputs/Inputs';
import { VALIDATOR_REQUIRE } from '../../shared/Validation/Validator';

import classes from '../../shared/Inputs/Input.module.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPostByPostId, addNewPost } from '../../store/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const CreatePost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { post, loading } = useSelector((state) => state.post);
  const postId = useParams().id;
  const [Loading, setLoading] = useState(true);

  const [state, InputHandler] = useForm(
    {
      description: {
        value: '',
        isValid: false,
      },
      startAddress: {
        value: '',
        isValid: false,
      },
      startDescription: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  console.log(post);
  console.log(postId);
  console.log(post && post.startLocation.startAddress);

  useEffect(() => {
    if (postId) {
      dispatch(getPostByPostId(postId));
      setLoading(false);
    } else {
      setLoading(false);
    }

    // even if there is not any postId we have to change the loading state to false
  }, [dispatch, postId]);
  console.log(state);
  const submitHanlder = async (e) => {
    // state has two field 1) inputs 2) isValid

    e.preventDefault();

    try {
      const formData = {
        description: state.inputs.description.value,
        startDescription: state.inputs.startDescription.value,
        startAddress: state.inputs.startAddress.value,
      };
      // we have to pass the history object cause of there is an error we want to stay in the same page and uf ut is success we will redirect to dashboard.
      if (postId) {
        await dispatch(addNewPost(formData, history, postId));
      } else {
        await dispatch(addNewPost(formData, history));
      }
    } catch (error) {}
  };
  // Loading is internal state wheras loading comes when we get the result from getPostByPostId in redux
  return (
    !Loading &&
    !loading && (
      <>
        <FontAwesomeIcon />
        <div className={classes.formPrimary}>
          <div className={classes.formSecondary}>
            <form onSubmit={submitHanlder} className={classes.formBlog}>
              <h2 className={classes.formHeader}>ADD/EDIT POST DETAILS</h2>

              <Input
                id='description'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Enter your description'
                errorText='Please Enter '
                label='Description'
                validators={[VALIDATOR_REQUIRE()]}
                initialValid={postId && post && post.description ? true : false}
                // there is for update and will read this value when we have post which is not null

                initialValue={postId && post && post.description}
              />
              <Input
                id='startDescription'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Enter your startDescription'
                errorText='Please Enter '
                label='startDescription'
                validators={[VALIDATOR_REQUIRE()]}
                initialValid={
                  postId && post && post.startLocation.startDescription
                    ? true
                    : false
                }
                initialValue={
                  postId && post && post.startLocation.startDescription
                }
              />
              <Input
                id='startAddress'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Enter your startAddress'
                errorText='Please Enter '
                label='startAddress'
                // have to check for post id cause if we click the other update method the post is already saved in the redux dispatch and next time even u click the create new post it will get data from old post
                initialValid={
                  postId && post && post.startLocation.startAddress
                    ? true
                    : false
                }
                initialValue={postId && post && post.startLocation.startAddress}
                validators={[VALIDATOR_REQUIRE()]}
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
