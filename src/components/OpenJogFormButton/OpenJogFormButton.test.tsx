import { render, screen } from '@testing-library/react'
import OpenJogFormButton from './OpenJogFormButton'
import { createContext } from 'react'
import userEvent from '@testing-library/user-event'

describe('OpenJogFormButton', () => {
  it('should be rendered', () => {
    render(<OpenJogFormButton />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  // This test doesnt work because OpenJogFormButton uses imported context. It should get onClick from props
  // but that was the only place that can be made with useContext, so now it uses useContext
  it('should fire context mock func', async () => {
    const mockClick = jest.fn()

    const OpenFormContext = createContext<jest.Mock | null>(null)

    render(
      <OpenFormContext.Provider value={mockClick}>
        <OpenJogFormButton />
      </OpenFormContext.Provider>
    )

    userEvent.click(screen.getByRole('button'))

    expect(mockClick).toHaveBeenCalled()
  })
})
