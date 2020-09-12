const Profile = require('../modals/profileModal');
const { validationResult } = require('express-validator');
const User = require('../modals/userModal');
const axios = require('axios');

exports.getOwnProfileDetail = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate(
    'user'
  );
  if (!profile) {
    return res.status(400).json({
      errors: [{ msg: 'There is no profile for this user' }],
    });
  }

  res.json({
    status: 'success',
    data: {
      data: profile,
    },
  });
};

exports.createUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user._id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  // in our modal skills is an array so we are changing all the skill of the user seperated by commas and in triming them to an array
  console.log(skills);
  // in the update method the skills is already an array
  if (skills && !Array.isArray(skills))
    profileFields.skills = skills.split(',').map((el) => el.trim());

  // our social field is object in pur profile modal
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (instagram) profileFields.social.instagram = instagram;
  if (twitter) profileFields.social.twitter = twitter;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (facebook) profileFields.social.facebook = facebook;

  let profile = await Profile.findOne({ user: req.user._id });
  if (profile) {
    // update if there is profile

    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true }
    );

    return res.json({
      status: 'success',
      data: {
        data: profile,
      },
    });
  }
  profile = await Profile.create(profileFields);
  return res.json({
    status: 'success',
    data: {
      data: profile,
    },
  });
};

// get all profile

exports.getAllProfile = async (req, res) => {
  const profiles = await Profile.find().populate({
    path: 'user',
    select: 'avatar name',
  });
  res.status(200).json({
    status: 'success',
    number: profiles.length,
    data: {
      data: profiles,
    },
  });
};

exports.getProfileByUserID = async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.uid }).populate({
    path: 'user',
    select: 'avatar name',
  });
  if (!profile) {
    return res.status(400).json({
      errors: [{ msg: 'No Profile Found' }],
    });
  }
  res.json({
    status: 'success',
    data: {
      data: profile,
    },
  });
};
// deletes both user and profile
exports.deleteUserOwnProfile = async (req, res) => {
  await Profile.findOneAndDelete({ user: req.user._id });
  await User.findByIdAndDelete({ _id: req.user._id });

  res.status(204).json({
    status: 'success',
    data: {
      msg: 'User deleted',
    },
  });
};

/// updateExperience

exports.updateExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, company, location, to, from, current, description } = req.body;
  // create a new object to store all the experience
  const newExperience = {
    title,
    company,
    location,
    to,
    from,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user.id });
  // push pushes to the end but if u want to do it in the beginning u can use unshift()
  profile.experience.push(newExperience);
  await profile.save();

  res.status(201).json({
    status: 'success',
    data: {
      data: profile,
    },
  });
};

exports.deleteSingleExperience = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  profile.experience = profile.experience.filter(
    (el) => el._id.toString() !== req.params.exp_id
  );
  await profile.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: profile,
    },
  });
};

// update education
exports.updateEducation = async (req, res) => {
  const educationID = req.params.education_id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  // updating single education which has already been created

  let profile = await Profile.findOne({ user: req.user._id });
  if (educationID) {
    const allEducation = [...profile.education];
    const singleEducation = allEducation.find(
      (el) => el._id.toString() === educationID
    );

    if (school) singleEducation.school = school;
    if (degree) singleEducation.degree = degree;
    if (fieldofstudy) singleEducation.fieldofstudy = fieldofstudy;
    if (from) singleEducation.from = from;
    if (to) singleEducation.to = to;
    if (current) singleEducation.current = current;
    if (description) singleEducation.description = description;

    const index = allEducation.indexOf(singleEducation);
    allEducation[index] = singleEducation;
    profile.education = allEducation;
    await profile.save();
    return res.json({
      status: 'success',
      data: {
        data: profile,
      },
    });
  }
  // creating new education
  const newEducation = {};
  if (school) newEducation.school = school;
  if (degree) newEducation.degree = degree;
  if (fieldofstudy) newEducation.fieldofstudy = fieldofstudy;
  if (from) newEducation.from = from;
  if (to) newEducation.to = to;
  if (current) newEducation.current = current;
  if (description) newEducation.description = description;

  profile.education.push(newEducation);
  await profile.save();
  return res.json({
    status: 'success',
    data: {
      data: profile,
    },
  });
};

// deleteSingleEducation

exports.deleteSingleEducation = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  profile.education = profile.education.filter(
    (el) => el._id.toString() !== req.params.education_id
  );
  await profile.save();
  res.status(200).json({
    status: 'success',
    length: profile.length,
    data: {
      data: profile,
    },
  });
};

// git githubInfo. if u use github token there will be no limit in sent request

exports.githubInfo = async (req, res) => {
  const headers = {
    'user-agent': 'node.js',
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  };
  let respo;
  try {
    respo = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      { headers }
    );
  } catch (error) {
    return res.status(400).json({
      errors: [{ msg: 'No github profile found for this user' }],
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: respo.data,
    },
  });
};
