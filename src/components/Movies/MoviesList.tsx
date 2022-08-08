import React, {FC, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import MovieCard from './MovieCard'
import { genresList, sortTypes } from './MovieFilterBar'
import { useGetMoviesQuery } from '../../app/moviesApi'
import { RootState } from '../../app/store'
import { setGenre, setSelectedMovie, setSortBy } from '../../features/movies/moviesSlice'

import styles from './MoviesList.scss'

const MoviesList: FC = () => {
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const { searchQuery } = useParams()

  const searchProps: any = {}
  if (searchQuery) {
    searchProps.search = searchQuery
    searchProps.searchBy = 'title'
  }

  const { sortOrder, sortBy, genreSelected } = useSelector((state: RootState) => state.movies)

  const genreFromUrl = searchParams.get('genre')

  if (genreFromUrl) {
    if (genreSelected !== genreFromUrl) {
      const genreObj = genresList.find(genre => genre.id === genreFromUrl)

      if (genreObj) {
        dispatch(setGenre(genreObj))
      }
    }
  }

  if (genreSelected !== 'all') {
    searchProps.filter = genreSelected
  }

  let sortByFromUrl = searchParams.get('sortBy')

  if (sortByFromUrl) {
    if (sortBy !== sortByFromUrl) {
      const sortObj = sortTypes.find(sortType => sortType.id === sortByFromUrl)

      if (sortObj) {
        dispatch(setSortBy(sortObj))
      }
    }
  }

  const {
    data: movies = [],
    isFetching,
    isLoading,
  } = useGetMoviesQuery({
    ...searchProps,
    sortOrder,
    sortBy,
  }, {
    refetchOnMountOrArgChange: true
  })

  const moviesTotal = movies.length || 0

  const onMovieSelect = (movieId: number) => {
    searchParams.set('movie', movieId + '')
    setSearchParams(searchParams)

    dispatch(setSelectedMovie(movieId))
  }

  if (isLoading) return <div>is loading</div>
  // if (isFetching) return <div>is fetching</div>

  return (
    <div>
      <div className={styles['movies--total']}>
        <span className={styles['movies--total-value']}>{moviesTotal}</span> movies found
      </div>
      <div className={styles['movies--list']}>
        {movies.map(item => {
            const {
              id,
              title,
              genres,
              poster_path,
              release_date,
              vote_average,
              runtime,
              overview,
            } = item

            const year = release_date.substring(0, 4)

            const movieCardProps = {
              id,
              title,
              genres,
              poster_path,
              release_date,
              year,
              vote_average,
              runtime,
              overview,
            }

            return (
              <MovieCard
                key={id}
                onMovieSelect={() => onMovieSelect(id)}
                {...movieCardProps}
              />
            )
          })}
      </div>
    </div>
  )
}

export default MoviesList