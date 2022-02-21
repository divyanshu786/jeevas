const User = require('../models/user.model')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const helper = require('../globalFunctions/commonFunctions.js');
const responseHandle = require('../globalFunctions/responseHandle.js');
const responseCode = require('../globalFunctions/httpResponseCode.js');
const responseMessage = require('../globalFunctions/httpResponseMessage.js');


//user signup
async function signup(req,res) {

  const salt = await bycrypt.genSalt(10);
  hashpassword = await bycrypt.hash(req.body.password, salt)
  let validEmail = await validateEmail(req.body.email);
  if(validEmail == false){
    return responseHandle.sendResponsewithError(res, responseCode.NOT_FOUND, 'Please enter a valid E-mail id');
  }

  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist){
    return responseHandle.sendResponsewithError(res, responseCode.ALREADY_EXIST, "Email already exists."); 
  }

  const user =  new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword
  })
  const userSignup = await user.save();
  let email = await helper.sendEmail(req.body.name,req.body.email);
  if(userSignup){
    let token = '';
    return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Registered Successfully!', {name:req.body.name, email: req.body.email, token : token }, token);
  }else{
    return responseHandle.sendResponsewithError(res, responseCode.INTERNAL_SERVER_ERROR);
  }
  
}

//Login Controller
async function login(req,res){
  let validEmail = await validateEmail(req.body.email);
  if(validEmail == false){
    return responseHandle.sendResponsewithError(res, responseCode.UNAUTHORIZED, 'Please enter a valid E-mail id');
  }
  const emailExist = await User.findOne({email: req.body.email})
  //console.log(emailExist, "emailExist  emailExist", process.env.SECRET);
  if(!emailExist){
    return responseHandle.sendResponsewithError(res, responseCode.NOT_FOUND, "Email not found.");
  }
  const checkpassword = await bycrypt.compare(req.body.password, emailExist.password)
  if(!checkpassword){
   return responseHandle.sendResponsewithError(res, responseCode.NOT_FOUND, "Password did not match");
  }
  const token = jwt.sign({_id: emailExist.id},process.env.SECRET)

  return responseHandle.sendResponseWithData(
    res, 
    responseCode.EVERYTHING_IS_OK, 
    'Login successfully', 
    {user_id : emailExist._id,name : emailExist.name },
    token
  );
}

async function getCurrentUser(req,res){
  console.log(req.params)
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

validateEmail = async (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
} 

module.exports = {
  signup,
  login,
  getCurrentUser
}