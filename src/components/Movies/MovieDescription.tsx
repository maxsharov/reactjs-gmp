import React, { FC } from 'react'
import { useSearchParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useGetMovieQuery } from '../../app/moviesApi'
import { removeSelectedMovie } from '../../features/movies/moviesSlice'

import styles from './MovieDescription.scss'

type MovieDescriptionType = {
  movieId: number
}

const MovieDescription: FC<MovieDescriptionType> = ({
  movieId
}) => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: movie } = useGetMovieQuery(movieId)

  if (!movie) return null

  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    overview,
    runtime,
    genres,
  } = movie

  const year = release_date.substring(0, 4)
  const movieTimeHours = Math.floor(runtime / 60)
  const movieTimeMinutes = runtime % 60
  const movieTime = `${movieTimeHours}h ${movieTimeMinutes}min`
  const genre = genres.join(', ')

  const hideMovieDescription = () => {
    searchParams.delete('movie')
    setSearchParams(searchParams)
    dispatch(removeSelectedMovie())
  }

  return (
    <>
      <div className={styles['heading-nav']}>
        <div className={styles['heading-nav--mini-logo']}>
          netflixroulette
        </div>
        <div
          className={styles['heading-nav--search-link']}
          onClick={hideMovieDescription}
        >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <div className={styles['movie-description']}>
        <div className={styles['movie-description--image']}>
          <img src={poster_path} />
        </div>
        <div className={styles['movie-description--details']}>
          <div className={styles['details--heading-rating']}>
            <h2 className={styles['details--heading']}>{title}</h2>
            <div className={styles['details--rating']}>{vote_average}</div>
          </div>
          <div className={styles['details--genre']}>
            {genre}
          </div>
          <div className={styles['details--year-time']}>
            <div className={styles['details--year']}>{year}</div>
            <div>{movieTime}</div>
          </div>
          <div className={styles['details--overview']}>
            {overview}
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDescription