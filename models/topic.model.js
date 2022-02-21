const mongoose = require('mongoose')
const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 200,
  },
  user_id: {
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users" // influencer_id relation
  },
},{timestamps: true}
)
module.exports = mongoose.model('topic',topicSchema)