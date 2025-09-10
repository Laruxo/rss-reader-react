import { useMemo, type KeyboardEvent } from 'react'

interface ListItemProps {
  item: FeedItem
  onItemClick: () => void
}

function ListItem({ item, onItemClick }: ListItemProps) {
  const { title, pubDate, description } = item

  const firstParagraph = useMemo(() => {
    const div = document.createElement('div')
    div.innerHTML = description
    if (!div.firstElementChild) {
      return description
    }
    return div.innerText.substring(0, 120)
  }, [description])

  function onKeyPress(e: KeyboardEvent) {
    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onItemClick()
    }
  }

  return (
    <li className="border-t border-gray-200">
      <button
        className="w-full text-left p-4 outline-none hover:bg-gray-200 focus-visible:bg-gray-200"
        onClick={onItemClick}
        onKeyPress={onKeyPress}
      >
        <p className="font-semibold">{title}</p>
        <p className="text-xs">{pubDate}</p>
        <p className="mt-2">{firstParagraph}</p>
      </button>
    </li>
  )
}

export default ListItem
