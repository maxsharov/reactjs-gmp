import React, { FC, useState } from 'react'
import { Movie } from "../../interfaces";

import styles from './MovieCard.scss'

interface MovieCardProps {
  title: string
  posterPath: string
  releaseDate: string
  genres: string[]
}

const MovieCard: FC<MovieCardProps> = ({
  title,
  posterPath,
  releaseDate,
  genres
}) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const year = releaseDate.substring(0, 4)

  const showMenu = () => setMenuVisible(true)
  const hideMenu = () => setMenuVisible(false)

  return (
    <div className={styles['movieCard']}>
      <div className={styles['movieCard--content']}>
        <div
          className={styles['menu-link']}
          onClick={showMenu}
        ></div>
        {menuVisible && <div
          className={styles['movieCardMenu']}
        >
          <div
            className={styles['movieCardMenu--close']}
            onClick={hideMenu}
          >
            X
          </div>
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>}
        <div className={styles['movieCard--img']}>
          <img src={posterPath} />
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