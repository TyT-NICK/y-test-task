import { configureStore } from '@reduxjs/toolkit'
import { authReducer, jogsReducer } from 'src/reducers'

export const reducer = {
  auth: authReducer,
  jogs: jogsReducer,
}

export const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
