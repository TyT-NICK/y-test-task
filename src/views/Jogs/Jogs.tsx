import { FC, useCallback } from 'react'
import { Header, ToggleFilterButton } from 'src/components'
import { useToggle } from 'src/hooks'
import RequireAuth from 'src/router/ReqireAuth'

const Jogs: FC = () => {
  const [filtersShown, toggleFiltersShown] = useToggle(false)

  const handleFiltersToggle = useCallback(() => toggleFiltersShown(), [toggleFiltersShown])

  return (
    <RequireAuth>
      <Header>
        <ToggleFilterButton isActive={filtersShown} toggle={handleFiltersToggle} />
      </Header>
    </RequireAuth>
  )
}

export default Jogs
