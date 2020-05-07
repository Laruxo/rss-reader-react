import React from 'react';
import PropTypes from 'prop-types';

function firstParagraph(text) {
  const div = document.createElement('div');
  div.innerHTML = text;
  let content = div.firstElementChild.innerHTML.substr(0, 120);
  if (content.length) {
    content += '...';
  }
  return content;
}

function ListItem({ item, onItemClick }) {
  const { title, pubDate, description } = item;

  return (
    <li className="feed__item" onClick={onItemClick}>
      <div className="feed__item-title">{title}</div>
      <span className="feed__item-date">{pubDate}</span>
      <p className="feed__item-description">{firstParagraph(description)}</p>
    </li>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    pubDate: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ListItem;
