import React from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import { Input } from '../../shared/Inputs/Inputs';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NONE,
} from '../../shared/Validation/Validator';

import classes from '../../shared/Inputs/Input.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../../store/profile';
export const CreateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profile } = useSelector((state) => state.profile);
  const [state, InputHandler] = useForm(
    {
      company: {
        value: '',
        isValid: true,
      },
      website: {
        value: '',
        isValid: true,
      },
      location: {
        value: '',
        isValid: true,
      },
      status: {
        value: '',
        isValid: false,
      },
      skills: {
        value: '',
        isValid: false,
      },
      githubusername: {
        value: '',
        isValid: true,
      },
      bio: {
        value: '',
        isValid: true,
      },
      twitter: {
        value: '',
        isValid: true,
      },
      facebook: {
        value: '',
        isValid: true,
      },
      linkedin: {
        value: '',
        isValid: true,
      },
      youtube: {
        value: '',
        isValid: true,
      },
      instagram: {
        value: '',
        isValid: true,
      },
    },
    false
  );
  const statusData = [
    'Senior Developer',
    'Junior Developer',
    'Intern',
    'Freelancer',
    'Manager',
    'Student',
    'Instructor',
    'Other',
  ];

  const submitHanlder = async (e) => {
    // state has two field 1) inputs 2) isValid
    const {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    } = state.inputs;
    e.preventDefault();

    try {
      const formData = {
        company: company.value,
        website: website.value,
        location: location.value,
        status: status.value,
        skills: skills.value,
        githubusername: githubusername.value,
        bio: bio.value,
        twitter: twitter.value,
        facebook: facebook.value,
        linkedin: linkedin.value,
        youtube: youtube.value,
        instagram: instagram.value,
      };
      // we have to pass the history object cause of there is an error we want to stay in the same page and uf ut is success we will redirect to dashboard.
      await dispatch(createProfile(formData, history));
    } catch (error) {}
  };

  return (
    <>
      <div className={classes.formPrimary}>
        <div className={classes.formSecondary}>
          <form onSubmit={submitHanlder} className={classes.formBlog}>
            <h2 className={classes.formHeader}>EDIT PROFILE DETAILS</h2>

            <Input
              id='company'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your Company'
              errorText='Please Enter '
              label='Company'
              // u have to keep validator none and initialvalid true if u dont want to run validator
              validators={[VALIDATOR_NONE()]}
              initialValid='true'
              // there is for update and will read this value when we have profile which is not null
              initialValue={profile && profile.company}
            />
            <Input
              id='website'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your website'
              errorText='Please Enter '
              label='website'
              validators={[VALIDATOR_NONE()]}
              initialValid='true'
              initialValue={profile && profile.website}
            />
            <Input
              id='location'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your location'
              errorText='Please Enter '
              label='Location'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              initialValue={profile && profile.location}
            />
            <Input
              id='status'
              type='text'
              element='select'
              validators={[VALIDATOR_REQUIRE()]}
              onInput={InputHandler}
              placeholder='Enter your status'
              errorText='Please Enter '
              label='Status *'
              selectData={statusData}
              initialValue={profile && profile.status}
              initialValid={profile && profile.status ? 'true' : 'false'}
            />
            <Input
              id='skills'
              type='text'
              element='input'
              validators={[VALIDATOR_REQUIRE()]}
              onInput={InputHandler}
              placeholder='Enter your skills'
              errorText='Please Enter '
              label='Skills *'
              initialValue={profile && profile.skills}
              initialValid={profile && profile.skills ? 'true' : 'false'}
            />
            <Input
              id='githubusername'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your githubusername'
              errorText='Please Enter '
              label='githubName'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              // it will only read the profile calue when there is profile
              initialValue={profile && profile.githubusername}
            />
            <Input
              id='bio'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your bio'
              errorText='Please Enter '
              label='bio'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              ficon='info'
              initialValue={profile && profile.bio}
            />
            <Input
              id='twitter'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your twitter url'
              errorText='Please Enter '
              label='twitter'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              ficon={['fab', 'twitter']}
              initialValue={profile && profile.social && profile.social.twitter}
            />
            <Input
              id='facebook'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your facebook url'
              errorText='Please Enter '
              label='facebook'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              ficon={['fab', 'facebook']}
              initialValue={
                profile && profile.social && profile.social.facebook
              }
            />
            <Input
              id='linkedin'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your linkedin url'
              errorText='Please Enter '
              label='linkedin'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              ficon={['fab', 'linkedin']}
              initialValue={
                profile && profile.social && profile.social.linkedin
              }
            />
            <Input
              id='youtube'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your youtube url'
              errorText='Please Enter '
              label='youtube'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              ficon={['fab', 'youtube']}
              initialValue={profile && profile.social && profile.social.youtube}
            />
            <Input
              id='instagram'
              type='text'
              element='input'
              onInput={InputHandler}
              placeholder='Enter your instagram url'
              errorText='Please Enter '
              label='instagram'
              initialValid='true'
              validators={[VALIDATOR_NONE()]}
              ficon={['fab', 'instagram']}
              initialValue={
                profile && profile.social && profile.social.instagram
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
  );
};
