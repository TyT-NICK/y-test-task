import { FC, useEffect } from 'react'
import { getToken } from 'src/utils/auth'
import { useAuth } from 'src/hooks'

const Auth: FC = ({ children }) => {
  const { login } = useAuth()

  useEffect(() => {
    const token = getToken()
    if (!token) return

    login(token)
  }, [login])

  return <>{children}</>
}

export default Auth
