import React, { FC } from 'react'

import Modal from '../UI/Modal'
import Button from '../UI/Button'

import styles from './DeleteMovieModal.scss'
import { useDeleteMovieMutation } from '../../app/moviesApi'

interface DeleteMovieModalProps {
  id: number
  onClose: () => void
}

const DeleteMovieModal: FC<DeleteMovieModalProps> = ({
  id,
  onClose
}) => {
  const [deleteMovie] = useDeleteMovieMutation()

  return (
    <Modal
      heading="Delete Movie"
      onClose={onClose}
    >
      Are you sure you want to delete this movie?
      <div className={styles['delete-form']}>
        <Button
          classes={styles['delete-form--buttons']}
          primary
          onClick={() => deleteMovie(id)}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteMovieModal