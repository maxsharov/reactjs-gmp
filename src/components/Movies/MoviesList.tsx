import React, { FC } from 'react'
import MovieCard from "./MovieCard"

import { MovieResponse } from "../../interfaces"

import styles from './MoviesList.scss'

interface MoviesListProps {
  movies: MovieResponse[]
  moviesTotal: number
  onMovieSelect: (id: number) => void
}

const MoviesList: FC<MoviesListProps> = ({
  movies,
  moviesTotal,
  onMovieSelect,
}) => {
  return (
    <div>
      <div className={styles['movies--total']}>
        <span className={styles['movies--total-value']}>{moviesTotal}</span> movies found
      </div>
      <div className={styles['movies--list']}>
        {movies.length > 0 &&
          movies.map(item => {
            const {
              id,
              title,
              genres,
              poster_path: posterPath,
              release_date: releaseDate,
              vote_average: rating,
              runtime,
              overview,
            } = item

            const year = releaseDate.substring(0, 4)

            const movieCardProps = {
              id,
              title,
              genres,
              posterPath,
              releaseDate,
              year,
              rating,
              runtime,
              overview,
            }

            return <MovieCard key={id} onMovieSelect={onMovieSelect} {...movieCardProps} />
          })}
      </div>
    </div>
  )
}

export default MoviesList