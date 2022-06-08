import React, { FC } from 'react'

import Modal from '../UI/Modal'
import MovieForm from "./MovieForm"
import {Movie} from "./MovieCard";

interface AddMovieModalProps extends Movie{
  onClose: () => void
}

const AddMovieModal:FC<AddMovieModalProps> = ({
  title,
  rating,
  runtime,
  overview,
  genres,
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