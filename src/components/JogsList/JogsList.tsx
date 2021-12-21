import { Jog } from 'src/constants/types'
import { FC } from 'react'
import EmptyList from './EmptyList'
import JogsListItem from './JogsListItem'

type JogsListProps = {
  items: Jog[]
  isFiltered?: boolean
  onItemClick?: (jog: Jog) => void
}

const JogsList: FC<JogsListProps> = ({ items, isFiltered, onItemClick }) => {
  if (!items?.length) return <EmptyList isFiltered={!!isFiltered} />

  return (
    <ul>
      {items.map((jog) => (
        <JogsListItem jog={jog} key={jog.id} onClick={onItemClick} />
      ))}
    </ul>
  )
}

export default JogsList
