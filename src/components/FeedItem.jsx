import React from 'react';
import PropTypes from 'prop-types';

export default function FeedItem(props) {
  const {title, pubDate, description} = props.item;

  return (
    <li className="feed__item" onClick={() => props.onItemClick()}>
      <div className="feed__item-title">{title}</div>
      <span className="feed__item-date">{pubDate}</span>
      <p className="feed__item-description">{FeedItem.firstParagraph(description)}</p>
    </li>
  );
}

FeedItem.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string,
    pubDate: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

FeedItem.firstParagraph = function(text) {
  const div = document.createElement('div');
  div.innerHTML = text;
  let content = div.firstElementChild.innerHTML.substr(0, 120);
  if (content.length) {
    content += '...';
  }
  return content;
};
