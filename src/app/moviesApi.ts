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
    }),
    updateMovie: build.mutation<MovieResponse, Partial<MovieResponse> & Pick<MovieResponse, 'id'>>({
      query: ({...body}) => ({
        url: `movies`,
        method: 'PUT',
        body
      })
    }),
    addMovie: build.mutation<MovieResponse, Partial<MovieResponse>>({
      query(body) {
        return {
          url: `movies`,
          method: 'POST',
          body,
        }
      }
    }),
    deleteMovie: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `movies/${id}`,
          method: 'DELETE',
        }
      },
    }),
  })
})

export const { useGetMoviesQuery, useUpdateMovieMutation, useAddMovieMutation, useDeleteMovieMutation } = moviesApi
