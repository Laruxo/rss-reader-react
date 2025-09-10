import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { getHistory } from '../utils/feedHistory'

interface SearchInputProps {
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
    <>
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
                <p className="truncate">{item.title}</p>
                <p className="truncate text-xs">{item.url}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
      {loading ? (
        <span
          className="inline-block size-6"
          role="progressbar"
          aria-valuetext="loading"
          aria-busy="true"
          aria-live="assertive"
        >
          <svg
            className="animate-spin fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
          </svg>
        </span>
      ) : (
        <button
          type="submit"
          className="w-6 h-full text-white text-xl hover:opacity-80"
        >
          {'\u276F'}
        </button>
      )}
    </>
  )
}

export default SearchInput
