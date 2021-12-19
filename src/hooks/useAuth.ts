import { useCallback } from 'react'

import { auth, renameKeys } from 'src/utils'
import { useLoginRequest } from './useRequest'
import { useLoginDispatch, useLogoutDispatch } from './useDispatch'
import { UuidLogin } from 'src/constants/types'

type Auth = {
  login: (token?: string | null) => void
  logout: VoidFunction
  pending: boolean
}

const useAuth = (): Auth => {
  const [requestLogin, pending] = useLoginRequest()
  const dispatchLogin = useLoginDispatch()
  const dispatchLogout = useLogoutDispatch()

  const login = useCallback(
    (token?: string | null) => {
      if (token) {
        auth.setToken(token)
        return dispatchLogin(token)
      }

      requestLogin({ uuid: 'hello' })
        .then((response) => {
          const { accessToken } = renameKeys<UuidLogin>(response)

          auth.setToken(accessToken)
          dispatchLogin(accessToken)
        })
        .catch((e) => console.error(e))
    },
    [requestLogin, dispatchLogin]
  )

  const logout = useCallback(() => {
    auth.removeToken()
    dispatchLogout()
  }, [dispatchLogout])

  return { login, pending, logout }
}

export default useAuth
