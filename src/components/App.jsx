import React from "react"
import WebpackLogo from '../assets/webpack-logo.png'

import './style.css'

const App = () => {
  return <div>
    <h1>My React App</h1>
    <hr/>
    <img src={WebpackLogo} className="logo" />
  </div>
}

export default App