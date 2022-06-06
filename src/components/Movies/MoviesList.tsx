import React, { FC } from 'react'
import { Movie } from "../../interfaces"
import MovieCard from "./MovieCard"

import styles from './MoviesList.scss'

interface MoviesListProps {
  movies: Movie[]
  moviesTotal: number
}

/*
*   id: number
  title: string
  tagline: string
  vote_average: number
  vote_count: number
  release_date: string
  poster_path: string
  overview: string
  budget: number
  revenue: number
  genres: string[]
  runtime: number
*
* */

const MoviesList: FC<MoviesListProps> = ({
  movies,
  moviesTotal
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
              release_date: releaseDate
            } = item

            const movieCardProps = {
              id,
              title,
              genres,
              posterPath,
              releaseDate
            }

            return <MovieCard key={id} {...movieCardProps} />
          })}
      </div>
    </div>
  )
}

export default MoviesList