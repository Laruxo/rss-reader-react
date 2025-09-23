import { useState, useEffect } from 'react'
import SearchInput from './components/SearchInput'
import SortableList from './components/SortableList'
import { useFetch } from './hooks/useFetch'
import { getHistory, addHistoryItem } from './utils/feedHistory'
import Spinner from './components/Spinner.tsx'

function App() {
  const [url, setUrl] = useState(() => getHistory()[0].url)
  const response = useFetch<RssApiResponse>(
    `https://api.rss2json.com/v1/api.json?rss_url=${url}`,
  )

  useEffect(() => {
    if (response.type === 'SUCCESS' && response.result.feed) {
      addHistoryItem(response.result.feed)
    }
  }, [response])

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between bg-blue-800 p-4">
        <p className="text-2xl text-white text-center mb-4 md:text-left md:mb-0">
          RSS Reader
        </p>
        <SearchInput loading={response.type === 'LOADING'} onSubmit={setUrl} />
      </header>
      <main className="m-4">
        {response.type === 'ERROR' && (
          <div className="bg-red-200 p-4 text-xl text-red-700">
            {response.error}
          </div>
        )}
        {response.type === 'LOADING' && (
          <Spinner wrapperClass="flex justify-center" svgClass="size-12" />
        )}
        {response.type === 'SUCCESS' && (
          <SortableList
            title={response.result.feed.title}
            feed={response.result.items}
          />
        )}
      </main>
    </>
  )
}

export default App
