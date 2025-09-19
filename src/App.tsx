import { useState, useEffect } from 'react'
import SearchInput from './components/SearchInput'
import SortableList from './components/SortableList'
import { useFetch } from './hooks/useFetch'
import { getHistory, addHistoryItem } from './utils/feedHistory'
import Spinner from './components/Spinner.tsx'

function App() {
  const [url, setUrl] = useState(() => getHistory()[0].url)
  const { response, isLoading, error } = useFetch<RssApiResponse>(
    `https://api.rss2json.com/v1/api.json?rss_url=${url}`,
  )

  useEffect(() => {
    if (response?.feed) {
      addHistoryItem(response.feed)
    }
  }, [response?.feed])

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between bg-blue-800 p-4">
        <p className="text-2xl text-white text-center mb-4 md:text-left md:mb-0">
          RSS Reader
        </p>
        <SearchInput loading={isLoading} onSubmit={setUrl} />
      </header>
      <main className="m-4">
        {error && (
          <div className="bg-red-200 p-4 text-xl text-red-700">{error}</div>
        )}
        {isLoading && (
          <Spinner wrapperClass="flex justify-center" svgClass="size-12" />
        )}
        {response && (
          <SortableList title={response.feed.title} feed={response.items} />
        )}
      </main>
    </>
  )
}

export default App
