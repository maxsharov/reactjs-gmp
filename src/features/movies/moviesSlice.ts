import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GenreType, SortType } from '../../components/Movies/MovieFilterBar'

export type SortOrderType = 'asc' | 'desc'

export interface MoviesSliceState {
  selectedMovie: number
  sortBy: string
  sortByTitle: string
  genreSelected: string
  genreSelectedTitle: string
  sortOrder: SortOrderType
}

const initialState: MoviesSliceState = {
  selectedMovie: null,
  sortBy: 'vote_average',
  sortByTitle: 'Rating',
  genreSelected: 'all',
  genreSelectedTitle: 'All',
  sortOrder: 'asc',
}

export const moviesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeSortOrder(state) {
      state.selectedMovie = null
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
    },
    setSortBy(state, action: PayloadAction<SortType>){
      state.selectedMovie = null
      state.sortBy = action.payload.id
      state.sortByTitle = action.payload.title
    },
    setGenre(state, action: PayloadAction<GenreType>) {
      state.selectedMovie = null
      state.genreSelected = action.payload.id
      state.genreSelectedTitle = action.payload.title
    },
    setSelectedMovie(state, action: PayloadAction<number>) {
      state.selectedMovie = action.payload
    },
    removeSelectedMovie(state) {
      state.selectedMovie = null
    }
  },
})

export const { changeSortOrder, setSortBy, setGenre, setSelectedMovie, removeSelectedMovie } = moviesSlice.actions

export default moviesSlice.reducer