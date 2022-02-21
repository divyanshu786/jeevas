
const jwt = require("jsonwebtoken");
const responseHandle = require('../globalFunctions/responseHandle.js');
const responseCode = require('../globalFunctions/httpResponseCode.js');
const responseMessage = require('../globalFunctions/httpResponseMessage.js');

module.exports = function(req, res, next) {

  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
  }

  if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
              return responseHandle.sendResponsewithError(res, responseCode.INTERNAL_SERVER_ERROR, err);
          } else {
              req.body.decoded = decoded;
              next();
          }
      });
  } else {
      return responseHandle.sendResponseWithData(res, responseCode.EVERYTHING_IS_OK, 'Auth token is not supplied');
  }
};