const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true,
  },
});

// here this is called parent refrencing which means the child which is here (comment) has the information about the parents but the parents(user and post ) does not have any information about child(comment).

// we dont want to do  child refrencing cause the array might grow indefinitely(100s of 1000 of comment).
// so the solution is virtual populate we can actually populate the post with comment without keeping the id of comment on post

commentSchema.pre(/^find/, function (next) {
  // comment will be populating user and tour
  // later in post controller post will be populating comment which will again populate tour and user so twice tour so we have to remove1  tour

  this.find()
    // .populate({
    //   path: 'post',
    //   select: 'description',
    // })
    .populate({
      path: 'user',
      select: 'name avatar',
    });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
