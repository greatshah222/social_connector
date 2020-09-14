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
import { addExperience } from '../../store/profile';
import moment from 'moment';

export const AddExperienc = () => {
  const { profile } = useSelector((state) => state.profile);
  const [singleProfileForUpdate, setSingleProfileForUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const experienceId = useParams().id;

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (experienceId && profile) {
      const te = profile.experience.find((el) => el._id === experienceId);

      setSingleProfileForUpdate(te);
      setLoading(false);
    }
    setLoading(false);
  }, [experienceId, profile]);
  const [state, InputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      company: {
        value: '',
        isValid: false,
      },
      location: {
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
  const selectData = ['true', 'false'];
  const submitHanlder = async (e) => {
    e.preventDefault();
    let {
      title,
      description,
      company,
      location,

      from,
    } = state.inputs;
    let current;
    current = state.inputs.current.value === 'true' ? true : false;
    let to;
    if (current) {
      to = null;
    } else {
      to = state.inputs.to.value;
    }

    const formData = {
      title: title.value,
      description: description.value,
      company: company.value,
      location: location.value,
      from: from.value,
      to,
      current,
    };
    await dispatch(addExperience(formData, history, experienceId));
  };
  console.log(state);
  return (
    !loading && (
      <>
        <div className={classes.formPrimary}>
          <div className={classes.formSecondary}>
            <form onSubmit={submitHanlder} className={classes.formBlog}>
              <h2 className={classes.formHeader}>ADD EXPERIENCE DETAILS</h2>
              <Input
                id='title'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Please Enter your title '
                errorText='Please Enter '
                label='title'
                validators={[VALIDATOR_REQUIRE()]}
                // for update we load the data from useEffect and then put here if it exists
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.title &&
                  singleProfileForUpdate.title
                }
                initialValid={
                  singleProfileForUpdate && singleProfileForUpdate.title
                    ? 'true'
                    : 'false'
                }
              />
              <Input
                id='company'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Please Enter your company '
                errorText='Please Enter '
                label='company'
                validators={[VALIDATOR_REQUIRE()]}
                // for update we load the data from useEffect and then put here if it exists
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.company &&
                  singleProfileForUpdate.company
                }
                initialValid={
                  singleProfileForUpdate && singleProfileForUpdate.company
                    ? 'true'
                    : 'false'
                }
              />
              <Input
                id='location'
                type='text'
                element='input'
                onInput={InputHandler}
                placeholder='Please Enter your area of study'
                errorText='Please Enter '
                label='location'
                validators={[VALIDATOR_NONE()]}
                initialValid='true'
                // for update we load the data from useEffect and then put here if it exists
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.location &&
                  singleProfileForUpdate.location
                }
              />
              <Input
                id='current'
                type='checkbox'
                element='select'
                onInput={InputHandler}
                placeholder='Please Enter your current '
                errorText='Please Enter '
                label='current'
                validators={[VALIDATOR_NONE()]}
                initialValid='true'
                selectData={selectData}
                // for update we load the data from useEffect and then put here if it exists
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.current &&
                  singleProfileForUpdate.current
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
                // for update we load the data from useEffect and then put here if it exists
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
                // for update we load the data from useEffect and then put here if it exists
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.to &&
                  moment(singleProfileForUpdate.to).format('YYYY-MM-DD')
                }
                disabled={
                  state.inputs.current.value === 'true' ||
                  state.inputs.current.value === true
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
                // for update we load the data from useEffect and then put here if it exists
                initialValue={
                  singleProfileForUpdate &&
                  singleProfileForUpdate.description &&
                  singleProfileForUpdate.description
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
