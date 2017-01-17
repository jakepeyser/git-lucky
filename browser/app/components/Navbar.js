import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Logo from '../../src/images/logo.svg';
import { Avatar } from 'material-ui';

const Navbar =  ({ home, user }) => (
  <div id="navbar">
    <div className={`navbar-background ${home ? 'opaque' : ''}`} />
    <div className="navbar-content">
      <Link to="/">
        <div className="nav-title">
          <div className="logo-wrapper">
            <Logo />
          </div>
          <h1>git lucky</h1>
        </div>
      </Link>
      {
        Object.keys(user).length ?
          <div className="user-info">
            <a href={ user.githubUrl } target="_blank">
              <Avatar src={ user.avatarUrl } />
            </a>
          </div> : null
      }
    </div>
  </div>
)

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Navbar);
