import { FC, useContext } from 'react'
import { ReactComponent as Sad } from 'src/assets/imgs/sad.svg'
import classes from './JogsList.module.scss'
import { Button } from '../index'
import { Color } from 'src/constants'
import { OpenFormContext } from 'src/views/Jogs/Jogs'

type EmptyListProps = {
  isFiltered?: boolean
}

const EmptyList: FC<EmptyListProps> = ({ isFiltered }) => {
  const openForm = useContext(OpenFormContext)

  return (
    <>
      <Sad className={classes.emptyListIcon} />
      <p className={classes.emptyListText}>Nothing is there</p>
      {!isFiltered && (
        <Button color={Color.purple} className={classes.emptyListAddButton} onClick={() => openForm && openForm()}>
          Create your jog first
        </Button>
      )}
    </>
  )
}

export default EmptyList
