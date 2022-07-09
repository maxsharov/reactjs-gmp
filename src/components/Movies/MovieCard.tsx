import React, { FC, useCallback, useState } from 'react'

import DeleteMovieModal from './DeleteMovieModal'
import EditMovieModal from './EditMovieModal'

import styles from './MovieCard.scss'
import useToggle from '../../utils/useToggle'

export interface Movie {
  id?: number
  title?: string
  posterPath?: string
  poster_path?: string
  release_date?: string
  year?: string
  vote_average?: number
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
  poster_path,
  release_date,
  year,
  vote_average,
  runtime,
  overview,
  genres,
  onMovieSelect,
}) => {
  const [isMenuVisible, handleMenuVisibility] = useToggle(false)
  const [isDeleteMovieOpened, handleDeleteMovieVisibility] = useState<boolean>(false)
  const [isEditMovieOpened, handleEditMovieVisibility] = useState<boolean>(false)

  const showDeleteMovieModal = useCallback(
    () => {
      handleMenuVisibility()
      handleDeleteMovieVisibility(true)
    },
    []
  )
  const hideDeleteMovieModal = () => handleDeleteMovieVisibility(false)

  const showEditMovieModal = () => {
    handleMenuVisibility()
    handleEditMovieVisibility(true)
  }
  const hideEditMovieModal = () => handleEditMovieVisibility(false)

  return (
    <div className={styles['movieCard']}>
      {isDeleteMovieOpened &&
        <DeleteMovieModal id={id} onClose={hideDeleteMovieModal} />
      }
      {isEditMovieOpened &&
        <EditMovieModal
          id={id}
          title={title}
          vote_average={vote_average}
          overview={overview}
          release_date={release_date}
          poster_path={poster_path}
          runtime={runtime}
          genres={genres}
          onClose={hideEditMovieModal}
        />
      }
      <div className={styles['movieCard--content']}>
        <div
          className={styles['menu-link']}
          onClick={handleMenuVisibility}
        ></div>
        {isMenuVisible && <div
          className={styles['movieCardMenu']}
        >
          <div
            className={styles['movieCardMenu--close']}
            onClick={handleMenuVisibility}
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
            src={poster_path}
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