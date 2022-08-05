import React from "react"
import {createRoot, hydrateRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";

// import { store } from './app/store'

import App from './App'

import {moviesApi} from "./app/moviesApi";
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

// import './styles/style.css'

const container = document.getElementById('root')

const root = hydrateRoot(container,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

/**
 * import { configureStore } from '@reduxjs/toolkit'
 * import { moviesApi } from './moviesApi'
 * import moviesReducer from '../features/movies/moviesSlice'
 *
 * export const store = configureStore({
 *   reducer: {
 *     [moviesApi.reducerPath]: moviesApi.reducer,
 *     movies: moviesReducer
 *   },
 *   middleware: (getDefaultMiddleware) =>
 *     getDefaultMiddleware().concat(moviesApi.middleware),
 * })
 *
 * export type RootState = ReturnType<typeof store.getState>
 * export type AppDispatch = typeof store.dispatch
 *
 */
