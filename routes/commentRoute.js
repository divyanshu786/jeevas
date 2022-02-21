const router = require('express').Router()
const commentController =  require('../controllers/commentController')
const auth = require('../middleware/auth')
const commentValidation = require('../middleware/commentValidation')

router.post('/',[auth,commentValidation.create], commentController.createComment)

module.exports = router