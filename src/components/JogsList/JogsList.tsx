import { Jog } from 'src/constants/types'
import { FC } from 'react'
import EmptyList from './EmptyList'

type JogsListProps = { items: Jog[] }

const JogsList: FC<JogsListProps> = ({ items }) => {
  if (!items?.length) return <EmptyList />

  return null
}

export default JogsList
