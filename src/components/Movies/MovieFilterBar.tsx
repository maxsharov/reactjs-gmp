import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom";
import classNames from 'classnames'

import { changeSortOrder, setGenre, setSortBy } from '../../features/movies/moviesSlice'
import { RootState } from '../../app/store'
import useToggle from '../../utils/useToggle'

import styles from './MovieFilterBar.scss'

export interface GenreType {
  id: string
  title: string
}

export interface SortType {
  id: string
  title: string
}

export const sortTypes: SortType[] = [
  {
    id: 'release_date',
    title: 'Release Date'
  },
  {
    id: 'revenue',
    title: 'Revenue'
  },
  {
    id: 'budget',
    title: 'Budget'
  },
  {
    id: 'vote_average',
    title: 'Rating'
  },
  {
    id: 'title',
    title: 'Title'
  },
]

export const genresList: GenreType[] = [
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
  {
    id: 'thriller',
    title: 'Thriller'
  },
]

const MovieFilterBar: FC = () => {
  const dispatch = useDispatch()
  const [areSortOrdersVisible, toggleSortOrderVisibility] = useToggle(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const { sortOrder, sortByTitle, genreSelected } = useSelector((state: RootState) => state.movies)

  const invertSortOrder = () => {
    dispatch(changeSortOrder())
  }

  const changeGenreType = (genre: GenreType) => {
    searchParams.set('genre', genre.id)
    setSearchParams(searchParams)
    dispatch(setGenre(genre))
  }

  const changeSortType = (sortType: SortType) => {
    searchParams.set('sortBy', sortType.id)
    setSearchParams(searchParams)
    dispatch(setSortBy(sortType))
    toggleSortOrderVisibility()
  }

  return (
    <div className={styles['movieFilterBar']}>
      <ul className={styles['movieFilterBar--genres']}>
        {genresList.map(genre => {
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