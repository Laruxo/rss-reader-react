import React from 'react';
import '../styles/Feed.scss';
import FeedHeader from './FeedHeader';
import FeedItem from './FeedItem';
import PropTypes from 'prop-types';
import Modal from './Modal';

const sortCompare = {
  asc: function(a, b, field) {
    if (a[field] < b[field]) {
      return -1;
    }

    if (a[field] > b[field]) {
      return 1;
    }

    return 0;
  },
  desc: function(a, b, field) {
    if (a[field] > b[field]) {
      return -1;
    }

    if (a[field] < b[field]) {
      return 1;
    }

    return 0;
  },
};

export default class SortableFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'pubDate',
      direction: 'asc',
      activeItem: null,
    }
  }

  static propTypes = {
    feed: PropTypes.array.isRequired,
  };

  sortedFeed = () => {
    const sortedFeed = this.props.feed.slice(0);
    sortedFeed.sort((a, b) => sortCompare[this.state.direction](a, b, this.state.sortBy));
    return sortedFeed;
  };

  updateSorting = ({sortBy, direction}) => {
    this.setState({sortBy, direction});
  };

  openModal = (item) => {
    this.setState({activeItem: item});
  };

  closeModal = () => {
    this.setState({activeItem: null});
  };

  render() {
    return (
      <div>
        <FeedHeader onSort={this.updateSorting}/>
        <ol className="feed__list">
          {this.sortedFeed().map(
            ({guid, ...item}) => <FeedItem key={guid} item={item} onItemClick={this.openModal}/>
          )}
        </ol>
        {this.state.activeItem && <Modal item={this.state.activeItem} onClose={this.closeModal}/>}
      </div>
    );
  }
}
