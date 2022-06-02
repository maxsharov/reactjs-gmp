import React, { FC } from 'react'
import { Movie } from "../../interfaces"
import MovieCard from "./MovieCard"

import styles from './MoviesList.scss'

interface MoviesListProps {
  movies: Movie[]
  moviesTotal: number
}

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
        {movies.length > 0 && movies.map(item =>
          <MovieCard key={item.id} {...item} />
        )}
      </div>
    </div>
  )
}

export default MoviesList