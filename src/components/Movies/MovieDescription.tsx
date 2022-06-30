import React, { FC, useMemo } from 'react'

import styles from './MovieDescription.scss'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetMoviesQuery } from '../../app/moviesApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { removeSelectedMovie } from '../../features/movies/moviesSlice'

const MovieDescription: FC = () => {
  const dispatch = useDispatch()
  const sortOrder = useSelector((state: RootState) => state.movies.sortOrder)
  const sortBy = useSelector((state: RootState) => state.movies.sortBy)
  const genreSelected = useSelector((state: RootState) => state.movies.genreSelected)
  const selectedMovie = useSelector((state: RootState) => state.movies.selectedMovie)

  const {
    movie
  } = useGetMoviesQuery({
    sortOrder,
    sortBy,
    genreSelected: genreSelected !== 'all' ? genreSelected : null
  }, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data }) => ({
      movie: data?.find((movie) => movie.id === selectedMovie)
    }),
  })

  const {
    id,
    title,
    poster_path: posterPath,
    vote_average: rating,
    release_date,
    overview,
    runtime,
    genres,
  } = movie

  const year = useMemo(
    () => release_date.substring(0, 4),
    [release_date]
  )
  const movieTimeHours = useMemo(
    () => Math.floor(runtime / 60),
    [runtime]
  )
  const movieTimeMinutes = useMemo(
    () => runtime % 60,
    [runtime]
  )
  const movieTime = useMemo(
    () => `${movieTimeHours}h ${movieTimeMinutes}min`,
    [movieTimeHours, movieTimeMinutes]
  )
  const genre = useMemo(
    () => genres.join(', '),
    [genres]
  )

  const hideMovieDescription = useCallback(
    () => {
      dispatch(removeSelectedMovie())
    },
    []
  )

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
          <img src={posterPath} />
        </div>
        <div className={styles['movie-description--details']}>
          <div className={styles['details--heading-rating']}>
            <h2 className={styles['details--heading']}>{title}</h2>
            <div className={styles['details--rating']}>{rating}</div>
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