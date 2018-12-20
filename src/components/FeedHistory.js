import React from 'react';
import PropTypes from 'prop-types';

export default function FeedHistory(props) {
  return (
    <ul className="feed-input__history">
      {props.history.map(item =>
        <li key={item.url} className="feed-input__history-item" onClick={() => props.onItemClick(item.url)}>
          {item.title}
        </li>,
      )}
    </ul>
  );
}

FeedHistory.propTypes = {
  history: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
