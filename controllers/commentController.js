const Comment = require('../modals/commentModal');
const { validationResult } = require('express-validator');
const Post = require('../modals/postModal');
exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const post = await Post.findById(req.params.post_id);
  if (!post) {
    return res.status(400).json({
      msg: 'No post found',
    });
  }
  const comment = await Comment.create({
    comment: req.body.comment,
    user: req.user._id,
    post: req.params.post_id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: comment,
    },
  });
};

exports.deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.post_id);
  const comment = await Comment.findById(req.params.comment_id);
  if (!post || !comment) {
    return res.status(400).json({
      msg: 'No document found',
    });
  }

  if (comment.user._id.toString() != req.user._id) {
    return res.status(401).json({
      msg: 'Not Authorized',
    });
  }
  // have to use findByIDAnd delete so that our post middleware for updating the comment in the post will work
  await Comment.findByIdAndDelete(req.params.comment_id);
  res.status(204).json({
    status: 'success',
  });
};
exports.updateSingleComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const post = await Post.findById(req.params.post_id);
  const comment = await Comment.findById(req.params.comment_id);
  if (!post || !comment) {
    return res.status(400).json({
      msg: 'No document found',
    });
  }
  comment.comment = req.body.comment;
  await comment.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: comment,
    },
  });
};
