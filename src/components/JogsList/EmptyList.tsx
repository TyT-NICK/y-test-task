import { FC } from 'react'
import { ReactComponent as Sad } from 'src/assets/imgs/sad.svg'
import classes from './JogsList.module.scss'
import { Button } from '../index'
import { Color } from 'src/constants'

const EmptyList: FC = () => {
  return (
    <>
      <Sad className={classes.emptyListIcon} />
      <p className={classes.emptyListText}>Nothing is there</p>
      <Button color={Color.purple} className={classes.emptyListAddButton}>
        Create your jog first
      </Button>
    </>
  )
}

export default EmptyList
