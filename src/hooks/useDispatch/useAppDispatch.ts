import { useCallback } from 'react'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import { authActions } from 'src/reducers'

/* Auth Dispatchers */

export const useLoginDispatch = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback((token: string) => dispatch(authActions.login(token)), [dispatch])
}

export const useLogoutDispatch = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(() => dispatch(authActions.logout()), [dispatch])
}
