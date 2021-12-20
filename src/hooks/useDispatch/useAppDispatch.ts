import { useCallback } from 'react'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import { authActions, jogsActions } from 'src/reducers'
import { Jog } from 'src/constants/types'

/* Auth Dispatchers */

export const useLoginDispatch = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback((token: string) => dispatch(authActions.login(token)), [dispatch])
}

export const useLogoutDispatch = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(() => dispatch(authActions.logout()), [dispatch])
}

/* Jogs Dispatchers */

export const useSetJogsDispatch = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback((jogs: Jog[]) => dispatch(jogsActions.setJogs(jogs)), [dispatch])
}
