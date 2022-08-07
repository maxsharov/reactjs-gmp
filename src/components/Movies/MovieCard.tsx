import React, { FC, useCallback, useState } from 'react'

import DeleteMovieModal from './DeleteMovieModal'
import EditMovieModal from './EditMovieModal'

import styles from './MovieCard.scss'
import useToggle from '../../utils/useToggle'
import classNames from "classnames";

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
      <div className={classNames('w-80', styles['movieCard--content'])}>
        <div
          className={styles['menu-link']}
          onClick={handleMenuVisibility}
        ></div>
        {isMenuVisible && <div
          className={styles['movieCardMenu']}
        >
          <div
            className="mt-2.5 mr-2.5 cursor-pointer"
            onClick={handleMenuVisibility}
          >
            X
          </div>
          <ul className="w-full mb-3">
            <li
              className="flex"
              onClick={showEditMovieModal}
            >Edit</li>
            <li
              className="flex"
              onClick={showDeleteMovieModal}
            >Delete</li>
          </ul>
        </div>}
        <div className="mb-5 cursor-pointer">
          <img
            className="w-80"
            src={poster_path}
            alt={title}
            onClick={() => onMovieSelect(id)}
          />
        </div>

        <div className="flex justify-between mb-1">
          <div className="text-lg">{title}</div>
          <div>
            <span className={classNames(
              'text-sm', 'rounded', 'border', 'border-solid', 'border-gray-600', 'py-1', 'px-2.5'
            )}>{year}</span>
          </div>
        </div>
        {genres.length > 0 &&
          <div className="opacity-50 text-sm">{genres.join(', ')}</div>
        }
      </div>
    </div>
  )
}

export default MovieCard