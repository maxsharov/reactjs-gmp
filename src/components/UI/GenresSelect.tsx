import React, { ChangeEvent, FC } from 'react'
import classNames from "classnames";

import useToggle from "../../utils/useToggle";
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
  const [isListVisible, handleListVisibility] = useToggle(false)

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
          [styles['input-toggle--opened']]: isListVisible
        }
      )}
    >
      <input
        readOnly
        type="text"
        value="Select Genre"
        onClick={handleListVisibility}
        className={styles['input-toggle--input']}
      />

      {isListVisible && <div className={styles['checkbox-group']}>
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