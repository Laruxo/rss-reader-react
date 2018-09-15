import React from 'react';
import '../styles/Feed.scss';
import FeedInput from './FeedInput';
import FeedHeader from './FeedHeader';
import FeedItem from './FeedItem';
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

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      activeItem: null,
    };
  }

  updateFeed(feed) {
    this.setState({feed: feed});
  }

  sortFeed({field, direction}) {
    const sortedFeed = this.state.feed.slice(0);
    sortedFeed.sort((a, b) => sortCompare[direction](a, b, field));
    this.setState({feed: sortedFeed});
  }

  openModal(item) {
    this.setState({activeItem: item});
  }

  closeModal() {
    this.setState({activeItem: null});
  }

  render() {
    return (
      <div className="feed">
        <FeedInput feedUpdate={data => this.updateFeed(data)}/>
        <FeedHeader onSort={field => this.sortFeed(field)}/>
        <ol className="feed__list">
          {this.state.feed.map(
            ({guid, ...item}) => <FeedItem key={guid} item={item} onItemClick={() => this.openModal(item)}/>
          )}
        </ol>
        <Modal item={this.state.activeItem} onClose={() => this.closeModal()}/>
      </div>
    );
  }
}
