import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { getHistory } from '../utils/feedHistory'
import Spinner from './Spinner.tsx'

type SearchInputProps = {
  loading: boolean
  onSubmit: (value: string) => void
}

function SearchInput({ loading, onSubmit }: SearchInputProps) {
  const input = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState(() => getHistory())
  useEffect(() => {
    setSuggestions(() => {
      const history = getHistory()
      if (value) {
        // Match only the beginnings of the words
        const regex = new RegExp(`(^|\\s)${value}`, 'i')
        return history.filter(
          ({ title, url }) => regex.test(title) || url.includes(value),
        )
      }
      return history
    })
    setActiveSuggestion(0)
  }, [value])

  const [activeSuggestion, setActiveSuggestion] = useState(0)
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveSuggestion((curr) =>
          Math.min(suggestions.length - 1, curr + 1),
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveSuggestion((curr) => Math.max(0, curr - 1))
        break
      case 'Enter':
        if (suggestions.length) {
          e.preventDefault()
          onSubmit(suggestions[activeSuggestion].url)
          setValue('')
          input.current?.blur()
        }
        break
      default:
    }
  }

  return (
    <form
      name="feed search form"
      className="flex items-center relative border-b border-white"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
      }}
    >
      <input
        type="url"
        name="url"
        title="RSS URL"
        aria-label="RSS URL"
        placeholder="Enter RSS URL"
        className="min-w-2xs w-full text-white py-2 pr-2 outline-none"
        autoComplete="off"
        ref={input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-controls="search-suggestions"
        aria-expanded={showSuggestions ? 'true' : 'false'}
      />
      {showSuggestions && (
        <ul
          id="search-suggestions"
          className="absolute top-full w-full shadow-lg bg-white"
          role="listbox"
        >
          {suggestions.map((item, ind) => (
            <li key={item.url} role="option">
              <button
                className={`text-left w-full p-2 hover:bg-gray-200${
                  activeSuggestion === ind ? ' bg-gray-200' : ''
                }`}
                onMouseEnter={() => setActiveSuggestion(ind)}
                onMouseDown={() => onSubmit(item.url)}
              >
                <span className="block truncate">{item.title}</span>
                <span className="block truncate text-xs">{item.url}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <button
          type="submit"
          className="w-6 h-full text-white text-xl hover:opacity-80"
        >
          {'\u276F'}
        </button>
      )}
    </form>
  )
}

export default SearchInput
