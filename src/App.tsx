import React, { FC } from 'react'
import './assets/styles/App.scss'

const App: FC = () => {
  console.log(process.env.REACT_APP_API_URL)
  return <div className="App"></div>
}

export default App
