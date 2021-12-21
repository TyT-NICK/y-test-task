export type UuidLogin = {
  uuid: string
}

export type DataSync = void

export type AddJog = {
  distance: number
  date: string
  time: number
}

export type UpdateJog = AddJog & {
  jog_id: number
  user_id: string
}
