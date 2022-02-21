const router = require('express').Router()
const userController =  require('../controllers/userController')
const {validateUser} = require('../middleware/validation');
const {loginValidation} = require('../middleware/loginvalidation');
const auth = require('../middleware/auth')

router.post('/signup',validateUser,userController.signup)
router.post('/login',loginValidation,userController.login)
router.get('/user',auth, userController.getCurrentUser)

module.exports = router