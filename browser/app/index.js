/* eslint-disable no-unused-vars*/

// React/Redux modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

// Redux Actions and Thunks
import store from './store';
import { fetchUser } from './redux/user';
import { fetchFollowing } from './redux/following';

// React containers and components
import App from './components/App';
import Login from './components/Login';
import Search from './components/search/SearchContainer';

// Reroute user based on current auth status
const checkAuth = (nextState, replace, cb) => {
  const path = nextState.location.pathname;
  store.dispatch(fetchUser((err) => {
    if (path === '/' && !err) {
      replace('/search');
    } else if (err && path !== '/') {
      replace('/');
    }
    cb();
  }));
}

// Retrieve supporting user data
const fetchUserData = (nextState) => {
  if (!store.getState().following.length)
    store.dispatch(fetchFollowing());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/app" component={App} onEnter={ checkAuth }>
        <Route path="/" component={Login} />
        <Route path="/search" component={Search} onEnter={ fetchUserData }/>
        <IndexRoute component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
