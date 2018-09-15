import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FeedInput.scss';
import 'promise-polyfill';
import 'whatwg-fetch';
import FeedHistory from './FeedHistory';

export default class FeedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: localStorage.getItem('lastUrl') || 'http://waitbutwhy.com/feed',
      isValid: true,
      isLoading: false,
      history: JSON.parse(localStorage.getItem('urlHistory')) || [],
    };
  }

  static propTypes = {
    feedUpdate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.fetchFeed();
  }

  async fetchFeed(url = this.state.url) {
    this.setState({
      url,
      isValid: true,
      isLoading: true,
    });

    try {
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url));
      const content = await response.json();
      this.handleResponse(content);
    } catch (e) {
      console.error(e);
      this.setState({
        isValid: false,
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  handleResponse(data) {
    if (data.status === 'ok') {
      this.props.feedUpdate(data.items);
      this.updateHistory(data.feed);
    } else {
      throw new Error();
    }
  }

  updateHistory(feed) {
    const historyItem = {
      title: feed.title,
      url: feed.url,
    };

    const itemIndex = this.state.history.findIndex(item => {
      return item.title === historyItem.title && item.url === historyItem.url;
    });
    const newHistory = this.state.history;
    if (itemIndex !== -1) {
      newHistory.splice(itemIndex, 1);
    }
    newHistory.unshift(historyItem);

    this.setState({
      history: newHistory,
    });

    localStorage.setItem('urlHistory', JSON.stringify(newHistory));
    localStorage.setItem('lastUrl', feed.url);
  }

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.fetchFeed();
    }
  }

  render() {
    return (
      <div className="feed-input">
        <div className="feed-input__row">
          <div className="feed-input__url">
            <input id="feed-url" type="url" value={this.state.url}
              className={'feed-input__url-input' + (this.state.isValid ? '' : ' invalid')}
              onChange={e => this.setState({url: e.target.value})}
              onKeyUp={e => this.handleKeyUp(e)}/>
            <label htmlFor="feed-url" className="feed-input__url-label">
              Enter URL
            </label>
          </div>
          <button onClick={() => this.fetchFeed()}
            className={'feed-input__button' + (this.state.isLoading ? ' feed-input__button--loading' : '')}>
            {this.state.isLoading ? '\u21BB' : '\u276F'}
          </button>
        </div>
        <FeedHistory history={this.state.history} onItemClick={(url) => this.fetchFeed(url)}/>
      </div>
    );
  }
}
