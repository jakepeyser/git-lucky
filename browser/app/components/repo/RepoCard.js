import React from 'react';
import { placeCommas } from '../../utils';
import moment from 'moment';

// Repo stats icons
import Watch from '../../../src/images/repo_icons/watch.svg';
import Star from '../../../src/images/repo_icons/star.svg';
import Fork from '../../../src/images/repo_icons/fork.svg';
const statIcons = (type) => {
  switch (type) {
    case 'watchers':
      return <Watch />
    case 'stars':
      return <Star />
    case 'forks':
      return <Fork />
    default:
      return null;
  }
}

export default ({ repo }) => (
  <div className="repo-card">
    <div className="repo-details">
      <a className="repo-name"
        target="_blank" href={ repo.links.htmlUrl }>
        <h4>{ repo.name }</h4>
      </a>
      <div className="repo-metadata">
        <p className="repo-lang">{ repo.language }</p>
        <p className="repo-date">Updated on { moment(repo.updatedAt).format('MMM Do, YYYY') }</p>
      </div>
      <a className="repo-home" target="_blank"
        href={ repo.links.homepage } >
        { repo.links.homepage }
      </a>
      <p className="repo-desc">{ repo.description }</p>
    </div>
    <div className="repo-stats">
    { // Render each stat icon and count
      Object.keys(repo.stats).map(type => {
        return (
          <div key={ type } className="repo-stat-wrapper">
            { statIcons(type) }
            <p>{ placeCommas(repo.stats[type]) }</p>
          </div>
        )
      })
    }
    </div>
  </div>
);
