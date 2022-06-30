import React, { FC } from 'react'

import Modal from '../UI/Modal'
import MovieForm from './MovieForm'
import { Movie } from './MovieCard'

interface EditMovieModalProps extends Movie {
  onClose: () => void
}

const EditMovieModal:FC<EditMovieModalProps> = ({
  onClose,
  ...movieProps
}) => {
  return (
    <Modal
      onClose={onClose}
    >
      <MovieForm
        heading="Edit movie"
        onClose={onClose}
        {...movieProps}
      />
    </Modal>
  )
}

export default EditMovieModal