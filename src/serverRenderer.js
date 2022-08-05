import React from 'react'
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server";
import App from './App'
// import { configureStore } from "@reduxjs/toolkit";

import { store } from './app/store'

function renderHTML(html, preloadedState = {}) {
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
          window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/js/main.js"></script>
      </body>
    </html>
  `
}

export default function serverRenderer() {
  return (req, res) => {

    console.log(req)
    // const store = configureStore()

    const renderRoot = () => (
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    )

    renderToString(renderRoot())

    const htmlString = renderToString(renderRoot())
    const preloadedState = store.getState()

    res.send(renderHTML(htmlString, preloadedState))
  }
}

// export default function serverRenderer() {
//   return (req, res) => {
//     const htmlString = renderToString(<App />)
//
//     res.send(renderHTML(htmlString))
//   }
// }