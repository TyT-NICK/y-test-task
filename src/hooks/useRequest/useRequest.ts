import { auth } from 'src/utils'
import { useCallback, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import apiUrl, { Url } from 'src/constants/api'
import { Method, RequestParams, RQ, RS } from './types'

const HTTPAgent = axios.create({
  baseURL: apiUrl,
  headers: {
    'content-type': 'application/json',
  },
})

HTTPAgent.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      auth.removeToken()
    }

    return Promise.reject(error)
  }
)

const useRequest = <RQ, RS>({
  url,
  method = Method.Get,
  isAuthNeeded,
}: RequestParams): [(params: RQ) => Promise<RS>, boolean] => {
  const [pending, setPending] = useState<boolean>(false)

  const request = useCallback(
    async (params: RQ) => {
      setPending(true)

      const config: AxiosRequestConfig = isAuthNeeded
        ? {
            headers: {
              Authorization: `Bearer ${auth.getToken()}`,
            },
          }
        : {}

      let response: AxiosResponse<{ response: RS }>
      try {
        switch (method) {
          case Method.Get:
            response = await HTTPAgent.get(url, config)
            break

          case Method.Post:
            response = await HTTPAgent.post(url, params, config)
            break

          case Method.Delete:
            response = await HTTPAgent.delete(url, config)
        }
      } catch (e) {
        throw e
      } finally {
        setPending(false)
      }

      const {
        data: { response: data },
      } = response

      return data
    },
    [isAuthNeeded, method, url]
  )

  return [request, pending]
}

export const useLoginRequest = () =>
  useRequest<RQ.UuidLogin, RS.UuidLogin>({
    url: Url.UuidLogin,
    method: Method.Post,
  })

export const useDataSyncRequest = () => useRequest<RQ.DataSync, RS.DataSync>({ url: Url.DataSync, isAuthNeeded: true })
