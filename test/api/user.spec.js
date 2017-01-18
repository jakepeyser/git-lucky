const supertest = require('supertest-as-promised');
const app = require('../../server/app');
const agent = supertest.agent(app);
const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

describe('test /user routes', function() {
  // Retrieve OAuth token
  before(function() {
    nock('https://api.github.com')
      .get('/user')
      .reply(200, {
        login: 'testuser',
        name: 'Test User',
        avatar_url: 'https://test-image.com',
        html_url: 'https://github.com/testuser'
      });
  });

  describe('Get user info', function() {

    it('gets 401 when not authed', function() {
      return agent
        .get('/api/user')
        .expect(401);
    });

    it('retrieves user info', function() {
      return agent
        .get('/api/user')
        .set('Cookie', ['github_access_token=123ABC'])
        .then(res => {
          expect(res.body).to.have.all.keys('username', 'name', 'avatarUrl', 'githubUrl');
        })
    });
  });
});
