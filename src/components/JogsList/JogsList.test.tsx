import { render, screen } from '@testing-library/react'
import JogsList from './JogsList'
import { Jog } from 'src/constants/types'

describe('Jogs List', () => {
  it('should render empty list', () => {
    render(<JogsList items={[]} isFiltered={false} />)

    expect(screen.getByText('Nothing is there')).toBeInTheDocument()
  })

  it('should render add button when the list is empty without filtering', () => {
    render(<JogsList items={[]} isFiltered={false} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should not render add button when the list is empty with filtering', () => {
    render(<JogsList items={[]} isFiltered={true} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  const mockItems: Jog[] = [
    {
      date: 1,
      id: 0,
      time: 10,
      distance: 20,
      userId: '1',
    },
    {
      date: 1,
      id: 1,
      time: 10,
      distance: 20,
      userId: '2',
    },
  ]

  it('should render 2 items', () => {
    render(<JogsList items={mockItems} isFiltered={true} />)

    // screen.debug()
    expect(screen.queryAllByText('Distance:').length).toEqual(2)
  })
})
