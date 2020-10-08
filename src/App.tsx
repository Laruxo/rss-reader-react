import React, { useState } from "react";
import FeedSearch from "./components/FeedSearch/FeedSearch";
import SortableList from "./components/SortableList/SortableList";

function App() {
  const [response, setResponse] = useState<ResponseState>(null);

  return (
    <>
      <header>
        <h1>RSS Reader</h1>
        <FeedSearch setResponse={setResponse} />
      </header>
      <main>
        {response && "error" in response && <h3 className="error">{response.error}</h3>}
        {response && "feed" in response && (
          <SortableList title={response.feed.title} feed={response.items} />
        )}
      </main>
    </>
  );
}

export default App;
