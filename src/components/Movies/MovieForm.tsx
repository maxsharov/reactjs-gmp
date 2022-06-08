import React, {FC, useState} from 'react'

import Modal from '../UI/Modal'
import Button from '../UI/Button'

import { Movie } from './MovieCard'

import styles from './MovieForm.scss'
import GenresSelect from '../UI/GenresSelect'

interface MovieFormProps extends Movie {
  heading: string
  onClose: () => void
}

const MovieForm: FC<MovieFormProps> = ({
  heading,
  title= '',
  rating= null,
  runtime= null,
  releaseDate= '',
  overview= '',
  genres= [],
  onClose,
}) => {
  const [inputTitle, setInputTitle] = useState(title)
  const [inputRating, setInputRating] = useState<number>(rating)
  const [inputRuntime, setInputRuntime] = useState<number>(runtime)
  const [inputGenres, setInputGenres] = useState<string[]>(genres)
  const [inputReleaseDate, setInputReleaseDate] = useState<string>(releaseDate)

  const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputTitle(e.target.value)
  }
  const handleRatingChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputRating(Number(e.target.value))
  }
  const handleRuntimeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputRuntime(Number(e.target.value))
  }
  const handleSelectedGenres = (genres: string[]) => {
    setInputGenres(genres)
  }
  const handleReleaseDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputReleaseDate(e.target.value)
  }

  return (
    <Modal
      heading={heading}
      onClose={onClose}
    >
      <form className={styles['form']}>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Title</label>
            <input type="text" value={inputTitle} onChange={handleTitleChange} />
          </div>
          <div className={styles['form--item']}>
            <label>Release Date</label>
            <input placeholder="Select Date" type="date" value={inputReleaseDate} onChange={handleReleaseDateChange} pattern="\d{2}/\d{2}/\d{4}" />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Movie URL</label>
            <input type="text" placeholder="https://" />
          </div>
          <div className={styles['form--item']}>
            <label>Rating</label>
            <input type="number" value={inputRating} onChange={handleRatingChange} />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Genre</label>
            <GenresSelect
              selectedGenres={inputGenres}
              onSelectedGenres={handleSelectedGenres}
            />
          </div>
          <div className={styles['form--item']}>
            <label>Runtime</label>
            <input type="text" value={inputRuntime} onChange={handleRuntimeChange} />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Overview</label>
            <textarea
              defaultValue={overview}
              placeholder="Movie description"
            />
          </div>
        </div>
        <div className={styles['form--buttons']}>
          <Button outlined>Reset</Button>
          <Button primary>Submit</Button>
        </div>
      </form>
    </Modal>
  )
}

export default MovieForm