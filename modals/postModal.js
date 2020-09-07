const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    commentsQuantity: {
      type: Number,
      default: 0,
    },
    // likes has an array of user object so that 1 user can only like 1 post 1 time
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  // for virtual property to work
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// for the virtual property of comment
// comments is the name given by us
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

// it will populuate above user with name and avatar
postSchema.pre(/^find/, function (next) {
  this.find().populate({
    path: 'user',
    select: 'name avatar',
  });
  next();
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
