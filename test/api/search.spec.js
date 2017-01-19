const supertest = require('supertest-as-promised');
const app = require('../../server/app');
const agent = supertest.agent(app);
const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
describe('test /user routes', function() {
  // Retrieve OAuth token
  beforeEach(function() {
    nock('https://api.github.com')
      .get(/\/search\/repositories/)
      .reply(200, {
        items: [{
          id: 29028775,
          name: 'react-native',
          private: false,
          html_url: 'https://github.com/facebook/react-native',
          description: 'A framework for building native apps with React.',
          created_at: '2015-01-09T18:10:16Z',
          updated_at: '2017-01-18T04:39:43Z',
          homepage: 'http://facebook.github.io/react-native/',
          stargazers_count: 42941,
          watchers_count: 42941,
          language: 'JavaScript',
          forks_count: 9847
        }]
      });
  });

  describe('General search', function() {

    it('gets 401 when not authed', function() {
      return agent
        .get('/api/search/repos/')
        .expect(401);
    });

    it('retrieves ands parses a list of repositories', function() {
      return agent
        .get('/api/search/repos/')
        .set('Cookie', ['github_access_token=123ABC'])
        .then(res => {
          expect(res.body[0]).to.have.all.keys(
            'id', 'name', 'description', 'language', 'private',
            'createdAt', 'updatedAt', 'links', 'stats'
          );
        })
    });
  });

  describe('Search by username', function() {

    it('gets 401 when not authed', function() {
      return agent
        .get('/api/search/repos/user/facebook')
        .expect(401);
    });

    it('retrieves ands parses a list of repositories', function() {
      return agent
        .get('/api/search/repos/user/facebook')
        .set('Cookie', ['github_access_token=123ABC'])
        .then(res => {
          expect(res.body[0]).to.have.all.keys(
            'id', 'name', 'description', 'language', 'private',
            'createdAt', 'updatedAt', 'links', 'stats'
          );
        })
    });
  });

  describe('Search by date', function() {

    it('gets 401 when not authed', function() {
      return agent
        .get('/api/search/repos/date')
        .expect(401);
    });

    it('retrieves ands parses a list of repositories', function() {
      return agent
        .get('/api/search/repos/date')
        .set('Cookie', ['github_access_token=123ABC'])
        .then(res => {
          expect(res.body[0]).to.have.all.keys(
            'id', 'name', 'description', 'language', 'private',
            'createdAt', 'updatedAt', 'links', 'stats'
          );
        })
    });
  });

  describe('Search by language', function() {

    it('gets 401 when not authed', function() {
      return agent
        .get('/api/search/repos/language/javascript')
        .expect(401);
    });

    it('retrieves ands parses a list of repositories', function() {
      return agent
        .get('/api/search/repos/language/javascript')
        .set('Cookie', ['github_access_token=123ABC'])
        .then(res => {
          expect(res.body[0]).to.have.all.keys(
            'id', 'name', 'description', 'language', 'private',
            'createdAt', 'updatedAt', 'links', 'stats'
          );
        })
    });
  });
});
