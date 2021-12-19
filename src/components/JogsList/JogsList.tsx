import { Jog } from 'src/constants/types'
import { FC } from 'react'
import EmptyList from './EmptyList'
import JogsListItem from './JogsListItem'

type JogsListProps = { items: Jog[] }

const JogsList: FC<JogsListProps> = ({ items }) => {
  if (!items?.length) return <EmptyList />

  return (
    <ul>
      {items.map((jog) => (
        <JogsListItem jog={jog} key={jog.id} />
      ))}
    </ul>
  )
}

export default JogsList
