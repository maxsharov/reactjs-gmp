import React, {ChangeEvent, FC, useState} from 'react'
import classNames from "classnames";

import { allGenresList } from "../../constants";

import styles from "./GenresSelect.scss";

interface GenresSelectProps {
  selectedGenres: string[]
  onSelectedGenres: (g: string[]) => void
}

const GenresSelect: FC<GenresSelectProps> = ({
  selectedGenres,
  onSelectedGenres,
}) => {
  const [isOpen, handleVisibility] = useState(false)

  const toggleVisibility = () => {
    handleVisibility((state) => !state)
  }

  const handleGenreSelect = (e: ChangeEvent<HTMLInputElement>) => {
    let newSelectedGenres = []
    if (e.target.checked) {
      newSelectedGenres.push(...selectedGenres, e.target.name)
    } else {
      newSelectedGenres = [...selectedGenres].filter(genre => genre !== e.target.name)
    }

    onSelectedGenres(newSelectedGenres)
  }

  return (
    <div
      className={classNames(
        styles['input-toggle'],
        {
          [styles['input-toggle--opened']]: isOpen
        }
      )}
    >
      <input
        readOnly
        type="text"
        value="Select Genre"
        onClick={toggleVisibility}
        className={styles['input-toggle--input']}
      />

      {isOpen && <div className={styles['checkbox-group']}>
        {allGenresList.map(genre => {
          const genreLowerCase = genre.toLowerCase()

          return (
            <div key={genre} className={styles['checkbox-item']}>
              <input
                type="checkbox"
                name={genre}
                id={`${genreLowerCase}`}
                defaultChecked={selectedGenres.includes(genre)}
                onChange={handleGenreSelect}
                className={styles['checkbox-item--input']}
              />
              <label
                className={styles['checkbox-item--label']}
                htmlFor={`${genreLowerCase}`}
              >
                {genre}
              </label>
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default GenresSelect