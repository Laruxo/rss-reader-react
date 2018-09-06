import React from 'react';
import PropTypes from 'prop-types';

export default class FeedHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAscending: {
        title: true,
        pubDate: true,
      },
    };
  }

  static propTypes = {
    onSort: PropTypes.func.isRequired,
  };

  handleSort(field) {
    const direction = this.state.isAscending[field] ? 'asc' : 'desc';

    const newIsAscending = this.state.isAscending;
    newIsAscending[field] = !newIsAscending[field];

    this.setState({
      isAscending: newIsAscending,
    });

    this.props.onSort({field, direction});
  }

  render() {
    return (
      <div className="feed__header">
        <button className="feed__header-button" onClick={() => this.handleSort('title')}>
          Title {this.state.isAscending['title'] ? '\u2193' : '\u2191'}
        </button>
        <button className="feed__header-button" onClick={() => this.handleSort('pubDate')}>
          Date {this.state.isAscending['pubDate'] ? '\u2193' : '\u2191'}
        </button>
      </div>
    );
  }
}
