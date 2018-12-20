import React from 'react';
import PropTypes from 'prop-types';

export default class FeedHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'pubDate',
      isAscending: true,
    };
  }

  static propTypes = {
    onSort: PropTypes.func.isRequired,
  };

  handleSort(sortBy) {
    this.setState(
      prevState => ({sortBy, isAscending: !prevState.isAscending}),
      () => this.props.onSort({sortBy, direction: this.state.isAscending ? 'asc' : 'desc'}),
    );
  };

  render() {
    const {sortBy, isAscending} = this.state;
    return (
      <div className="feed__header">
        <button className="feed__header-button" onClick={() => this.handleSort('title')}>
          Title {sortBy === 'title' && (isAscending ? '\u2193' : '\u2191')}
        </button>
        <button className="feed__header-button" onClick={() => this.handleSort('pubDate')}>
          Date {sortBy === 'pubDate' && (isAscending ? '\u2193' : '\u2191')}
        </button>
      </div>
    );
  }
}
