import { FC, useContext } from 'react'
import { ReactComponent as Sad } from 'src/assets/imgs/sad.svg'
import classes from './JogsList.module.scss'
import { Button } from '../index'
import { Color } from 'src/constants'
import { OpenFormContext } from 'src/views/Jogs/Jogs'

const EmptyList: FC = () => {
  const openForm = useContext(OpenFormContext)

  return (
    <>
      <Sad className={classes.emptyListIcon} />
      <p className={classes.emptyListText}>Nothing is there</p>
      <Button color={Color.purple} className={classes.emptyListAddButton} onClick={() => openForm && openForm()}>
        Create your jog first
      </Button>
    </>
  )
}

export default EmptyList
