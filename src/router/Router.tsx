import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Path } from './path'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.auth} />
        <Route path={Path.jogs} />
        <Route path={Path.info} />
        <Route path={Path.contact} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
