import { useAddJogRequest, useUpdateJogRequest } from './useRequest'
import { useCallback } from 'react'
import { JogFormType } from 'src/components/JogForm/JogForm'

type useSubmitJogInitializeType = {
  onSuccess: VoidFunction
  onError: (e: Error) => void
}

const useSubmitJog = ({ onSuccess, onError }: useSubmitJogInitializeType): [(data: JogFormType) => void, boolean] => {
  const [addJog, pendingAdd] = useAddJogRequest()
  const [updateJog, pendingUpdate] = useUpdateJogRequest()

  const submitJog = useCallback(
    (data: JogFormType) => {
      const { userId, id } = data

      if (userId && id) {
        updateJog({ ...data, user_id: userId, jog_id: id })
          .then(onSuccess)
          .catch(onError)
      } else {
        addJog(data).then(onSuccess).catch(onError)
      }
    },
    [addJog, onError, onSuccess, updateJog]
  )

  return [submitJog, pendingAdd || pendingUpdate]
}

export default useSubmitJog
