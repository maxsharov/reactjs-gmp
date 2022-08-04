import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieResponse } from '../interfaces'

type GetMoviesArgs = {
  sortBy: string
  sortOrder: 'asc' | 'desc'
  genreSelected?: string
  search?: string
  searchBy?: string
  filter?: string
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/'}),
  endpoints: (build) => ({
    getMovies: build.query<MovieResponse[], GetMoviesArgs>({
      query: ({sortBy, sortOrder, genreSelected, search, searchBy, filter}) => {
        const baseUrl = `movies?sortBy=${sortBy}&sortOrder=${sortOrder}`

        let url = ''
        if (search) {
          url = url + `&search=${search}&searchBy=${searchBy}`
        }
        if (filter) {
          url = url + `&filter=${filter}`
        }

        return `${baseUrl}${url}`
      },
      transformResponse: (response: { data: MovieResponse[] }) => response.data,
    }),
    getMovie: build.query<MovieResponse, number>({
      query: (id) => ({ url: `movies/${id}` }),
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

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useUpdateMovieMutation,
  useAddMovieMutation,
  useDeleteMovieMutation
} = moviesApi
