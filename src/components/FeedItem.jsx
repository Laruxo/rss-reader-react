import React from 'react';
import PropTypes from 'prop-types';

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    item: PropTypes.shape({
      guid: PropTypes.string,
      title: PropTypes.string,
      pubDate: PropTypes.string,
      link: PropTypes.string,
      content: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  };

  static firstParagraph(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    let content = div.firstElementChild.innerHTML.substr(0, 120);
    if (content.length) {
      content += '...';
    }
    return content;
  }

  openModal() {
    this.props.onItemClick(this.props.item);
  }

  render() {
    return (
      <li className="feed__item" onClick={() => this.openModal()}>
        <div className="feed__item-title">{this.props.item.title}</div>
        <span className="feed__item-date">{this.props.item.pubDate}</span>
        <p className="feed__item-description">{FeedItem.firstParagraph(this.props.item.description)}</p>
      </li>
    );
  }
}
