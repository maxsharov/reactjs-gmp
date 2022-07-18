import React, { FC } from 'react'
// import {useDispatch, useSelector} from 'react-redux'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import MovieFilterBar from '../Movies/MovieFilterBar'
import MoviesList from '../Movies/MoviesList'
// import MovieDescription from '../Movies/MovieDescription'

import AddMovieModal from '../Movies/AddMovieModal'
import useToggle from '../../utils/useToggle'

const Layout: FC = () => {
  // const dispatch = useDispatch()
  const [isAddMovieOpened, handleAddMovieVisibility] = useToggle(false)

  return (
    <ErrorBoundary>
      <Header handleAddMovie={handleAddMovieVisibility} />
      <main>
        <MovieFilterBar />
        <MoviesList />
      </main>
      <Footer/>
      {isAddMovieOpened &&
        <AddMovieModal onClose={handleAddMovieVisibility}/>
      }
    </ErrorBoundary>
  )
}

export default Layout