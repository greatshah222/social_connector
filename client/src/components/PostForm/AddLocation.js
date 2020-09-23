import React from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import { Input } from '../../shared/Inputs/Inputs';
import { VALIDATOR_REQUIRE } from '../../shared/Validation/Validator';

import classes from '../../shared/Inputs/Input.module.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addNewLocation } from '../../store/post';
export const AddLocation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId = useParams().id;
  const { loading } = useSelector((state) => state.post);

  const [state, InputHandler] = useForm(
    {
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      day: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  console.log(postId);

  const submitHanlder = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        description: state.inputs.description.value,
        address: state.inputs.address.value,
        day: state.inputs.day.value,
      };
      if (postId) {
        await dispatch(addNewLocation(formData, history, postId));
      }
    } catch (error) {}
  };
  return (
    !loading && (
      <>
        <div className={classes.formPrimary}>
          <div className={classes.formSecondary}>
            <form onSubmit={submitHanlder} className={classes.formBlog}>
              <h2 className={classes.formHeader}>ADD LOCATION</h2>

              <Input
                id='description'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Enter your description'
                errorText='Please Enter '
                label='Description'
                validators={[VALIDATOR_REQUIRE()]}
              />
              <Input
                id='address'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Enter your address'
                errorText='Please Enter '
                label='address'
                validators={[VALIDATOR_REQUIRE()]}
              />
              <Input
                id='day'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Enter your day'
                errorText='Please Enter '
                label='day'
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
