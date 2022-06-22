import React, { FC } from 'react'

import Modal from '../UI/Modal'
import MovieForm from './MovieForm'

interface AddMovieModalProps {
  onClose: () => void
}

const AddMovieModal:FC<AddMovieModalProps> = ({
  onClose
}) => {
  return (
    <Modal
      onClose={onClose}
    >
      <MovieForm
        heading="Add movie"
        onClose={onClose}
      />
    </Modal>
  )
}

export default AddMovieModal