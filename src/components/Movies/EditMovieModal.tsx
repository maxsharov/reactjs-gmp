import React, { FC } from 'react'

import Modal from '../UI/Modal'
import MovieForm from './MovieForm'
import { Movie } from './MovieCard'
import { useUpdateMovieMutation } from '../../app/moviesApi'

interface EditMovieModalProps extends Movie {
  onClose: () => void
}

const EditMovieModal:FC<EditMovieModalProps> = ({
  onClose,
  ...movieProps
}) => {
  const [updateMovie, result] = useUpdateMovieMutation()

  return (
    <Modal
      onClose={onClose}
    >
      <MovieForm
        heading="Edit movie"
        onClose={onClose}
        onSubmit={updateMovie}
        {...movieProps}
      />
    </Modal>
  )
}

export default EditMovieModal