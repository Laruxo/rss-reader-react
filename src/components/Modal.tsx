import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  item: FeedItem
  onClose: () => void
}

function Modal({ item, onClose }: ModalProps) {
  const { title, link, description, content } = item
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButton.current?.focus()
  }, [])

  return createPortal(
    <div className="fixed inset-0 flex content-center items-center md:p-16">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <dialog
        className="relative size-full overflow-y-auto mx-auto max-w-7xl"
        aria-label={title}
        role="alertdialog"
        aria-modal="true"
        open
        onKeyUp={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            onClose()
          }
        }}
      >
        <div className="sticky top-0 bg-white flex py-6 px-4">
          <h2 className="flex-1 mb-4 mr-6">{title}</h2>
          <button
            type="button"
            className="size-6 text-3xl leading-0 hover:opacity-80"
            onClick={onClose}
            ref={closeButton}
          >
            &times;
          </button>
        </div>
        <div
          className="content px-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <a
          className="button m-4"
          target="_blank"
          rel="noopener noreferrer"
          href={link}
        >
          Read the Full Story
        </a>
        {description !== content && (
          <div
            className="content mx-4 pt-4 pb-6 border-t"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </dialog>
    </div>,
    document.body,
  )
}

export default Modal
