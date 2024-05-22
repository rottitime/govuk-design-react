import { render, screen } from '@testing-library/react'
import Hint from './Hint'

const text = 'This is a hint'

describe('Hint', () => {
  it('renders the hint component', () => {
    render(<Hint>{text}</Hint>)
    const hintElement = screen.getByText(text)
    expect(hintElement).toBeInTheDocument()
  })

  it('renders the hint text', () => {
    const hintText = 'This is a hint'
    render(<Hint>{hintText}</Hint>)
    const hintElement = screen.getByText(hintText)
    expect(hintElement).toBeInTheDocument()
  })

  it('applies additional props to the hint component', () => {
    const className = 'custom-class'
    render(<Hint className={className}>{text}</Hint>)
    const hintElement = screen.getByText(text)
    expect(hintElement).toHaveClass(className)
  })
})
