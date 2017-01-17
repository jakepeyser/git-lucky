const router = require('express').Router();
const request = require('request');

// Return logged in user info
router.get('/', (req, res, next) => {
  const options = {
    url: 'https://api.github.com/user',
    headers: {
      'User-Agent': 'git-lucky',
      'Authorization': `token ${req.githubAuthToken}`
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      return next(error)
    }

    // Send back GitHub user info
    if (response.statusCode === 200) {
      const user = JSON.parse(body);
      return res.send({
        username: user.login,
        name: user.name,
        avatarUrl: user. avatar_url,
        githubUrl: user.html_url
      })
    } else if (response.statusCode === 401 || response.statusCode === 403) {
      // Bad token or rate limit exceeded errors
      return next({
        status: response.statusCode,
        message: JSON.parse(body).message
      })
    }
  });
});


module.exports = router;
