import { FC, useCallback, useEffect, useState } from 'react'
import { Header, JogsList, ToggleFilterButton } from 'src/components'
import { useToggle } from 'src/hooks'
import RequireAuth from 'src/router/ReqireAuth'
import pageClasses from '../Page.module.scss'
import { useDataSyncRequest } from 'src/hooks/useRequest'
import { Jog } from 'src/constants/types'
import { renameKeysInArray } from 'src/utils'

const Jogs: FC = () => {
  const [items, setItems] = useState<Jog[]>([])

  const [filtersShown, toggleFiltersShown] = useToggle(false)
  const [getItems] = useDataSyncRequest()

  const handleFiltersToggle = useCallback(() => toggleFiltersShown(), [toggleFiltersShown])

  useEffect(() => {
    getItems()
      .then((response) => {
        const { jogs } = response

        setItems(renameKeysInArray<Jog[]>(jogs))
      })
      .catch((e) => console.error(e))
  }, [getItems])

  console.log(items)
  return (
    <RequireAuth>
      <Header>
        <ToggleFilterButton isActive={filtersShown} toggle={handleFiltersToggle} />
      </Header>
      <main className={pageClasses.main}>
        <JogsList items={items} />
      </main>
    </RequireAuth>
  )
}

export default Jogs
