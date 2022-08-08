import express from 'express'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { moviesApi } from '../src/app/moviesApi'
import { store } from '../src/app/store'

import App from '../src/App'

const PORT = 3000

const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/*', async (req, res) => {
  const renderRoot = () => (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  ReactDOMServer.renderToString(renderRoot())

  await Promise.all(moviesApi.util.getRunningOperationPromises())

  const content = ReactDOMServer.renderToString(renderRoot())
  const preloadedState = store.getState()

  const html = `
    <html>
      <head>
        <link rel="stylesheet" href="bundle.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="client_bundle.js"></script>
      </body>
    </html>
  `

  res.send(html)
})

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`)
})
