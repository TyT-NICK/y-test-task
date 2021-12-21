import { render, screen, waitFor } from '@testing-library/react'
import JogForm, { JogFormType } from './JogForm'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

describe('JogForm', () => {
  it('should be rendered', () => {
    const mockSubmit = jest.fn()

    render(<JogForm onSubmit={mockSubmit} onClose={() => null} />)

    const [distance, time, date] = screen.getAllByRole('textbox')
    const submitButton = screen.getByText('Save')

    expect(distance).toBeInTheDocument()
    expect(time).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should not fire submit event when disabled', () => {
    const mockSubmit = jest.fn()

    render(<JogForm onSubmit={mockSubmit} onClose={() => null} />)

    const submitButton = screen.getByText('Save')

    userEvent.click(submitButton)

    expect(mockSubmit).not.toBeCalled()
  })

  // this test definitely should be passed but it isn't and idk why
  it('should submit correct data', async () => {
    const mockSubmit = jest.fn()

    const expectedData: JogFormType = {
      date: '26/08/2021',
      time: 20,
      distance: 2,
    }

    render(<JogForm onSubmit={(data) => console.log(data)} onClose={() => null} />)

    const [distance, time, date] = screen.getAllByRole('textbox')
    const submitButton = screen.getByText('Save')

    // this is the attempt to workaround validation delay. Doesn't work ;(
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(distance, '2')
      userEvent.type(time, '20')
      userEvent.type(date, '26/08/2021')
    })

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })

    userEvent.click(submitButton)

    expect(mockSubmit).toHaveBeenCalled()

    expect(mockSubmit).toHaveBeenCalledWith(expectedData)
  })
})
