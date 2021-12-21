import { Jog } from 'src/constants/types'
import { FC, memo, useCallback } from 'react'
import { ReactComponent as RunIcon } from 'src/assets/imgs/run.svg'
import classes from './JogsList.module.scss'
import dateFormatString from 'src/constants/dateFormatString'
import { format } from 'date-fns'

type JogsListItemProps = {
  jog: Jog
  onClick?: (jog: Jog) => void
}

const JogsListItem: FC<JogsListItemProps> = memo(({ jog, onClick }) => {
  const { distance, date, time } = jog

  // multiplication *1000 because of weird source format
  const formattedDate = format(date * 1000, dateFormatString)

  const handleClick = useCallback(() => onClick && onClick(jog), [jog, onClick])

  return (
    <li className={classes.jogListItem} onClick={handleClick}>
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
