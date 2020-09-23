const { validationResult } = require('express-validator');
const Post = require('../modals/postModal');
const { convertAddresstoCoordinates } = require('../utils/location');

const validationError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
exports.createNewPost = async (req, res) => {
  await validationError(req, res);

  const { startAddress, startDescription, description } = req.body;
  let coordinates;
  try {
    coordinates = await convertAddresstoCoordinates(startAddress);
  } catch (error) {
    return res.status(400).json({
      msg: 'Please provide the valid address',
    });
  }
  console.log(coordinates);
  const startLocation = {};
  if (coordinates) startLocation.coordinates = coordinates;
  if (startAddress) startLocation.startAddress = startAddress;
  if (startDescription) startLocation.startDescription = startDescription;
  const newPost = {
    description,
    user: req.user._id,
    startLocation,
  };
  const post = await Post.create(newPost);
  res.status(201).json({
    status: 'success',
    data: {
      data: post,
    },
  });
};
// update post

exports.updatePostDetail = async (req, res) => {
  await validationError(req, res);

  const { startAddress, startDescription, description } = req.body;
  let coordinates;
  try {
    coordinates = await convertAddresstoCoordinates(startAddress);
  } catch (error) {
    return res.status(400).json({
      msg: 'Please provide the valid address',
    });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({
      msg: 'No documnent found',
    });
  }
  if (coordinates) post.startLocation.coordinates = coordinates;

  if (startAddress) post.startLocation.startAddress = startAddress;
  if (startDescription) post.startLocation.startDescription = startDescription;
  if (description) post.description = description;
  await post.save();

  res.status(201).json({
    status: 'success',
    data: {
      data: post,
    },
  });
};

exports.getAllPosts = async (req, res) => {
  // most recent first
  const posts = await Post.find()
    .sort({ date: -1 })
    .populate({ path: 'comments' });

  res.status(200).json({
    status: 'success',
    length: posts.length,
    data: {
      data: posts,
    },
  });
};
exports.getPostByPostID = async (req, res) => {
  // most recent first
  let post = await Post.findById(req.params.id).populate({ path: 'comments' });
  if (!post) {
    return res.status(404).json({
      msg: 'No post found',
    });
  }
  res.status(200).json({
    status: 'success',

    data: {
      data: post,
    },
  });
};
exports.deletePost = async (req, res) => {
  // most recent first
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      msg: 'No post found',
    });
  }
  if (post.user._id.toString() != req.user._id) {
    return res.status(401).json({
      msg: 'Not Authorized',
    });
  }
  await post.remove();
  res.status(204).json({
    status: 'success',
  });
};

//likeUpdateForPost
exports.likeUpdateForPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  // check if post has already been liked by user then we will unlike them

  if (
    post.likes.filter((el) => el.user.toString() == req.user._id).length > 0
  ) {
    post.likes = post.likes.filter((el) => el.user.toString() != req.user._id);
    await post.save();
    return res.status(200).json({
      status: 'success',
      data: {
        data: post,
      },
    });
  }

  post.likes.push({ user: req.user._id });

  await post.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: post,
    },
  });
};

exports.addMoreLocations = async (req, res) => {
  validationError(req, res);
  const { address, description, day } = req.body;
  let coordinates;
  try {
    coordinates = await convertAddresstoCoordinates(address);
  } catch (error) {
    return res.status(400).json({
      msg: 'Please provide the valid address',
    });
  }
  const locationDetail = {};
  if (address) locationDetail.address = address;
  if (coordinates) locationDetail.coordinates = coordinates;
  if (description) locationDetail.description = description;
  if (day) locationDetail.day = day;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      msg: 'No post found to add more locations.',
    });
  }
  post.locations.push(locationDetail);
  await post.save();
  res.status(201).json({
    status: 'success',

    data: {
      data: post,
    },
  });
};
