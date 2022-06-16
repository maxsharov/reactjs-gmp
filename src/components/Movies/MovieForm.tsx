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

interface MovieFormValues {
  title: string
  rating: number
  runtime: number
  genres: string[]
  releaseDate: string
  overview: string
}

const MovieForm: FC<MovieFormProps> = ({
  heading,
  title= '',
  rating= 0,
  runtime= 0,
  releaseDate= '',
  overview= '',
  genres= [],
  onClose,
}) => {
  const [formValues, setFormValues] = useState<MovieFormValues>({
    title,
    rating,
    runtime,
    genres,
    releaseDate,
    overview,
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(
      prevState => ({ ...prevState, title: e.target.value })
    )
  }
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(
      prevState => ({ ...prevState, rating: Number(e.target.value) })
    )
  }
  const handleRuntimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(
      prevState => ({ ...prevState, runtime: Number(e.target.value) })
    )
  }
  const handleSelectedGenres = (genres: string[]) => {
    setFormValues(
      prevState => ({ ...prevState, genres })
    )
  }
  const handleReleaseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(
      prevState => ({ ...prevState, releaseDate: e.target.value })
    )
  }
  const handleOverviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues(
      prevState => ({ ...prevState, overview: e.target.value })
    )
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
            <input type="text" value={formValues.title} onChange={handleTitleChange} />
          </div>
          <div className={styles['form--item']}>
            <label>Release Date</label>
            <input placeholder="Select Date" type="date" value={formValues.releaseDate} onChange={handleReleaseDateChange} pattern="\d{2}/\d{2}/\d{4}" />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Movie URL</label>
            <input type="text" placeholder="https://" />
          </div>
          <div className={styles['form--item']}>
            <label>Rating</label>
            <input type="number" value={formValues.rating} onChange={handleRatingChange} />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Genre</label>
            <GenresSelect
              selectedGenres={formValues.genres}
              onSelectedGenres={handleSelectedGenres}
            />
          </div>
          <div className={styles['form--item']}>
            <label>Runtime</label>
            <input type="text" value={formValues.runtime} onChange={handleRuntimeChange} />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Overview</label>
            <textarea
              defaultValue={overview}
              placeholder="Movie description"
              onChange={handleOverviewChange}
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