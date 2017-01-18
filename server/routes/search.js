const router = require('express').Router();
const { githubRequest, processSearchResult } = require('../utils');

// Search for repositories
// Sorted by time of last update
// --> /api/search/repos
router.get('/', (req, res, next) => {
  // Construct general query
  const { q } = req.query;
  const query = q ? `q=${q}&` : '';

  githubRequest(
    req, res, next,
    `https://api.github.com/search/repositories?${query}sort=stars`,
    processSearchResult
  );
});

// Search for a specific user's repositories
// Sorted by time of last update
// --> /api/search/repos/user/:userName
router.get('/user/:userName', (req, res, next) => {
  // Construct username query
  const { q } = req.query;
  const userQuery = `q=${q ? `${q}+` : ''}user:${req.params.userName}&`

  githubRequest(
    req, res, next,
    `https://api.github.com/search/repositories?${userQuery}sort=updated`,
    processSearchResult
  );
});

// Search for repositories by creation date & time (inclusive range)
// Sorted by popularity
// --> /api/search/repos/date?after=YYYY-MM-DDTHH:MM:SS&before=YYYY-MM-DDTHH:MM:SS
router.get('/date', (req, res, next) => {
  // Construct date range query from the request query parameters
  const { q, after, before } = req.query;
  let dateQueryBuilder = [];
  dateQueryBuilder.push('q=');
  if (q)
    dateQueryBuilder.push(`${q}+`);
  dateQueryBuilder.push('created:"');
  if (after && !before)
    dateQueryBuilder.push(`>=${after}`);
  else if (before && !after)
    dateQueryBuilder.push(`<=${before}`);
  else
    dateQueryBuilder.push(`${after} .. ${before}`);
  dateQueryBuilder.push('"&');
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
  // Construct language query
  const { q } = req.query;
  const langQuery = `q=${q ? `${q}+` : ''}language:${req.params.language}&`

  githubRequest(
    req, res, next,
    `https://api.github.com/search/repositories?${langQuery}sort=stars`,
    processSearchResult
  );
});

module.exports = router;
