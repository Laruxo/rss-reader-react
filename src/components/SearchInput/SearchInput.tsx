import React, { useState, useEffect, useRef } from "react";
import { getHistory } from "../../utils/feedHistory";
import "./SearchInput.scss";

interface SearchInputProps {
  onSubmit: (value: string) => void;
}

function SearchInput({ onSubmit }: SearchInputProps) {
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(() => getHistory());
  useEffect(() => {
    setSuggestions(() => {
      const history = getHistory();
      if (value) {
        const regex = new RegExp(`(^|\\s)${value}`, "i");
        return history.filter(({ title, url }) => regex.test(title) || url.includes(value));
      }
      return history;
    });
    setActiveSuggestion(0);
  }, [value]);

  const [activeSuggestion, setActiveSuggestion] = useState(0);
  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((curr) => Math.min(suggestions.length - 1, curr + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((curr) => Math.max(0, curr - 1));
        break;
      case "Enter":
        if (suggestions.length) {
          e.preventDefault();
          onSubmit(suggestions[activeSuggestion].url);
          setValue("");
          input.current?.blur();
        }
        break;
      default:
    }
  }

  return (
    <div className="search-input-container">
      <input
        type="url"
        title="RSS URL"
        placeholder="Enter RSS URL"
        className="search-input"
        autoComplete="off"
        ref={input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        onKeyDown={onKeyDown}
      />
      {showSuggestions && (
        <ul className="search-input__suggestions">
          {suggestions.map((item, ind) => (
            <li
              key={item.url}
              className={`search-input__suggestion${
                activeSuggestion === ind ? " search-input__suggestion--active" : ""
              }`}
              onMouseEnter={() => setActiveSuggestion(ind)}
              onMouseDown={() => onSubmit(item.url)}
            >
              <div className="search-input__suggestion-title">{item.title}</div>
              <div>{item.url}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
