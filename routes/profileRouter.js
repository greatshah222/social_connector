const express = require('express');
const { check } = require('express-validator');

const { protect } = require('../controllers/userController');
const {
  getOwnProfileDetail,
  createUserProfile,
  getAllProfile,
  getProfileByUserID,
  deleteUserOwnProfile,
  updateExperience,
  deleteSingleExperience,
  updateEducation,
  deleteSingleEducation,
} = require('../controllers/profileController');

const router = express.Router();

// GET ALL PROFILE
router.get('/', getAllProfile);

router.get('/me', protect, getOwnProfileDetail);

// get profile by userid
router.get('/user/:uid', protect, getProfileByUserID);

router.post(
  '/',
  [
    protect,
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
  ],
  createUserProfile
);

// delete user own  profile also deletes the user

router.delete('/', protect, deleteUserOwnProfile);

// update profile experience

router.patch(
  '/experience',
  [
    protect,
    check('title', 'Title is Required').not().isEmpty(),
    check('company', 'Company is Required').not().isEmpty(),
    check(
      'from',
      'From Date is required and needs to be from the past'
    ).isBefore(),
  ],
  updateExperience
);

//  update profile  education. if there is eduction_id that specific education id will be updated.

router.patch(
  '/education/:education_id?',
  [
    protect,
    check('school', 'School Info is Required').not().isEmpty(),
    check('degree', 'Degree is Required').not().isEmpty(),
    check(
      'from',
      'From Date is required and needs to be from the past'
    ).isBefore(),
  ],
  updateEducation
);

// DELETE EXPERIENCE
router.delete('/experience/:exp_id', protect, deleteSingleExperience);

// DELETE EDUCATION'
router.delete('/education/:education_id', protect, deleteSingleEducation);

module.exports = router;
