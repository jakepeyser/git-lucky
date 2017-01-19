const request = require('request');

// GitHub API call wrapper
const githubRequest = (req, res, next, url, success) => {
  const options = {
    url,
    headers: {
      'User-Agent': 'git-lucky',
      'Authorization': `token ${req.githubAuthToken}`
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      return next(error)
    }

    // Send back result of success callback
    if (response.statusCode === 200) {
      const resultPayload = success(body);
      res.send(resultPayload);
    } else {
      // Bad token or rate limit exceeded errors
      return next({
        status: response.statusCode,
        message: JSON.parse(body).message || ''
      })
    }
  });
}

// Extract core repo details from the verbose GitHub API response
const getRepoDetails = (repo) => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  language: repo.language,
  private: repo.private,
  createdAt: repo.created_at,
  updatedAt: repo.updated_at,
  links: {
    htmlUrl: repo.html_url,
    homepage: repo.homepage
  },
  stats: {
    stars: repo.stargazers_count,
    watchers: repo.watchers_count,
    forks: repo.forks_count
  }
});

const processSearchResult = (result) => {
  return JSON.parse(result).items.map(getRepoDetails);
}

// Extract core user info
const getUserDetails = (user) => ({
  id: user.id,
  username: user.login,
  name: user.name,
  avatarUrl: user.avatar_url,
  githubUrl: user.html_url
});

const processUserResult = (result) => {
  return JSON.parse(result).map(getUserDetails);
}

module.exports = { 
  githubRequest,
  processSearchResult,
  processUserResult,
  getUserDetails
};
