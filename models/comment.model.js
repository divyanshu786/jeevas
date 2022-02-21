const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
  post_id: {
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts" ,// influencer_id relation
    required: true
  },
  comment : {
    type: String,
    required: true
  },
  user_id: {
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users" ,// influencer_id relation
    required: true
  },
  deleted_at : {
    type: Date
  },
},{timestamps: true}
)
module.exports = mongoose.model('comment',commentSchema)