const apiUrl = process.env.REACT_APP_API_URL

export enum Url {
  UuidLogin = '/v1/auth/uuidLogin',
  DataSync = '/v1/data/sync',
  Jog = '/v1/data/jog',
}

export default apiUrl
