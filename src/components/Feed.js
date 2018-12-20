import React from 'react';
import '../styles/Feed.scss';
import FeedInput from './FeedInput';
import SortableFeed from './SortableFeed';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
    };
  }

  updateFeed(feed) {
    this.setState({feed: feed});
  }

  render() {
    return (
      <div className="feed">
        <FeedInput feedUpdate={data => this.updateFeed(data)}/>
        {this.state.feed && <SortableFeed feed={this.state.feed}/>}
      </div>
    );
  }
}
