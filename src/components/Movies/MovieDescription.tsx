import React, { FC } from 'react'

import styles from './MovieDescription.scss'
import { Movie } from "./MovieCard";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface MovieDescriptionProps extends Movie {
  onClose: () => void
}


const MovieDescription: FC<MovieDescriptionProps> = ({
  id,
  title,
  posterPath,
  rating,
  year,
  overview,
  runtime,
  genres,
  onClose,
}) => {
  console.log('MovieDescription render')

  const movieTimeHours = Math.floor(runtime / 60)
  const movieTimeMinutes = runtime % 60
  const movieTime = `${movieTimeHours}h ${movieTimeMinutes}min`

  const genre = genres.join(', ')

  return (
    <>
      <div className={styles['heading-nav']}>
        <div className={styles['heading-nav--mini-logo']}>
          netflixroulette
        </div>
        <div
          className={styles['heading-nav--search-link']}
          onClick={onClose}
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