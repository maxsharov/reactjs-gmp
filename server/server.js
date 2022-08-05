import express from 'express'
import fs from 'fs'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { StaticRouter } from "react-router-dom/server"
import App from '../src/App'
import {Provider} from "react-redux";

const PORT = 3000

const app = express()

import { store } from '../src/app/store'

// app.use('^/$', (req, res, next) => {
//   fs.readFile(path.resolve('./dev/index.html'), 'utf-8', (err, data) => {
//
//     if (err) {
//       console.log(err)
//       return res.status(500).send("Some error has happened")
//     }
//
//     console.log('check-check')
//
//     const content = ReactDOMServer.renderToString(
//       <StaticRouter location={req.url}>
//         <App />
//       </StaticRouter>
//     )
//
//     return res.send(
//       data.replace(
//         '<div id="app"></div>',
//         `<div id="app">${content}</div><script src="client_bundle.js"></script>`
//       )
//     )
//   })
// })

function renderHTML(html, preloadedState) {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          <link rel="stylesheet" href="bundle.css">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="client_bundle.js"></script>
        </body>
      </html>
  `;
}

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('*', (req, res) => {
  console.log('req.url', req.url)
  if (req.url === "/") {
    return res.redirect("/search");
  }
  console.log('req.url', req.url)

  const renderRoot = () => (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  ReactDOMServer.renderToString(renderRoot())

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



// console.log('__dirname', path.resolve(__dirname))
// app.use(express.static('build/public'))

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`)
})

/*
* const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.static('build/public'))

app.get('*', (req, res) => {
  const context = {}

  console.log('req.url', req.url)

  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()

  const html = `
    <html>
      <head>
        ${helmet.meta.toString()}
        ${helmet.title.toString()}
      </head>
      <body>
         <div id="root">${content}</div>
         <script src="client_bundle.js"></script>
      </body>
    </html>
  `

  res.send(html)
})

app.listen(PORT, () => {
  console.log(`App running ${PORT}`)
})
* */