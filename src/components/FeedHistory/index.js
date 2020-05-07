import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FeedHistory.scss';

function FeedHistory({ feed, onItemClick }) {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('urlHistory')) || []);

  useEffect(() => {
    localStorage.setItem('lastUrl', feed.url);

    setHistory(prev => {
      const newHistory = JSON.parse(JSON.stringify(prev));
      const itemIndex = newHistory.findIndex(
        item => item.title === feed.title && item.url === feed.url
      );
      if (itemIndex !== -1) {
        newHistory.splice(itemIndex, 1);
      }
      newHistory.unshift({ title: feed.title, url: feed.url });

      localStorage.setItem('urlHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, [feed]);

  return (
    <ul className="feed-history">
      {history.map(item => (
        <li key={item.url} className="feed-history__item" onClick={() => onItemClick(item.url)}>
          {item.title}
        </li>
      ))}
    </ul>
  );
}

FeedHistory.propTypes = {
  feed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default FeedHistory;
