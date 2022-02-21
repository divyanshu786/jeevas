const {check, validationResult} = require('express-validator');
exports.create = [
  check('heading')
    .not()
    .isEmpty()
    .withMessage('heading cannot be empty')
    .isLength({min: 2})
    .withMessage('heading must be more that 1 charecters')
    .bail(),
  check('content')
    .not()
    .isEmpty()
    .withMessage('content cannot be empty')
    .isLength({min: 20})
    .withMessage('content must be more that 20 charecters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];