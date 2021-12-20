import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Jog } from 'src/constants/types'

type JogsState = Jog[]

const initialState: JogsState = []

const jogsSlice = createSlice({
  name: 'jogs',
  initialState,
  reducers: {
    setJogs: (state, { payload }: PayloadAction<Jog[]>) => payload,
  },
})

export const jogsActions = jogsSlice.actions
export default jogsSlice.reducer
