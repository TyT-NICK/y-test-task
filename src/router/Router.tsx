import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Path } from './path'
import { Contact, Info } from 'src/views'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.auth} />
        <Route path={Path.jogs} />
        <Route path={Path.info} element={<Info />} />
        <Route path={Path.contact} element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
