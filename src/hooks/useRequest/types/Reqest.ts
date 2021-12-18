export enum Method {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
}

export type RequestParams = {
  url: string
  method?: Method
  isAuthNeeded?: boolean
}
