import React, { FC } from 'react'

import Modal from '../UI/Modal'
import Button from '../UI/Button'

import styles from './DeleteMovieModal.scss'

interface DeleteMovieModalProps {
  onClose: () => void
}

const DeleteMovieModal: FC<DeleteMovieModalProps> = ({
  onClose
}) => {
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
        >
          Confirm
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteMovieModal