import { useState } from 'react'
import FeedSearch from './components/FeedSearch'
import SortableList from './components/SortableList'

function App() {
  const [response, setResponse] = useState<ResponseState>(null)

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between bg-blue-800 p-4">
        <p className="text-2xl text-white text-center mb-4 md:text-left md:mb-0">
          RSS Reader
        </p>
        <FeedSearch setResponse={setResponse} />
      </header>
      <main className="m-4">
        {response && 'error' in response && (
          <div className="bg-red-200 p-4 text-xl text-red-700">
            {response.error}
          </div>
        )}
        {response && 'feed' in response && (
          <SortableList title={response.feed.title} feed={response.items} />
        )}
      </main>
    </>
  )
}

export default App
