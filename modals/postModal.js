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
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      // dont know why but this must be named coordiantes for the geo keys validation
      coordinates: [Number],
      startAddress: {
        type: String,
        required: true,
      },
      startDescription: {
        type: String,
        required: true,
      },
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],

        address: { type: String, required: true },
        description: { type: String, required: true },
        day: { type: Number, required: true },
      },
    ],
  },
  // for virtual property to work
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.index({ startLocation: '2dsphere' });

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
