const Post = require('../models/post.model')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const helper = require('../globalFunctions/commonFunctions.js');
const responseHandle = require('../globalFunctions/responseHandle.js');
const responseCode = require('../globalFunctions/httpResponseCode.js');
const responseMessage = require('../globalFunctions/httpResponseMessage.js');
const ObjectId = require('mongodb').ObjectID;


//user signup
async function createPost(req,res) {
  let data = req.body;
  let user_id = new ObjectId(req.body.decoded._id)
  let topic_id =  new ObjectId(data.topic_id);
  const post =  new Post({
    heading: data.heading,
    user_id: user_id,
    topic_id : topic_id,
    content : data.content,
    images : data.images

  })
  const postCreate = await post.save();
  if(postCreate){
    return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Post Created Successfully!', post);
  }else{
    return responseHandle.sendResponsewithError(res, responseCode.INTERNAL_SERVER_ERROR);
  }
}

//get posts
async function getPost(req,res) {

  let page = parseInt(req.query.page_number || 1);
  let limit = parseInt(req.query.limit || 10);
  let skip = (parseInt(req.query.page_number) - 1)* limit || 0
  let postData = await Post.aggregate([
      {
        $match: {'status' : 1 },
      },

      {
          $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "post_id",
              as: "comment_details"
          }
      },
      { $project : { heading : 1 , content : 1 , "comment_details.comment" : 1} },
      { $sort: { '_id': -1 } },
      {$limit: limit},
      {$skip: skip}
  ]);
  let postDataCount = await Post.count({'status' : 1 });

    let data = {
    "postData": postData,
    "page": page,
    "total": postDataCount,
    "limit": limit,
    "pages": Math.ceil(postDataCount / limit)

  }
  return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Topic Created Successfully!', data);
}

module.exports = {
  createPost,
  getPost
}