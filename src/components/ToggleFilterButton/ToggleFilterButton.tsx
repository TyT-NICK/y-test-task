import { FC } from 'react'
import classes from './ToggleFilterButton.module.scss'
import { ReactComponent as FilterActive } from 'src/assets/imgs/filter-active.svg'
import { ReactComponent as Filter } from 'src/assets/imgs/filter.svg'

type ToggleFilterButtonProps = {
  isActive: boolean
  toggle: VoidFunction
}

const ToggleFilterButton: FC<ToggleFilterButtonProps> = ({ isActive, toggle }) => {
  return (
    <button className={classes.filterButton} onClick={toggle}>
      {isActive ? <FilterActive /> : <Filter />}
    </button>
  )
}

export default ToggleFilterButton
