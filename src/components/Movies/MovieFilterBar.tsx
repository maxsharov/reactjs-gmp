import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSortOrder, setGenre, setSortBy } from '../../features/movies/moviesSlice'
import { RootState } from '../../app/store'
import classNames from 'classnames'

import styles from './MovieFilterBar.scss'
import useToggle from '../../utils/useToggle'

export interface GenreType {
  id: string
  title: string
}

export interface SortType {
  id: string
  title: string
}

const sortTypes: SortType[] = [
  {
    id: 'release_date',
    title: 'Release Date'
  },
  {
    id: 'genre',
    title: 'Genre'
  },
  {
    id: 'rating',
    title: 'Rating'
  },
]

const genres: GenreType[] = [
  {
    id: 'all',
    title: 'All'
  },
  {
    id: 'documentary',
    title: 'Documentary'
  },
  {
    id: 'comedy',
    title: 'Comedy'
  },
  {
    id: 'drama',
    title: 'Drama'
  },
  {
    id: 'romance',
    title: 'Romance'
  },
]

const MovieFilterBar: FC = () => {
  const dispatch = useDispatch()
  const [areSortOrdersVisible, toggleSortOrderVisibility] = useToggle(false)
  const sortOrder = useSelector((state: RootState) => state.movies.sortOrder)
  const sortByTitle = useSelector((state: RootState) => state.movies.sortByTitle)
  const genreSelected = useSelector((state: RootState) => state.movies.genreSelected)

  const invertSortOrder = () => {
    dispatch(changeSortOrder())
  }

  const changeGenreType = (genre: GenreType) => {
    dispatch(setGenre(genre))
  }

  const changeSortType = (sortType: SortType) => {
    dispatch(setSortBy(sortType))
    toggleSortOrderVisibility()
  }

  return (
    <div className={styles['movieFilterBar']}>
      <ul className={styles['movieFilterBar--genres']}>
        {genres.map(genre => {
          return (<li
            onClick={() => changeGenreType(genre)}
            className={classNames(
              styles['movieFilterBar--genre'],
              {
                [styles['movieFilterBar--genre-active']]: genreSelected === genre.id
              }
            )}
            key={genre.id}
          >
            {genre.title}
          </li>)
        })}
      </ul>
      <div className={styles['movieFilterBar--sort']}>
        <div className={styles['movieFilterBar--sort-title']}>Sort by</div>
        <div
          onClick={toggleSortOrderVisibility}
          className={styles['movieFilterBar--sort-val']}
        >
          {sortByTitle}
        </div>
        {areSortOrdersVisible && <ul className={styles['movieFilterBar--sort-types']}>
          {sortTypes.map(sortType => {
            return (
              <li
                key={sortType.id}
                onClick={() => changeSortType(sortType)}
              >
                {sortType.title}
              </li>
            )
          })}
        </ul>}
        <div
          onClick={invertSortOrder}
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