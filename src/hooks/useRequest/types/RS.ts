export type UuidLogin = {
  access_token: string
}

export type DataSync = {
  jogs: Array<{
    id: number
    user_id: string
    distance: number
    time: number
    date: number
  }>
}

export type AddJog = {
  date: string
  distance: number
  time: number
}

export type UpdateJog = void
