import { useCallback } from 'react'

import { auth } from 'src/utils'
import { useLoginRequest } from './useRequest'

const useLogin = (): [(token?: string) => void, boolean] => {
  const [requestLogin, pending] = useLoginRequest()

  const login = useCallback(
    (token?: string) => {
      if (token) return auth.setToken(token)

      requestLogin({ uuid: 'hello' }).then((response) => auth.setToken(response.access_token))
    },
    [requestLogin]
  )

  return [login, pending]
}

export default useLogin
