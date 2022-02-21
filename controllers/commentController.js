const Comment = require('../models/comment.model')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const helper = require('../globalFunctions/commonFunctions.js');
const responseHandle = require('../globalFunctions/responseHandle.js');
const responseCode = require('../globalFunctions/httpResponseCode.js');
const responseMessage = require('../globalFunctions/httpResponseMessage.js');
const ObjectId = require('mongodb').ObjectID;


//user signup
async function createComment(req,res) {

  let data = req.body;
  let user_id = new ObjectId(req.body.decoded._id)
  let post_id =  new ObjectId(data.post_id);
  const comment =  new Comment({
    post_id: post_id,
    user_id: user_id,
    comment : data.comment

  })
  const commentCreate = await comment.save();
  if(commentCreate){
    return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Post Created Successfully!', comment);
  }else{
    return responseHandle.sendResponsewithError(res, responseCode.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createComment
}