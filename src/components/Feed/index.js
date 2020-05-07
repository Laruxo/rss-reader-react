import React, { useState } from 'react';
import Fetcher from '../Fetcher';
import FeedInput from '../FeedInput';
import FeedHistory from '../FeedHistory';
import SortableFeed from '../SortableList';
import './Feed.scss';

const DEFAULT_URL = 'http://waitbutwhy.com/feed';

function Feed() {
  const [url, setUrl] = useState(localStorage.getItem('lastUrl') || DEFAULT_URL);

  return (
    <div className="feed">
      <Fetcher url={'https://api.rss2json.com/v1/api.json?rss_url=' + url}>
        {({ response, error, isLoading }) => (
          <>
            <FeedInput url={url} setUrl={setUrl} isLoading={isLoading} isValid={error === null} />
            {error && <h3>{error}</h3>}
            {!isLoading && response && response.feed && (
              <FeedHistory feed={response.feed} onItemClick={setUrl} />
            )}
            {!isLoading && response && response.items && <SortableFeed feed={response.items} />}
          </>
        )}
      </Fetcher>
    </div>
  );
}

export default Feed;
