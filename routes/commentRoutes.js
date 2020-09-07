const express = require('express');
const { protect } = require('../controllers/userController');
const {
  createComment,
  deleteComment,
  updateSingleComment,
} = require('../controllers/commentController');
const { check } = require('express-validator');
const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .post(check('comment', 'Comment is Required').not().isEmpty(), createComment);
router
  .route('/:comment_id')
  .delete(deleteComment)
  .patch(
    check('comment', 'Comment is Required').not().isEmpty(),
    updateSingleComment
  );

module.exports = router;
