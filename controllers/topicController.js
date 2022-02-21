const Topic = require('../models/topic.model')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const responseHandle = require('../globalFunctions/responseHandle.js');
const responseCode = require('../globalFunctions/httpResponseCode.js');
const responseMessage = require('../globalFunctions/httpResponseMessage.js');
const ObjectId = require('mongodb').ObjectID;


//create topic
async function createTopic(req,res) {

  const userExist = await User.findOne({_id: ObjectId(req.body.decoded._id)})
  if(userExist){
    let topic_name = req.body.name.toLowerCase();
    let user_id = new ObjectId(req.body.decoded._id)
    const topicExist = await Topic.findOne({name: topic_name})
    if(topicExist){
      return responseHandle.sendResponsewithError(res, responseCode.ALREADY_EXIST, "This topic name already exists."); 
    }else{
      const topic =  new Topic({
        name: topic_name,
        user_id: user_id
      })
      const topicCreate = await topic.save();
      if(topicCreate){
        return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Topic Created Successfully!', {name:topic_name });
      }else{
        return responseHandle.sendResponsewithError(res, responseCode.INTERNAL_SERVER_ERROR);
      }
    }
  }else{
    return responseHandle.sendResponsewithError(res, responseCode.NOT_FOUND, "Token not found.");
  }
}

//create topic
async function getTopics(req,res) {

  let page = parseInt(req.query.page_number || 1);
  let limit = parseInt(req.query.limit || 3);
  let skip = (parseInt(req.query.page_number) - 1)* limit || 0
  const topicList = await Topic.find({}).skip(skip).limit(limit);
  const topicCount = await Topic.count({});
  let data = {
    "topicData": topicList,
    //"campaignDetail":camapignDetail,
    "page": page,
    "total": topicCount,
    "limit": limit,
    "pages": Math.ceil(topicCount / limit)

  }
  return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Topic Created Successfully!', data);
}

//get topic
async function getTopics(req,res) {

  let page = parseInt(req.query.page_number || 1);
  let limit = parseInt(req.query.limit || 3);
  let skip = (parseInt(req.query.page_number) - 1)* limit || 0
  const topicList = await Topic.find({}).skip(skip).limit(limit);
  const topicCount = await Topic.count({});
  let data = {
    "topicData": topicList,
    //"campaignDetail":camapignDetail,
    "page": page,
    "total": topicCount,
    "limit": limit,
    "pages": Math.ceil(topicCount / limit)

  }
  return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Topic Created Successfully!', data);
}


module.exports = {
  createTopic,
  getTopics
}