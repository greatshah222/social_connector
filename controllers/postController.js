const { validationResult } = require('express-validator');
const Post = require('../modals/postModal');

exports.createNewPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newPost = {
    description: req.body.description,
    user: req.user._id,
  };
  const post = await Post.create(newPost);
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
  const post = await Post.findById(req.params.id);
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
  if (post.user.toString() != req.user._id) {
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
