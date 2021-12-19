import React, { FC } from 'react'
import 'src/assets/styles/App.scss'
import { Router } from './router'
import { Provider } from 'react-redux'
import { store } from 'src/store'
import { Auth } from './components'

const App: FC = () => {
  return (
    <Provider store={store}>
      <Auth>
        <Router />
      </Auth>
    </Provider>
  )
}

export default App
