export enum Method {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
}

export type RequestParams = {
  url: string
  method?: Method
  isAuthNeeded?: boolean
}
