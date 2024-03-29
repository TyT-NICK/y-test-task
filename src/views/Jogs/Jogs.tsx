import { createContext, FC, useCallback, useEffect, useState } from 'react'
import { Header, JogForm, JogsFilter, JogsList, Modal, OpenJogFormButton, ToggleFilterButton } from 'src/components'
import { useAppSelector, useDataSync, useSubmitJog, useToggle } from 'src/hooks'
import RequireAuth from 'src/router/ReqireAuth'
import { Jog } from 'src/constants/types'
import classes from './Jogs.module.scss'
import { JogsFilterType } from 'src/components/JogsFilter/JogsFilter'
import filterJogs from 'src/utils/filterJogs'

export const OpenFormContext = createContext<VoidFunction | null>(null)

const Jogs: FC = () => {
  const jogs = useAppSelector((state) => state.jogs)

  const [items, setItems] = useState<Jog[]>([])
  const [isJogFormOpen, setJogFormOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [currentlyEditedJog, setCurrentlyEditedJog] = useState<Jog | null>(null)
  const [filter, setFilter] = useState<JogsFilterType>({ min: null, max: null })

  const [filtersShown, toggleFiltersShown] = useToggle(false)

  const handleFiltersToggle = useCallback(() => toggleFiltersShown(), [toggleFiltersShown])

  const [updateItems, pending] = useDataSync()

  const handleSuccess = useCallback(() => {
    setJogFormOpen(false)
    updateItems()
  }, [updateItems])

  const handleError = useCallback((e: Error) => {
    setFormError(e.message)
  }, [])

  const [submitJog] = useSubmitJog({ onSuccess: handleSuccess, onError: handleError })

  const handleFilterUpdate = useCallback((filter: JogsFilterType) => setFilter(filter), [])

  const handleJogFormClose = useCallback(() => {
    setJogFormOpen(false)
    setCurrentlyEditedJog(null)
  }, [])

  const handleJogItemClick = useCallback((jog: Jog) => {
    setJogFormOpen(true)
    setCurrentlyEditedJog(jog)
  }, [])

  useEffect(() => {
    updateItems()
  }, [updateItems])

  useEffect(() => {
    setItems(filterJogs(jogs, filter))
  }, [jogs, filter])

  return (
    <RequireAuth>
      {/* It's better to use props to pass setJogFormOpen, but it is the only place i've found to apply useContext hook */}
      <OpenFormContext.Provider value={() => setJogFormOpen(true)}>
        <Header>
          <ToggleFilterButton isActive={filtersShown} toggle={handleFiltersToggle} />
        </Header>

        <main className={classes.main}>
          {pending && 'We are trying to find your jogs...'}

          {filtersShown && <JogsFilter onFilerChange={handleFilterUpdate} filter={filter} />}

          {!pending && (
            <JogsList items={items} isFiltered={!!(filter.min || filter.max)} onItemClick={handleJogItemClick} />
          )}

          <OpenJogFormButton />
        </main>

        <Modal open={isJogFormOpen} onClose={handleJogFormClose}>
          <JogForm error={formError} onSubmit={submitJog} onClose={handleJogFormClose} jog={currentlyEditedJog} />
        </Modal>
      </OpenFormContext.Provider>
    </RequireAuth>
  )
}

export default Jogs
