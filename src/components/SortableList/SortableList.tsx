import React, { useState, useMemo } from "react";
import ListItem from "../ListItem/ListItem";
import Modal from "../Modal/Modal";
import "./SortableList.scss";

interface SortableListProps {
  title: string;
  feed: FeedItem[];
}

type SortField = "title" | "pubDate";
type SortDir = "asc" | "desc";

interface SortingState {
  field: SortField;
  dir: SortDir;
}

function SortableList({ title, feed }: SortableListProps) {
  const [activeItem, setActiveItem] = useState<FeedItem | null>(null);

  const [sorting, setSorting] = useState<SortingState>({ field: "pubDate", dir: "asc" });
  const sortedFeed = useMemo(() => {
    const _feed = feed.slice(0);
    const multiplier = sorting.dir === "asc" ? 1 : -1;
    if (sorting.field === "title") {
      _feed.sort((a, b) => (a.title || "").localeCompare(b.title || "") * multiplier);
    } else if (sorting.field === "pubDate") {
      _feed.sort(
        (a, b) => (new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()) * multiplier
      );
    }
    return _feed;
  }, [feed, sorting]);

  function sortBy(field: SortField) {
    setSorting((prev) => ({ field, dir: prev.dir === "asc" ? "desc" : "asc" }));
  }

  const direction = sorting.dir === "asc" ? "\u2193" : "\u2191";

  return (
    <>
      <div className="feed__header">
        <h3>{title}</h3>
        <button className="feed__header-button" onClick={() => sortBy("title")}>
          Title {sorting.field === "title" && direction}
        </button>
        <button className="feed__header-button" onClick={() => sortBy("pubDate")}>
          Date {sorting.field === "pubDate" && direction}
        </button>
      </div>
      <ol className="feed__list">
        {sortedFeed.map((item) => (
          <ListItem key={item.guid} item={item} onItemClick={() => setActiveItem(item)} />
        ))}
      </ol>
      {activeItem && <Modal item={activeItem} onClose={() => setActiveItem(null)} />}
    </>
  );
}

export default SortableList;
