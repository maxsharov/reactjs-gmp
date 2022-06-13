import React, { FC, useState } from 'react'

import DeleteMovieModal from "./DeleteMovieModal";
import EditMovieModal from "./EditMovieModal";

import styles from './MovieCard.scss'

export interface Movie {
  id?: number
  title?: string
  posterPath?: string
  releaseDate?: string
  year?: string
  rating?: number
  runtime?: number
  overview?: string
  genres?: string[]
  onMovieSelect?: (id: number) => void
}

type MovieCardProps = Movie

const MovieCard: FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
  year,
  rating,
  runtime,
  overview,
  genres,
  onMovieSelect,
}) => {
  const [isMenuOpened, handleMenuVisibility] = useState<boolean>(false)
  const [isDeleteMovieOpened, handleDeleteMovieVisibility] = useState<boolean>(false)
  const [isEditMovieOpened, handleEditMovieVisibility] = useState<boolean>(false)

  const showMenu = () => handleMenuVisibility(true)
  const hideMenu = () => handleMenuVisibility(false)

  const showDeleteMovieModal = () => {
    handleMenuVisibility(false)
    handleDeleteMovieVisibility(true)
  }
  const hideDeleteMovieModal = () => handleDeleteMovieVisibility(false)

  const showEditMovieModal = () => {
    handleMenuVisibility(false)
    handleEditMovieVisibility(true)
  }
  const hideEditMovieModal = () => handleEditMovieVisibility(false)

  return (
    <div className={styles['movieCard']}>
      {isDeleteMovieOpened && <DeleteMovieModal onClose={hideDeleteMovieModal} />}
      {isEditMovieOpened &&
        <EditMovieModal
          title={title}
          rating={rating}
          overview={overview}
          releaseDate={releaseDate}
          runtime={runtime}
          genres={genres}
          onClose={hideEditMovieModal}
        />
      }
      <div className={styles['movieCard--content']}>
        <div
          className={styles['menu-link']}
          onClick={showMenu}
        ></div>
        {isMenuOpened && <div
          className={styles['movieCardMenu']}
        >
          <div
            className={styles['movieCardMenu--close']}
            onClick={hideMenu}
          >
            X
          </div>
          <ul>
            <li onClick={showEditMovieModal}>Edit</li>
            <li onClick={showDeleteMovieModal}>Delete</li>
          </ul>
        </div>}
        <div className={styles['movieCard--img']}>
          <img
            src={posterPath}
            onClick={() => onMovieSelect(id)}
          />
        </div>

        <div className={styles['movieCard--titleYear']}>
          <div className={styles['movieCard--title']}>{title}</div>
          <div className={styles['movieCard--year']}>{year}</div>
        </div>
        {genres.length > 0 &&
          <div className={styles['movieCard--tagline']}>{genres.join(', ')}</div>
        }
      </div>
    </div>
  )
}

export default MovieCard