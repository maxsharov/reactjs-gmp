import React from "react"
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './app/store'

import App from './App'

import './styles/style.css'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)