import React from 'react';
import PropTypes from 'prop-types';
import './FeedInput.scss';

function FeedInput({ url, setUrl, isValid, isLoading }) {
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      setUrl(e.target.value);
    }
  }

  return (
    <div className="feed-input">
      <div className="feed-input__row">
        <div className="feed-input__url">
          <input
            id="feed-url"
            type="url"
            value={url}
            className={'feed-input__url-input' + (isValid ? '' : ' invalid')}
            onChange={e => setUrl(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <label htmlFor="feed-url" className="feed-input__url-label">
            Enter URL
          </label>
        </div>
        <button
          onClick={() => setUrl(url)}
          className={
            'button feed-input__button' + (isLoading ? ' feed-input__button--loading' : '')
          }
        >
          {isLoading ? '\u21BB' : '\u276F'}
        </button>
      </div>
    </div>
  );
}

FeedInput.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default FeedInput;
