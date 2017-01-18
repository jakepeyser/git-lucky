const router = require('express').Router();

router.use('/auth', require('./auth'));

// Protected routes
router.use((req, res, next) => {
  if (req.authed)
    next();
  else
    next({
      status: 401,
      message: 'You must be logged in to call this route'
    });
});
router.use('/user', require('./user'));
router.use('/search/repos', require('./search'));

// No API routes matched --> 404
router.use((req, res) => res.status(404).end());

module.exports = router;
