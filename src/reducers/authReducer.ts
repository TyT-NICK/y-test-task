import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = { token: string | null }

const initialState: AuthState = { token: null }

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, { payload: token }: PayloadAction<string>) => ({ token }),
    logout: (_) => initialState,
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
