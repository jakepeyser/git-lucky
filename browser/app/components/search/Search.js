import React from 'react';
import Filters from './Filters'
import RepoCard from '../repo/RepoCard'
import { TextField, RaisedButton } from 'material-ui';

export default ({ updateState, invokeSearch,
  curFilter, following, curLang, repos, error }) => (
  <div id="search">
    <form onSubmit={ invokeSearch }>
      <TextField
        hintText="Search..."
        fullWidth={ true }
        onChange={ (evt) => updateState('search', evt.target.value) }
      />
      { // If search was clicked w/o query, display error
        error ? <p className="error-text">{ error }</p> : null
      }
      <Filters
        updateState={ updateState }
        curFilter={ curFilter }
        following={ following }
        curLang={ curLang }
      />
      <RaisedButton
        label="Search"
        type="submit"
        fullWidth={ true }
        style={{ marginTop: '15px' }}
      />
    </form>
    <div className="search-results">
    { // List all the repos returned by the search
      repos.map( (repo) => <RepoCard key={ repo.id } repo={ repo } /> )
    }
    </div>
  </div>
);
