const {check, validationResult} = require('express-validator');
exports.validateUser = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email can not be empty!')
    .bail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 6})
    .withMessage('Password must be more that 6 charecters'),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors, "errors  errors");
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];