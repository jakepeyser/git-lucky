import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from './mui-theme';

export default ({ location, children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div id="content-wrapper">
      <Helmet
        defaultTitle="Git Lucky"
        titleTemplate="%s | Git Lucky"
      />
      <Navbar home={ location.pathname === '/' }/>
      <div id="content">
        { children }
      </div>
    </div>
  </MuiThemeProvider>
);
