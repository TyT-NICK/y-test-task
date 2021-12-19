import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Path } from './path'
import { Auth, Contact, Info, Jogs } from 'src/views'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.auth} element={<Auth />} />
        <Route path={Path.jogs} element={<Jogs />} />
        <Route path={Path.info} element={<Info />} />
        <Route path={Path.contact} element={<Contact />} />
        <Route path="*" element={<Navigate to={Path.auth} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
