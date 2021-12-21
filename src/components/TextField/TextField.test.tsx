import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TextField from './TextField'

describe('Text field', () => {
  it('should be rendered', () => {
    render(<TextField />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should display value from props', () => {
    render(<TextField value="test" />)

    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
  })

  it('should accept user input', () => {
    render(<TextField />)

    userEvent.type(screen.getByRole('textbox'), 'test')
    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
  })

  it('displays label', () => {
    render(<TextField label="test" />)

    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
