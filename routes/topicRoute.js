const router = require('express').Router()
const topicController =  require('../controllers/topicController')
const topicValidation = require('../middleware/topicValidation')
const auth = require('../middleware/auth')

router.post('/',[auth, topicValidation.create], topicController.createTopic)

router.get('/list',auth, topicController.getTopics)

module.exports = router