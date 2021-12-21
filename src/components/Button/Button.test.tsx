import Button from './Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('should be rendered', () => {
    render(<Button>Test</Button>)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('should be clickable', () => {
    const mockClick = jest.fn()
    render(<Button onClick={mockClick}>Test</Button>)

    const button = screen.getByRole('button')

    userEvent.click(button)

    expect(mockClick).toHaveBeenCalled()
  })

  it('should not be clickable when disabled', () => {
    const mockClick = jest.fn()
    render(
      <Button onClick={mockClick} disabled>
        Test
      </Button>
    )

    const button = screen.getByRole('button')

    userEvent.click(button)

    expect(button).toHaveAttribute('disabled', '')
    expect(mockClick).not.toHaveBeenCalled()
  })
})
