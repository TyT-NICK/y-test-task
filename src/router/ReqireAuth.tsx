import { FC } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'
import { Path } from './path'
import { hasToken } from '../utils/auth'

const RequireAuth: FC<RouteProps> = ({ children }) => {
  if (!hasToken()) return <Navigate to={Path.auth} />

  return <>{children}</>
}

export default RequireAuth
