import React, { FC } from 'react'

import Modal from '../UI/Modal'
import MovieForm from "./MovieForm"
import {Movie} from "./MovieCard";

interface EditMovieModalProps extends Movie{
  onClose: () => void
}

const EditMovieModal:FC<EditMovieModalProps> = ({
  title,
  rating,
  runtime,
  overview,
  releaseDate,
  genres,
  onClose
}) => {
  return (
    <Modal
      onClose={onClose}
    >
      <MovieForm
        heading="Edit movie"
        title={title}
        rating={rating}
        runtime={runtime}
        overview={overview}
        releaseDate={releaseDate}
        genres={genres}
        onClose={onClose}
      />
    </Modal>
  )
}

export default EditMovieModal