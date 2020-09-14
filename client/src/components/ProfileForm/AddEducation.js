import React, { useState, useEffect } from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import { Input } from '../../shared/Inputs/Inputs';
import {
  VALIDATOR_NONE,
  VALIDATOR_REQUIRE,
} from '../../shared/Validation/Validator';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../../shared/Inputs/Input.module.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { addEducation } from '../../store/profile';
import moment from 'moment';

export const AddEducation = () => {
  const { profile } = useSelector((state) => state.profile);
  const [singleProfileForUpdate, setSingleProfileForUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const educationId = useParams().id;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (educationId && profile) {
      const te = profile.education.find((el) => el._id === educationId);

      setSingleProfileForUpdate(te);
      setLoading(false);
    }
    setLoading(false);
  }, [educationId, profile]);
  if (singleProfileForUpdate) {
    const d = moment(singleProfileForUpdate.to).format('YYYY-MM-DD');

    console.log(d);
  }
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
  console.log(state);

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

    await dispatch(addEducation(formData, history, educationId));
  };
  return (
    !loading && (
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
                // for update we load the data from useEffect and then put here if it exists
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.school &&
                  singleProfileForUpdate.school
                }
                initialValid={
                  singleProfileForUpdate && singleProfileForUpdate.school
                    ? 'true'
                    : 'false'
                }
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
                //update
                initialValue={
                  singleProfileForUpdate && singleProfileForUpdate.degree
                }
                initialValid={
                  singleProfileForUpdate && singleProfileForUpdate.degree
                    ? 'true'
                    : 'false'
                }
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
                //update
                initialValue={
                  singleProfileForUpdate && singleProfileForUpdate.fieldofstudy
                }
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
                //update
                initialValue={
                  singleProfileForUpdate && singleProfileForUpdate.current
                }
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
                //update
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.from &&
                  moment(singleProfileForUpdate.from).format('YYYY-MM-DD')
                }
                initialValid={
                  singleProfileForUpdate && singleProfileForUpdate.from
                    ? 'true'
                    : 'false'
                }
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
                disabled={
                  state.inputs.current.value === 'true' ||
                  state.inputs.current.value === true
                }
                //update and formatting date
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.to &&
                  moment(singleProfileForUpdate.to).format('YYYY-MM-DD')
                }
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
                //update
                initialValue={
                  singleProfileForUpdate && singleProfileForUpdate.description
                }
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
    )
  );
};
