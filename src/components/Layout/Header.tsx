import React, { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SearchBar from '../SearchBar/SearchBar'
import Button from '../UI/Button'
import Logo from './Logo'
import MovieDescription from '../Movies/MovieDescription'

import { RootState } from '../../app/store'

import styles from './Header.scss'

const Header: FC<{ handleAddMovie: () => void }> = ({
  handleAddMovie
}) => {
  const [searchParams] = useSearchParams()
  const selectedMovieFromStore = useSelector((state: RootState) => state.movies.selectedMovie)
  const movieIdFromUrl = Number(searchParams.get('movie'))

  const selectedMovie = useMemo(
    () => movieIdFromUrl || selectedMovieFromStore,
    [movieIdFromUrl, selectedMovieFromStore]
  )

  if (selectedMovie) {
    return <MovieDescription movieId={selectedMovie} />
  }

  return (
    <div
      className={styles["header"]}
      data-testid="header-section"
    >
      <div className={styles["top-section"]}>
        <Logo />
        <div className="add-movie-btn">
          <Button
            onClick={handleAddMovie}
            outlined
          >+ ADD MOVIE</Button>
        </div>
      </div>
      <SearchBar/>
    </div>
  )
}

export default Header

