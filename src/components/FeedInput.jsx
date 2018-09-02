import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FeedInput.scss';
import 'promise-polyfill';
import 'whatwg-fetch';

export default class FeedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedUrl: localStorage.getItem('lastUrl') || 'http://waitbutwhy.com/feed',
      isValid: true,
      isLoading: false,
      history: JSON.parse(localStorage.getItem('urlHistory')) || [],
    };
  }

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.fetchFeed();
    }
  }

  handleHistoryItemClick(item) {
    this.setState({
      feedUrl: item.url,
    });
    this.fetchFeed();
  }

  fetchFeed() {
    this.setState({
      isValid: true,
      isLoading: true,
    });

    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(this.state.feedUrl))
      .then(response => response.json())
      .then(this.handleResponse.bind(this))
      .catch(e => {
        console.error(e);
        this.setState({
          isValid: false,
        });
      });
  }

  handleResponse(data) {
    this.setState({
      isLoading: false,
    });

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

  componentDidMount() {
    this.fetchFeed();
  }

  render() {
    return (
      <div className="feed-input">
        <div className="feed-input__row">
          <div className="feed-input__url">
            <input id="feed-url" type="url" value={this.state.feedUrl}
              className={'feed-input__url-input' + (this.state.isValid ? '' : ' invalid')}
              onChange={e => this.setState({feedUrl: e.target.value})}
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
        <ul className="feed-input__history">
          {this.state.history.map(item =>
            <li key={item.url} className="feed-input__history-item"
              onClick={() => this.handleHistoryItemClick(item)}>
              {item.title}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

FeedInput.propTypes = {
  feedUpdate: PropTypes.func.isRequired,
};
