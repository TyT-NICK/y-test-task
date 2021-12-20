import { createContext, FC, useCallback, useEffect, useState } from 'react'
import { Header, JogForm, JogsList, OpenJogFormButton, ToggleFilterButton } from 'src/components'
import { useToggle } from 'src/hooks'
import RequireAuth from 'src/router/ReqireAuth'
import pageClasses from '../Page.module.scss'
import { useAddJogRequest, useDataSyncRequest } from 'src/hooks/useRequest'
import { Jog } from 'src/constants/types'
import { renameKeysInArray } from 'src/utils'
import classes from './Jogs.module.scss'
import classNames from 'classnames'

export const OpenFormContext = createContext<VoidFunction | null>(null)

const Jogs: FC = () => {
  const [items, setItems] = useState<Jog[]>([])
  const [isJogFormOpen, setJogFormOpen] = useState(false)
  const [formError, setFormError] = useState('')

  const [filtersShown, toggleFiltersShown] = useToggle(false)
  const [getItems, pending] = useDataSyncRequest()
  const [addJog] = useAddJogRequest()

  const handleFiltersToggle = useCallback(() => toggleFiltersShown(), [toggleFiltersShown])

  const updateItems = useCallback(() => {
    getItems()
      .then((response) => {
        const { jogs } = response

        setItems(renameKeysInArray<Jog[]>(jogs).sort((a, b) => b.date - a.date))
      })
      .catch((e) => console.error(e))
  }, [getItems])

  const handleFormSubmit = useCallback(
    (data: { distance: number; time: number; date: string }) => {
      addJog(data)
        .then((_) => {
          setJogFormOpen(false)
          updateItems()
        })
        .catch((e) => {
          setFormError(e.message)
        })
    },
    [addJog, updateItems]
  )

  useEffect(() => {
    updateItems()
  }, [updateItems])

  const mainClasses = classNames(pageClasses.main, classes.main)

  return (
    <RequireAuth>
      <OpenFormContext.Provider value={() => setJogFormOpen(true)}>
        <Header>
          <ToggleFilterButton isActive={filtersShown} toggle={handleFiltersToggle} />
        </Header>

        <main className={mainClasses}>
          {pending && 'We are trying to find your jogs...'}
          {!pending && <JogsList items={items} />}

          <OpenJogFormButton />
        </main>

        <JogForm
          error={formError}
          onSubmit={handleFormSubmit}
          onClose={() => setJogFormOpen(false)}
          isOpen={isJogFormOpen}
        />
      </OpenFormContext.Provider>
    </RequireAuth>
  )
}

export default Jogs
