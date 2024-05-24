import { render, screen } from '@testing-library/react'
import Date from './Date'
import userEvent from '@testing-library/user-event'
import { labelsDate } from '../constants'
import type { ComponentProps } from 'react'

const { dd, mm, yyyy } = labelsDate
const mockOnChange = vi.fn()
const defaultProps: ComponentProps<typeof Date> = {
  format: 'dd/mm/yyyy',
  onChange: mockOnChange
}

describe('Date', () => {
  it('renders three input fields', () => {
    render(<Date {...defaultProps} />)

    Object.values(labelsDate).forEach((v) => {
      expect(screen.getByText(v)).toBeInTheDocument()
      expect(screen.getByLabelText(v)).toBeInTheDocument()
    })
    expect.assertions(6)
  })

  it('hides labels', () => {
    render(<Date {...defaultProps} hideLabels />)

    Object.values(labelsDate).forEach((v) => {
      expect(screen.queryByText(v)).not.toBeInTheDocument()
      expect(screen.getByLabelText(v)).toBeInTheDocument()
    })
    expect.assertions(6)
  })

  describe('on value change', () => {
    it('date month and year', async () => {
      render(<Date {...defaultProps} />)

      const dayInput = screen.getByLabelText(dd)
      await userEvent.type(dayInput, '02')
      expect(mockOnChange).toHaveBeenCalledWith('02//')

      await userEvent.type(screen.getByLabelText(mm), '01')
      expect(mockOnChange).toHaveBeenCalledWith('02/01/')

      await userEvent.type(screen.getByLabelText(yyyy), '2020')
      expect(mockOnChange).toHaveBeenCalledWith('02/01/2020')
    })

    it('change separator', async () => {
      render(<Date {...defaultProps} separator="-" />)

      const dayInput = screen.getByLabelText(dd)
      await userEvent.type(dayInput, '02')
      expect(mockOnChange).toHaveBeenCalledWith('02--')

      await userEvent.type(screen.getByLabelText(mm), '01')
      expect(mockOnChange).toHaveBeenCalledWith('02-01-')

      await userEvent.type(screen.getByLabelText(yyyy), '2020')
      expect(mockOnChange).toHaveBeenCalledWith('02-01-2020')
    })

    it('month and year', async () => {
      render(<Date {...defaultProps} format="mm/yyyy" />)

      await userEvent.type(screen.getByLabelText(mm), '02')
      expect(mockOnChange).toHaveBeenCalledWith('02/')

      await userEvent.type(screen.getByLabelText(yyyy), '2024')
      expect(mockOnChange).toHaveBeenCalledWith('02/2024')
    })

    it('shows invalid date as default value', async () => {
      render(<Date {...defaultProps} format="mm/yyyy" value="13/2021" />)
      expect(screen.getByLabelText(mm)).toHaveValue('13')
      expect(screen.getByLabelText(yyyy)).toHaveValue('2021')
    })

    it('rerender on new value', async () => {
      const { rerender } = render(
        <Date {...defaultProps} format="dd/mm/yyyy" value="19/13/2021" />
      )
      expect(screen.getByLabelText(dd)).toHaveValue('19')
      expect(screen.getByLabelText(mm)).toHaveValue('13')
      expect(screen.getByLabelText(yyyy)).toHaveValue('2021')

      rerender(<Date {...defaultProps} format="dd/mm/yyyy" value="" />)

      expect(screen.getByLabelText(dd)).toHaveValue('')
      expect(screen.getByLabelText(mm)).toHaveValue('')
      expect(screen.getByLabelText(yyyy)).toHaveValue('')
    })
  })
})
