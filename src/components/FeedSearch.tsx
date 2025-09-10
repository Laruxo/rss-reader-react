import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { useFetch } from '../hooks/useFetch'
import { getHistory, addHistoryItem } from '../utils/feedHistory'
import SearchInput from './SearchInput'

interface FeedSearchProps {
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

  return (
    <form
      name="feed search form"
      className="flex items-center relative border-b border-white"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form[0] as HTMLInputElement
        setUrl(input.value)
      }}
    >
      <SearchInput loading={response === null} onSubmit={setUrl} />
    </form>
  )
}

export default FeedSearch
