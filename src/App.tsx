import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import MovieFilterBar from './components/Movies/MovieFilterBar'
import MoviesList from './components/Movies/MoviesList'
import MovieDescription from './components/Movies/MovieDescription'

import AddMovieModal from './components/Movies/AddMovieModal'
import useToggle from './utils/useToggle'
import { RootState } from './app/store'

const App: FC = () => {
  const [isAddMovieOpened, handleAddMovieVisibility] = useToggle(false)

  const selectedMovie = useSelector((state: RootState) => state.movies.selectedMovie)

  return (
    <ErrorBoundary>
      {selectedMovie ?
        <MovieDescription /> :
        <Header handleAddMovie={handleAddMovieVisibility}/>
      }
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

export default App