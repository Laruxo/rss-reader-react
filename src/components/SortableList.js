import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import Modal from './Modal';

const SORT_FIELD = {
  TITLE: 'title',
  DATE: 'pubDate',
};

const SORT_DIR = {
  ASC: 'asc',
  DESC: 'desc',
};

function SortableList({ feed }) {
  const [activeItem, setActiveItem] = useState(null);
  const [sorting, setSorting] = useState({ field: SORT_FIELD.DATE, dir: SORT_DIR.ASC });
  const sortedFeed = useMemo(() => {
    const _feed = feed.slice(0);
    if (sorting.field === SORT_FIELD.TITLE) {
      if (sorting.dir === SORT_DIR.ASC) {
        _feed.sort(({ title = '' }, b) => title.localeCompare(b.title || ''));
      } else {
        _feed.sort((a, { title = '' }) => title.localeCompare(a.title || ''));
      }
    } else if (sorting.field === SORT_FIELD.DATE) {
      if (sorting.dir === SORT_DIR.ASC) {
        _feed.sort((a, b) => new Date(b[sorting.field]) - new Date(a[sorting.field]));
      } else {
        _feed.sort((a, b) => new Date(a[sorting.field]) - new Date(b[sorting.field]));
      }
    }
    return _feed;
  }, [feed, sorting]);

  function sortBy(field) {
    setSorting(prev => ({ field, dir: prev.dir === SORT_DIR.ASC ? SORT_DIR.DESC : SORT_DIR.ASC }));
  }

  return (
    <>
      <div className="feed__header">
        <button className="button feed__header-button" onClick={() => sortBy(SORT_FIELD.TITLE)}>
          Title&nbsp;
          {sorting.field === SORT_FIELD.TITLE &&
            (sorting.dir === SORT_DIR.ASC ? '\u2193' : '\u2191')}
        </button>
        <button className="button feed__header-button" onClick={() => sortBy(SORT_FIELD.DATE)}>
          Date&nbsp;
          {sorting.field === SORT_FIELD.DATE &&
            (sorting.dir === SORT_DIR.ASC ? '\u2193' : '\u2191')}
        </button>
      </div>
      <ol className="feed__list">
        {sortedFeed.map(({ guid, ...item }) => (
          <ListItem key={guid} item={item} onItemClick={() => setActiveItem(item)} />
        ))}
      </ol>
      {activeItem && <Modal item={activeItem} onClose={() => setActiveItem(null)} />}
    </>
  );
}

SortableList.propTypes = {
  feed: PropTypes.array.isRequired,
};

export default SortableList;
