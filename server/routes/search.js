const router = require('express').Router();
const { githubRequest, processSearchResult } = require('../utils');

// Search for a specific user's repositories
// Sorted by time of last update
// --> /api/search/repos/user/:userName
router.get('/user/:userName', (req, res, next) => {
  githubRequest(
    req, res, next,
    `https://api.github.com/search/repositories?q=user:${req.params.userName}&sort=updated`,
    processSearchResult
  );
});

// Search for repositories by creation date & time (inclusive range)
// Sorted by popularity
// --> /api/search/repos/date?after=YYYY-MM-DDTHH:MM:SS&before=YYYY-MM-DDTHH:MM:SS
router.get('/date', (req, res, next) => {
  // Construct date range query from the request query parameters
  const { after, before } = req.query;
  let dateQueryBuilder = [];
  if (after || before) {
    dateQueryBuilder.push('q=created:"');
    if (after && !before)
      dateQueryBuilder.push(`>=${after}`);
    else if (before && !after)
      dateQueryBuilder.push(`<=${before}`);
    else
      dateQueryBuilder.push(`${after} .. ${before}`);
    dateQueryBuilder.push('"&');
  }
  const dateRangeQuery = dateQueryBuilder.join('');
  
  githubRequest(
    req, res, next,
    `https://api.github.com/search/repositories?${dateRangeQuery}sort=stars`,
    processSearchResult
  );
});

// Search for repositories of a specific language
// Sorted by popularity
// --> /api/search/repos/language/:language
router.get('/language/:language', (req, res, next) => {
  githubRequest(
    req, res, next,
    `https://api.github.com/search/repositories?q=language:${req.params.language}&sort=stars`,
    processSearchResult
  );
});

module.exports = router;
