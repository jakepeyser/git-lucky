const router = require('express').Router();
const { githubRequest, processUserResult, getUserDetails } = require('../utils');

// Return logged in user info
router.get('/', (req, res, next) => {
  githubRequest(
    req, res, next,
    'https://api.github.com/user',
    (result) => getUserDetails(JSON.parse(result))
  );
});

// Return the users that the logged in user is following
router.get('/following', (req, res, next) => {
  githubRequest(
    req, res, next,
    'https://api.github.com/user/following',
    processUserResult
  );
});

module.exports = router;
