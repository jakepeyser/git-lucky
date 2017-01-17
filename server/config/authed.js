const router = require('express').Router();

router.use((req, res, next) => {
  if (!req.cookies.github_access_token) {
    req.authed = false;
  } else {
    req.authed = true;
    req.githubAuthToken = req.cookies.github_access_token;
  }
  next();
});

module.exports = router;
