import React, { FC } from 'react'

import Modal from '../UI/Modal'
import MovieForm from './MovieForm'
import { useAddMovieMutation } from '../../app/moviesApi'

interface AddMovieModalProps {
  onClose: () => void
}

const AddMovieModal:FC<AddMovieModalProps> = ({
  onClose
}) => {
  const [addMovie, result] = useAddMovieMutation()

  if (result.status === 'fulfilled') {
    return (<Modal
      onClose={onClose}
    >
      <h2>Congratulations!</h2>
      <p>The movie has been added to database successfully</p>
    </Modal>)
  } else {
    return (
      <Modal
        onClose={onClose}
      >
        <MovieForm
          heading="Add movie"
          onClose={onClose}
          onSubmit={addMovie}
        />
      </Modal>
    )
  }
}

export default AddMovieModal