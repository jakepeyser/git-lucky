/* eslint-disable no-unused-vars*/

// React/Redux modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

// Redux Actions and Thunks
import store from './store';
import { fetchUser } from './redux/user';

// React containers and components
import App from './components/App';
import Login from './components/Login';
import Search from './components/search/Search';

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

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/app" component={App} onEnter={ checkAuth }>
        <Route path="/" component={Login} />
        <Route path="/search" component={Search} />
        <IndexRoute component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
