import React from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import { Input } from '../../shared/Inputs/Inputs';
import {
  VALIDATOR_NONE,
  VALIDATOR_REQUIRE,
} from '../../shared/Validation/Validator';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../../shared/Inputs/Input.module.css';
import { Link, useHistory } from 'react-router-dom';
import { addEducation } from '../../store/profile';
// CANT USE FOR UPDATE OF THE EDUCATION CAUSE EDUCATION FIELD IS AN ARRAY IN OUR BACKEND
export const AddEducation = () => {
  const { profile } = useSelector((state) => state.profile);

  const history = useHistory();
  const dispatch = useDispatch();
  console.log(profile);
  const selectData = ['true', 'false'];
  const [state, InputHandler] = useForm(
    {
      school: {
        value: '',
        isValid: false,
      },
      degree: {
        value: '',
        isValid: false,
      },
      fieldofstudy: {
        value: '',
        isValid: true,
      },
      from: {
        value: '',
        isValid: false,
      },
      to: {
        value: '',
        isValid: true,
      },
      current: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
    },
    false
  );
  const submitHanlder = async (e) => {
    e.preventDefault();
    const {
      school,
      description,
      degree,
      fieldofstudy,

      to,
      from,
    } = state.inputs;
    let current;
    current = state.inputs.current.value === 'true' ? true : false;
    const formData = {
      school: school.value,
      description: description.value,
      degree: degree.value,
      fieldofstudy: fieldofstudy.value,
      from: from.value,
      to: to.value,
      current,
    };
    await dispatch(addEducation(formData, history));
  };
  console.log(state);
  return (
    <>
      <div className={classes.formPrimary}>
        <div className={classes.formSecondary}>
          <form onSubmit={submitHanlder} className={classes.formBlog}>
            <h2 className={classes.formHeader}>ADD EDUCATION DETAILS</h2>
            <Input
              id='school'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Please Enter your School '
              errorText='Please Enter '
              label='School'
              validators={[VALIDATOR_REQUIRE()]}
              ficon={['fas', 'school']}
            />
            <Input
              id='degree'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Please Enter your degree '
              errorText='Please Enter '
              label='degree'
              validators={[VALIDATOR_REQUIRE()]}
            />
            <Input
              id='fieldofstudy'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Please Enter your area of study'
              errorText='Please Enter '
              label='fieldofstudy'
              validators={[VALIDATOR_NONE()]}
              initialValid='true'
            />
            <Input
              id='current'
              type='text'
              element='select'
              onInput={InputHandler}
              placeholder='Please Enter your current '
              errorText='Please Enter '
              label='current'
              validators={[VALIDATOR_NONE()]}
              initialValid='true'
              selectData={selectData}
            />
            <Input
              id='from'
              type='date'
              element='input'
              onInput={InputHandler}
              placeholder='Please Enter your from '
              errorText='Please Enter '
              label='from'
              validators={[VALIDATOR_REQUIRE()]}
            />
            <Input
              id='to'
              type='date'
              element='input'
              onInput={InputHandler}
              placeholder='Please Enter your to '
              errorText='Please Enter '
              label='to'
              validators={[VALIDATOR_NONE()]}
              initialValid='true'
              disabled={state.inputs.current.value === 'true'}
            />

            <Input
              id='description'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Please Enter your description '
              errorText='Please Enter '
              label='description'
              validators={[VALIDATOR_NONE()]}
              initialValid='true'
              ficon='info'
            />
            <div>
              <button
                disabled={!state.isValid}
                className='btn btn-primary my-1'
              >
                Sumbit
              </button>
              <Link className='btn btn-light my-1' to='/dashboard'>
                Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
