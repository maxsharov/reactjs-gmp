import React, { FC } from 'react'

import Layout from './components/Layout/Layout'
import {Navigate, Route, Routes} from "react-router-dom";
import MoviesList from "./components/Movies/MoviesList";
import Error from './components/Layout/Error'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/search" element={<Layout />}>
        <Route path=":searchQuery" element={<MoviesList />} />
      </Route>
      <Route
        path="/"
        element={<Navigate to="/search" replace />}
      />
      <Route path="*" element={<Error />}
      />
    </Routes>
  )
}

export default App