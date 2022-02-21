const {check, validationResult} = require('express-validator');
exports.create = [
  check('comment')
    .not()
    .isEmpty()
    .withMessage('comment cannot be empty'),
    check('post_id')
    .not()
    .isEmpty()
    .withMessage('post_id cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];