import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

async function doFetch(url, options) {
  const result = await fetch(url, options);
  const json = await result.json();

  if (json.status === 'ok') {
    return json;
  } else {
    throw new Error(json.message);
  }
}

function Fetcher({ url, children }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let didCancel = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await doFetch(url, { signal: controller.signal });
        if (didCancel) return;
        setResponse(result);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    })();

    return () => {
      controller.abort();
      didCancel = true;
    };
  }, [url]);

  return children({ isLoading, error, response });
}

Fetcher.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Fetcher;
