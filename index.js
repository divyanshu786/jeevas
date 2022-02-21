const express = require('express')
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const topicRoute = require('./routes/topicRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')
require('dotenv').config()
var app = express()

//Routes
app.use(bodyparser.json())
app.get('/', function(req,res){
  res.send('App is Working')
})
app.use('/api',userRoute)
app.use('/api/topic',topicRoute)
app.use('/api/post',postRoute)
app.use('/api/comment',commentRoute)

//MongoDb connection
mongoose.connect('mongodb://localhost:27017/MyDb', {useNewUrlParser: true});
mongoose.connection.once('open',function(){
  console.log('Database connected Successfully');
}).on('error',function(err){
  console.log('Error', err);
})

//Server 
app.listen('8000',function(req,res){
  console.log('Serve is up and running at the port 8000')
})