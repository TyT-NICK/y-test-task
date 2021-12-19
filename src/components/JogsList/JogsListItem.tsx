import { Jog } from 'src/constants/types'
import { FC, memo } from 'react'
import { ReactComponent as RunIcon } from 'src/assets/imgs/run.svg'
import classes from './JogsList.module.scss'
import dateFormatString from 'src/constants/dateFormatString'
import { format } from 'date-fns'

type JogsListItemProps = {
  jog: Jog
}

const JogsListItem: FC<JogsListItemProps> = memo(({ jog: { distance, date, time } }) => {
  // multiplication *1000 because of weird source format
  const formattedDate = format(date * 1000, dateFormatString)

  return (
    <li className={classes.jogListItem}>
      <RunIcon />
      <div>
        <span className={classes.value}>{formattedDate}</span>
        <p className={classes.key}>
          Distance: <span className={classes.value}>{distance} km</span>
        </p>
        <p className={classes.key}>
          Time: <span className={classes.value}>{time} min</span>
        </p>
      </div>
    </li>
  )
})

export default JogsListItem
