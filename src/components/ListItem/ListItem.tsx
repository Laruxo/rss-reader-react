import React, { useMemo } from "react";
import "./ListItem.scss";

interface ListItemProps {
  item: FeedItem;
  onItemClick: () => void;
}

function ListItem({ item, onItemClick }: ListItemProps) {
  const { title, pubDate, description } = item;

  const firstParagraph = useMemo(() => {
    const div = document.createElement("div");
    div.innerHTML = description;
    if (!div.firstElementChild) {
      return description;
    }
    return div.innerText.substring(0, 120);
  }, [description]);

  function onKeyPress(e: React.KeyboardEvent) {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onItemClick();
    }
  }

  return (
    <li
      className="feed__item"
      tabIndex={0}
      role="button"
      onClick={onItemClick}
      onKeyPress={onKeyPress}
    >
      <div className="feed__item-title">{title}</div>
      <span className="feed__item-date">{pubDate}</span>
      <p className="feed__item-description">{firstParagraph}</p>
    </li>
  );
}

export default ListItem;
