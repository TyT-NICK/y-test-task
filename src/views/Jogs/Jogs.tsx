import { createContext, FC, useCallback, useEffect, useState } from 'react'
import { Header, JogForm, JogsFilter, JogsList, OpenJogFormButton, ToggleFilterButton } from 'src/components'
import { useAppSelector, useToggle } from 'src/hooks'
import RequireAuth from 'src/router/ReqireAuth'
import { useAddJogRequest, useDataSyncRequest } from 'src/hooks/useRequest'
import { Jog } from 'src/constants/types'
import { renameKeysInArray } from 'src/utils'
import classes from './Jogs.module.scss'
import { useSetJogsDispatch } from 'src/hooks/useDispatch'
import { JogsFilterType } from '../../components/JogsFilter/JogsFilter'

export const OpenFormContext = createContext<VoidFunction | null>(null)

const filterJogs = (jogs: Jog[], { min, max }: JogsFilterType) =>
  jogs.filter(({ date }) => {
    const jogDate = new Date(date * 1000) //epoch format

    if (min && jogDate < min) return false
    return !(max && jogDate > max)
  })

const Jogs: FC = () => {
  const jogs = useAppSelector((state) => state.jogs)

  const [items, setItems] = useState<Jog[]>([])
  const [isJogFormOpen, setJogFormOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [filter, setFilter] = useState<JogsFilterType>({ min: null, max: null })

  const setJogs = useSetJogsDispatch()

  const [filtersShown, toggleFiltersShown] = useToggle(false)
  const [getItems, pending] = useDataSyncRequest()
  const [addJog] = useAddJogRequest()

  const handleFiltersToggle = useCallback(() => toggleFiltersShown(), [toggleFiltersShown])

  const updateItems = useCallback(() => {
    getItems()
      .then(({ jogs: rawJogs }) => {
        const jogs = renameKeysInArray<Jog[]>(rawJogs).sort((a, b) => b.date - a.date)

        setJogs(jogs)
      })
      .catch((e) => console.error(e))
  }, [getItems, setJogs])

  const handleFilterUpdate = useCallback((filter: JogsFilterType) => setFilter(filter), [])

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

  useEffect(() => {
    setItems(filterJogs(jogs, filter))
  }, [jogs, filter])

  return (
    <RequireAuth>
      <OpenFormContext.Provider value={() => setJogFormOpen(true)}>
        <Header>
          <ToggleFilterButton isActive={filtersShown} toggle={handleFiltersToggle} />
        </Header>

        <main className={classes.main}>
          {pending && 'We are trying to find your jogs...'}

          {filtersShown && <JogsFilter onFilerChange={handleFilterUpdate} filter={filter} />}

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
