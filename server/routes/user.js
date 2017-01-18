const router = require('express').Router();
const { githubRequest } = require('../utils');

// Return logged in user info
router.get('/', (req, res, next) => {
  githubRequest(
    req, res, next,
    'https://api.github.com/user',
    (result) => {
      const user = JSON.parse(result);
      return {
        username: user.login,
        name: user.name,
        avatarUrl: user. avatar_url,
        githubUrl: user.html_url
      };
    }
  );
});

module.exports = router;
