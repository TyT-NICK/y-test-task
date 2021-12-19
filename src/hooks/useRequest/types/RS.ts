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
