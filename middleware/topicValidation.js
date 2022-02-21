const {check, validationResult} = require('express-validator');
exports.create = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Topic name cannot be empty')
    .isLength({min: 2})
    .withMessage('Topic must be more that 1 charecters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];