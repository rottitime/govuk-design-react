import { render, screen } from '@testing-library/react'
import Label from './Label'

const text = 'Test Label'

describe('Label', () => {
  it('renders the label text', () => {
    render(<Label>{text}</Label>)
    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('applies the specified size class', () => {
    const size = 'small'
    render(<Label size={size}>{text}</Label>)
    expect(screen.getByText(text)).toHaveClass('govuk-label govuk-label--s')
  })

  it('passes additional props to the label element', () => {
    const htmlFor = 'test-input'
    render(
      <>
        <Label htmlFor={htmlFor}>{text}</Label>
        <input id={htmlFor} />
      </>
    )
    expect(screen.getByText(text)).toHaveAttribute('for', htmlFor)
  })
})
