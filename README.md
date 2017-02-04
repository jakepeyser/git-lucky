# git lucky

_Feeling lucky? This app allows you to perform advanced searches for GitHub repositories_

## API Details

There are three main API routes: `/auth`, `/user`, and `/search`. They are all prefixed with the `/api` sub-path.

### Auth - `/auth`

These routes are used for authentication purposes  
**GET /api/auth/clientid** - Retrieve the GitHub Client ID (public key) from the server  
**GET /api/auth/callback** - Called by the GitHyb OAuth2 service upon successful user web flow authorization

### User - `/user`

These routes are used to retrieve information about the logged-in user  
**GET /api/user** - Retrieve the user details for the logged-in user  
**GET /api/user/following** - Retrieve the users that the logged-in user is following

### Search - `/search`

These routes are used to search for repositories based on various criteria. Each API takes a query paramater `q` that searches for that term somewhere within the repo.  
**GET /api/search/repos** - Search for repos containing the requested query  
**GET /api/search/repos/user/:username** - Search for repos created by the specified user  
**GET /api/search/repos/date** - Search for repos created before, after, or between the specified date range  
- `after=YYYY-MM-DD`  
- `before=YYYY-MM-DD`  
**GET /api/search/repos/lanuage/:language** - Search for repos comprised of the specified language  

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/83fe207d840dca02822a)

## Running Locally

### Prerequisites
- [Node.js and npm](https://nodejs.org/en/)
- [GitHub application](https://github.com/settings/developers)

### Installing

```sh
git clone https://github.com/jakepeyser/git-lucky.git
cd git-lucky
npm install
```

This will copy the project to your local machine and install all runtime dependencies, as well as Webpack build tools.

You will also need to create a `.env` file at the root of the project to store your GitHub application credentials for development. It should look something like this:

```sh
GITHUB_CLIENT_ID = XXX
GITHUB_CLIENT_SECRET = XXX
```

### Running the app

```sh
npm run build-dev
npm start
```

The first command will run Webpack, building the front end static files in development mode. The second command will run the http server. This setup simulates a production environment without the performance enhacements.

### Alternate development commands

- `npm run build-watch` - Build the front end app in "watch" mode, such that the build is re-run every time source files are updated and saved.
- `npm run hmr` - Serve the front end app from a dev-server running on `localhost:3000` so that static files can be hot-swapped without reloading the app. API calls are proxied to `8080`, so you still need the Node server running.
- `npm run dev` - Start the Node server in "watch" mode, so that it automatically restarts when source files are changed.

## Running in Prod

Running the application in Prod is similar to running it locally:

```sh
npm install
npm run build
npm start
```

Also, make sure to add the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables with their respective values to your production environment.

## Testing

To run the unit test suite, execute the command `npm test`. To continuously run the tests while actively developing, run `npm run test-watch`.
