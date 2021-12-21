import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { FC, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { useAuth } from 'src/hooks'
import { reducer, RootState, store } from 'src/store'

const Auth: FC = ({ children }) => {
  const { login } = useAuth()

  useEffect(() => {
    login('test token')
  }, [login])

  return <>{children}</>
}

export const renderWithAuth = (element: ReactNode, initialState?: RootState) =>
  render(
    <Provider store={configureStore({ reducer: reducer, preloadedState: initialState || store.getState() })}>
      <Auth>{element}</Auth>
    </Provider>
  )
