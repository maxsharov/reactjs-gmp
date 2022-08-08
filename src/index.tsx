import React from "react"
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'

import { moviesApi } from './app/moviesApi'
import moviesReducer from './features/movies/moviesSlice'

// @ts-ignore
const preloadedState = window.PRELOADED_STATE

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    movies: moviesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
  preloadedState
})

// @ts-ignore
delete window.__PRELOADED_STATE__

const container = document.getElementById('root')

const root = hydrateRoot(container,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
