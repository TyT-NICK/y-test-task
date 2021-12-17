import { FC, useCallback } from 'react'
import { Header, ToggleFilterButton } from 'src/components'
import { useToggle } from 'src/hooks'

const Jogs: FC = () => {
  const [filtersShown, toggleFiltersShown] = useToggle(false)

  const handleFiltersToggle = useCallback(() => toggleFiltersShown(), [toggleFiltersShown])

  return (
    <>
      <Header>
        <ToggleFilterButton isActive={filtersShown} toggle={handleFiltersToggle} />
      </Header>
    </>
  )
}

export default Jogs
