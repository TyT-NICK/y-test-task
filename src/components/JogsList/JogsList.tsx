import { Jog } from 'src/constants/types'
import { FC } from 'react'
import EmptyList from './EmptyList'
import JogsListItem from './JogsListItem'

type JogsListProps = { items: Jog[]; isFiltered?: boolean }

const JogsList: FC<JogsListProps> = ({ items, isFiltered }) => {
  if (!items?.length) return <EmptyList isFiltered={!!isFiltered} />

  return (
    <ul>
      {items.map((jog) => (
        <JogsListItem jog={jog} key={jog.id} />
      ))}
    </ul>
  )
}

export default JogsList
