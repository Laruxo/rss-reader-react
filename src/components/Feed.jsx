import React from 'react';
import '../styles/Feed.scss';
import FeedInput from './FeedInput';
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
      isAscending: {
        title: true,
        pubDate: true,
      },
      activeItem: null,
    };
  }

  updateFeed(feed) {
    this.setState({
      feed: feed,
      isAscending: {
        title: true,
        pubDate: true,
      },
    });
  }

  sortFeed(field) {
    const orderFunc = this.state.isAscending[field] ? 'asc' : 'desc';
    const sortedFeed = this.state.feed;
    sortedFeed.sort((a, b) => {
      return sortCompare[orderFunc](a, b, field);
    });

    const newIsAscending = this.state.isAscending;
    newIsAscending[field] = !newIsAscending[field];

    this.setState({
      feed: sortedFeed,
      isAscending: newIsAscending,
    });
  }

  firstParagraph(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    let content = div.firstElementChild.innerHTML.substr(0, 120);
    if (content.length) {
      content += '...';
    }
    return content;
  }

  openModal(item) {
    this.setState({
      activeItem: item,
    });
  }

  render() {
    return (
      <div className="feed">
        <FeedInput feedUpdate={data => this.updateFeed(data)}/>
        <div className="feed__header">
          <button className="feed__header-button" onClick={() => this.sortFeed('title')}>
            Title {this.state.isAscending['title'] ? '\u2193' : '\u2191'}
          </button>
          <button className="feed__header-button" onClick={() => this.sortFeed('pubDate')}>
            Date {this.state.isAscending['pubDate'] ? '\u2193' : '\u2191'}
          </button>
        </div>
        <ol className="feed__list">
          {this.state.feed.map(item =>
            <li key={item.guid} className="feed__item" onClick={() => this.openModal(item)}>
              <div className="feed__item-title">{item.title}</div>
              <span className="feed__item-date">{item.pubDate}</span>
              <p className="feed__item-description">{this.firstParagraph(item.description)}</p>
            </li>
          )}
        </ol>
        <Modal item={this.state.activeItem}/>
      </div>
    );
  }
}
