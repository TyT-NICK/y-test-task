import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { reducer, RootState, store } from 'src/store'

export const renderWithStore = (element: ReactNode, initialState?: RootState) =>
  render(
    <Provider store={configureStore({ reducer: reducer, preloadedState: initialState || store.getState() })}>
      {element}
    </Provider>
  )
