import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieCard from './MovieCard'
import { useGetMoviesQuery } from '../../app/moviesApi'
import { RootState } from '../../app/store'
import { setSelectedMovie } from '../../features/movies/moviesSlice'

import styles from './MoviesList.scss'

const MoviesList: FC = () => {
  const dispatch = useDispatch()

  const { sortOrder, sortBy, genreSelected } = useSelector((state: RootState) => state.movies)

  const {
    data: movies = [],
    isFetching,
    isLoading,
  } = useGetMoviesQuery({
    sortOrder,
    sortBy,
    genreSelected: genreSelected !== 'all' ? genreSelected : null
  }, {
    refetchOnMountOrArgChange: true
  })

  const moviesTotal = movies.length || 0

  const onMovieSelect = (movieId: number) => {
    dispatch(setSelectedMovie(movieId))
  }

  if (isLoading) return <div>is loading</div>
  if (isFetching) return <div>is fetching</div>

  return (
    <div>
      <div className={styles['movies--total']}>
        <span className={styles['movies--total-value']}>{moviesTotal}</span> movies found
      </div>
      <div className={styles['movies--list']}>
        {movies.map(item => {
            const {
              id,
              title,
              genres,
              poster_path,
              release_date,
              vote_average,
              runtime,
              overview,
            } = item

            const year = release_date.substring(0, 4)

            const movieCardProps = {
              id,
              title,
              genres,
              poster_path,
              release_date,
              year,
              vote_average,
              runtime,
              overview,
            }

            return (
              <MovieCard
                key={id}
                onMovieSelect={() => onMovieSelect(id)}
                {...movieCardProps}
              />
            )
          })}
      </div>
    </div>
  )
}

export default MoviesList