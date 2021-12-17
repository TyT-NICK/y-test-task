import { FC } from 'react'
import { Header } from '../../components'
import { ReactComponent as Filter } from 'src/assets/imgs/filter.svg'
import { ReactComponent as FilterActive } from 'src/assets/imgs/filter-active.svg'
import { useToggle } from '../../hooks'
import classes from './Jogs.module.scss'

const Jogs: FC = () => {
  const [filtersShown, toggleFiltersShown] = useToggle(false)

  return (
    <>
      <Header>
        <button className={classes.filterButton} onClick={() => toggleFiltersShown()}>
          {filtersShown ? <FilterActive /> : <Filter />}
        </button>
      </Header>
    </>
  )
}

export default Jogs
