import React, { FC, MouseEventHandler } from 'react'
import classNames from "classnames"

import styles from './MovieFilterBar.scss'

import {SortOrderType} from "../../App";

const genres = ['All','Documentary','Comedy','Horror','Crime']

interface MovieFilterBarProps {
  sortOrder: SortOrderType
  onSortOrderChange: (k: SortOrderType) => void
}

const MovieFilterBar: FC<MovieFilterBarProps> = ({
  sortOrder,
  onSortOrderChange
}) => {
  const activeGenre = 'All'
  const activeSort = 'Release Date'

  const invertSortOrder = () => {
    if (sortOrder === 'asc') {
      onSortOrderChange('desc')
    } else {
      onSortOrderChange('asc')
    }
  }

  return (
    <div className={styles['movieFilterBar']}>
      <ul className={styles['movieFilterBar--genres']}>
        {genres.map(genre => {
          return (<li
            className={classNames(
              styles['movieFilterBar--genre'],
              {
                [styles['movieFilterBar--genre-active']]: activeGenre === genre
              }
            )}
            key={genre}
          >
            {genre}
          </li>)
        })}
      </ul>
      <div className={styles['movieFilterBar--sort']}>
        <div className={styles['movieFilterBar--sort-title']}>Sort by</div>
        <div
          onClick={invertSortOrder}
          className={styles['movieFilterBar--sort-val']}
        >Release Date</div>
        <div
          className={classNames(
            styles['movieFilterBar--arrow'],
            {
              [styles['movieFilterBar--arrow-down']]: sortOrder === 'desc'
            }
          )}
        >&#9650;</div>
      </div>
    </div>
  )
}

export default MovieFilterBar