import { render, screen } from '@testing-library/react'
import HR from './HR'
import type { ComponentProps } from 'react'

describe('HR component', () => {
  it('renders HR component with default props', () => {
    render(<HR />)
    const hrElement = screen.getByRole('separator')
    expect(hrElement).toBeInTheDocument()
    expect(hrElement).toHaveClass('govuk-section-break')
    expect(hrElement).not.toHaveClass('govuk-section-break--medium')
    expect(hrElement).not.toHaveClass('govuk-section-break--large')
    expect(hrElement).not.toHaveClass('govuk-section-break--extra-large')
    expect(hrElement).toHaveClass('govuk-section-break--visible')
  })

  it('renders hidden HR component', () => {
    render(<HR invisible />)
    const hrElement = screen.getByRole('separator')
    expect(hrElement).toBeInTheDocument()
    expect(hrElement).toHaveClass('govuk-section-break')
    expect(hrElement).not.toHaveClass('govuk-section-break--visible')
  })

  test.each<[ComponentProps<typeof HR>['size'], string]>([
    ['medium', 'm'],
    ['large', 'l'],
    ['extra-large', 'xl']
  ])('renders HR component with size prop: %s', (size, expected) => {
    render(<HR size={size} />)
    const hrElement = screen.getByRole('separator')
    expect(hrElement).toBeInTheDocument()
    expect(hrElement).toHaveClass('govuk-section-break')
    expect(hrElement).toHaveClass(`govuk-section-break--${expected}`)
    expect(hrElement).toHaveClass('govuk-section-break--visible')
  })
})
