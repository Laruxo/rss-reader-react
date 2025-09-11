import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { useFetch } from '../hooks/useFetch'
import { getHistory, addHistoryItem } from '../utils/feedHistory'
import SearchInput from './SearchInput'

type FeedSearchProps = {
  setResponse: Dispatch<SetStateAction<ResponseState>>
}

function FeedSearch({ setResponse }: FeedSearchProps) {
  const [url, setUrl] = useState(() => getHistory()[0].url)
  const response = useFetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${url}`,
  )

  useEffect(() => {
    setResponse(response)
    if (response && 'feed' in response) {
      addHistoryItem(response.feed)
    }
  }, [response, setResponse])

  return <SearchInput loading={response === null} onSubmit={setUrl} />
}

export default FeedSearch
