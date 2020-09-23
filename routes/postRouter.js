const express = require('express');
const { check } = require('express-validator');

const { protect } = require('../controllers/userController');
const commentRoutes = require('../routes/commentRoutes');
const {
  createNewPost,
  getAllPosts,
  getPostByPostID,
  deletePost,
  likeUpdateForPost,
  addMoreLocations,
  updatePostDetail,
} = require('../controllers/postController');

const router = express.Router();
// if there is any url starting with /id/comment it will be redireted to comment routes
router.use('/:post_id/comments', commentRoutes);

router.post(
  '/',
  [
    protect,
    check('description', 'Description is Required').not().isEmpty(),
    check('startDescription', ' Start Description is Required').not().isEmpty(),
    check('startAddress', ' Start Address is Required').not().isEmpty(),
  ],
  createNewPost
);
router.patch(
  '/:id',
  [
    protect,
    check('description', 'Description is Required').not().isEmpty(),
    check('startDescription', ' Start Description is Required').not().isEmpty(),
    check('startAddress', ' Start Address is Required').not().isEmpty(),
  ],
  updatePostDetail
);
router.get('/', protect, getAllPosts);
router.get('/:id', protect, getPostByPostID);
router.delete('/:id', protect, deletePost);

// update like for posts and includes unlike
router.patch('/like/:id', protect, likeUpdateForPost);
// add more locations
router.patch(
  '/location/:id',
  [
    protect,
    check('day', 'Day is Required').not().isEmpty(),
    check('description', ' Description is Required').not().isEmpty(),
    check('address', '  Address is Required').not().isEmpty(),
  ],
  addMoreLocations
);
module.exports = router;
