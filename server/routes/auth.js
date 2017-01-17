const router = require('express').Router();

// Init OAuth2 lib with GitHub credentials
const oauth2 = require('simple-oauth2').create({
  client: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize'
  }
});

// Return the GitHub app client ID (public key)
router.get('/clientid', (req, res) => {
  res.json({ clientId: process.env.GITHUB_CLIENT_ID });
});

// Callback service parsing the auth token and requesting access token
router.get('/callback', (req, res) => {
  const options = {
    code: req.query.code
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.status(400).send('Authentication failed');
    }

    // Set response cookie with access token and redirect to search page
    const { token } = oauth2.accessToken.create(result);
    res.cookie('github_access_token', token.access_token, { maxAge: 900000, httpOnly: true });
    return res.redirect('/');
  });
});

module.exports = router;
