import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieResponse } from '../interfaces'

type GetMoviesArgs = {
  sortBy: string
  sortOrder: 'asc' | 'desc'
  genreSelected?: string
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/'}),
  endpoints: (build) => ({
    getMovies: build.query<MovieResponse[], GetMoviesArgs>({
      query: ({sortBy, sortOrder, genreSelected}) => {
        if (!genreSelected) {
          return `movies?sortBy=${sortBy}&sortOrder=${sortOrder}`
        }
        return `movies?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${genreSelected}&searchBy=genres`
      },
      transformResponse: (response: { data: MovieResponse[] }) => response.data,
    })
  })
})

export const { useGetMoviesQuery } = moviesApi
