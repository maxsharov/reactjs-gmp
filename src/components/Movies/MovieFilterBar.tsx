import React, { FC } from 'react'
import classNames from "classnames"

import styles from './MovieFilterBar.scss'

const genres = ['All','Documentary','Comedy','Horror','Crime']

const MovieFilterBar: FC = () => {
  const activeGenre: string = 'All'
  const activeSort: string = 'Release Date'

  return (
    <div className={styles['movieFilterBar']}>
      <ul className={styles['movieFilterBar--genres']}>
        {genres.map(genre => {
          return (<li
            className={classNames(
              styles['movieFilterBar--genre'],
              activeGenre === genre &&
                styles['movieFilterBar--genre-active']
            )}
            key={genre}
          >{genre}</li>)
        })}
      </ul>
      <div className={styles['movieFilterBar--sort']}>
        <div className={styles['movieFilterBar--sort-title']}>Sort by</div>
        <div className={styles['movieFilterBar--sort-val']}>Release Date</div>
        <div className={styles['movieFilterBar--arrow']}>&#9650;</div>
      </div>
    </div>
  )
}

export default MovieFilterBar