const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    max: 200
  },
  content : {
    type: String,
    required: true
  },
  user_id: {
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users" ,// influencer_id relation
    required: true
  },
  topic_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topics" ,// influencer_id relation
    required: true
  },
  images : {
    type: Array
  },
  status : {
    type: Number,
    default : 1
  }
},{timestamps: true}
)
module.exports = mongoose.model('post',postSchema)