import reducer, {
  changeSortOrder,
  setSortBy,
  setGenre,
  MoviesSliceState, setSelectedMovie, removeSelectedMovie
} from './moviesSlice'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    selectedMovie: null,
    sortBy: 'vote_average',
    sortByTitle: 'Rating',
    genreSelected: 'all',
    genreSelectedTitle: 'All',
    sortOrder: 'asc',
  })
})

test('should change sort order', () => {
  const previousState = { selectedMovie: null, sortOrder: 'asc' } as MoviesSliceState

  expect(reducer(previousState, changeSortOrder())).toEqual(
    { selectedMovie: null, sortOrder: 'desc' }
  )
})

test('should change sortBy', () => {
  const previousState = {
    selectedMovie: null,
    sortBy: 'vote_average',
    sortByTitle: 'Rating',
  } as MoviesSliceState

  const newSortOrder = {
    id: 'revenue',
    title: 'Revenue'
  }

  expect(reducer(previousState, setSortBy(newSortOrder))).toEqual(
    {
      ...previousState,
      sortBy: newSortOrder.id,
      sortByTitle: newSortOrder.title,
    }
  )
})

test('should change genre', () => {
  const previousState = {
    selectedMovie: null,
    genreSelected: 'all',
    genreSelectedTitle: 'All',
  } as MoviesSliceState

  const newGenre = {
    id: 'comedy',
    title: 'Comedy'
  }

  expect(reducer(previousState, setGenre(newGenre))).toEqual(
    {
      ...previousState,
      genreSelected: newGenre.id,
      genreSelectedTitle: newGenre.title,
    }
  )
})

test('should change selected movie', () => {
  const previousState = {
    selectedMovie: null,
  } as MoviesSliceState

  const movieId = 23863

  expect(reducer(previousState, setSelectedMovie(movieId))).toEqual(
    {
      selectedMovie: movieId
    }
  )
})

test('should remove selected movie', () => {
  const previousState = {
    selectedMovie: 23863,
  } as MoviesSliceState

  expect(reducer(previousState, removeSelectedMovie())).toEqual(
    {
      selectedMovie: null
    }
  )
})