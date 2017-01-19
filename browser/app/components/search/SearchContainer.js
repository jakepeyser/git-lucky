import React from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import { parseDate } from '../../utils'
import axios from 'axios';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      error: '',
      filter: 'username',
      username: '',
      language: '',
      beforeDate: '',
      afterDate: '',
      repos: []
    }
    this.updateState = this.updateState.bind(this);
    this.search = this.search.bind(this);
  }

  updateState(field, value) {
    let newState = {};
    newState[field] = value;
    this.setState(newState);
  }

  search(evt) {
    evt.preventDefault();

    // Build the search query based on search box and filters
    let queryBuilder = [ '/api/search/repos' ];
    switch (this.state.filter) {
      case 'username':
        if (this.state.username)
          queryBuilder.push(`/user/${this.state.username}`);
        queryBuilder.push('?');
        break;
      case 'dates':
        if (this.state.afterDate || this.state.beforeDate) {
          queryBuilder.push('/date?');
          if (this.state.afterDate)
            queryBuilder.push(`after=${parseDate(this.state.afterDate)}`);
          if (this.state.afterDate && this.state.beforeDate)
            queryBuilder.push('&');
          if (this.state.beforeDate)
            queryBuilder.push(`before=${parseDate(this.state.beforeDate)}`);
        } else {
          queryBuilder.push('?');
        }
        break;
      case 'language':
        if (this.state.language)
          queryBuilder.push(`/language/${this.state.language}`);
        queryBuilder.push('?');
        break;
    }
    if (this.state.search) {
      if (queryBuilder.length > 2)
        queryBuilder.push('&');
      queryBuilder.push(`q=${this.state.search}`);
    }

    // Check for invalid search
    if (queryBuilder.length === 2) {
      return this.setState({ 
        error: 'You must specify a query or filter to search'
      })
    }

    // Make call to search API
    const url = queryBuilder.join('');
    axios.get(url)
      .then(res => {
        this.setState({ repos: res.data, error: '' });
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <Search
        updateState={ this.updateState }
        invokeSearch={ this.search }
        curFilter={ this.state.filter }
        following={ this.props.following }
        curLang={ this.state.language }
        repos={ this.state.repos }
        error={ this.state.error }
      />
    )
  }
}

const mapStateToProps = ({ following }) => ({ following });

export default connect(mapStateToProps)(SearchContainer);
