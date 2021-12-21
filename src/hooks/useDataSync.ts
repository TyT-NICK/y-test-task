import { useCallback } from 'react'
import { renameKeysInArray } from 'src/utils'
import { Jog } from 'src/constants/types'
import { useDataSyncRequest } from './useRequest'
import { useSetJogsDispatch } from './useDispatch'

const useDataSync = (): [VoidFunction, boolean] => {
  const [getItems, pending] = useDataSyncRequest()
  const setJogs = useSetJogsDispatch()

  return [
    useCallback(() => {
      getItems()
        .then(({ jogs: rawJogs }) => {
          const jogs = renameKeysInArray<Jog[]>(rawJogs).sort((a, b) => b.date - a.date)

          setJogs(jogs)
        })
        .catch((e) => console.error(e))
    }, [getItems, setJogs]),
    pending,
  ]
}

export default useDataSync
