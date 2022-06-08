import React, { FC } from 'react'

import Modal from '../UI/Modal'
import Button from '../UI/Button'

import styles from './AddMovie.scss'

interface AddMovieProps {
  onClose: () => void
}

const AddMovie: FC<AddMovieProps> = ({
  onClose,
}) => {
  return (
    <Modal
      heading="Add movie"
      onClose={onClose}
    >
      <form className={styles['form']}>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Title</label>
            <input type="text" />
          </div>
          <div className={styles['form--item']}>
            <label>Release Date</label>
            <input type="date" />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Movie URL</label>
            <input type="text" />
          </div>
          <div className={styles['form--item']}>
            <label>Rating</label>
            <input type="number" />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Genre</label>
            <input type="text" />
          </div>
          <div className={styles['form--item']}>
            <label>Runtime</label>
            <input type="text" />
          </div>
        </div>
        <div className={styles['form--row']}>
          <div className={styles['form--item']}>
            <label>Overview</label>
            <textarea></textarea>
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

export default AddMovie