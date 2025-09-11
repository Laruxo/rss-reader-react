import { useMemo, type KeyboardEvent } from 'react'

type ListItemProps = {
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

  function onKeyDown(e: KeyboardEvent) {
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
        onKeyDown={onKeyDown}
      >
        <strong className="block">{title}</strong>
        <span className="block text-xs">{pubDate}</span>
        <span className="block mt-2">{firstParagraph}</span>
      </button>
    </li>
  )
}

export default ListItem
