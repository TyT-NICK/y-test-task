import { FC } from 'react'
import { Navigate, Route, RouteProps } from 'react-router-dom'
import { auth } from 'src/utils'
import { Path } from './path'

const ProtectedRoute: FC<RouteProps> = ({ element, ...props }) => {
  return <Route {...props} element={!auth.hasToken() ? <Navigate to={Path.auth} /> : element} />
}

export default ProtectedRoute
