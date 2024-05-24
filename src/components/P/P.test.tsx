import { render, screen } from '@testing-library/react'
import P from './P'

const text = 'Hello, world!'

describe('P component', () => {
  it('renders', () => {
    render(<P>{text}</P>)
    const p = screen.getByRole('paragraph')
    expect(p).toHaveClass('govuk-body')
    expect(p).toHaveTextContent(text)
  })

  it('renders the correct type', () => {
    render(<P type="small">{text}</P>)
    const p = screen.getByRole('paragraph')
    expect(p).toHaveAttribute('class', 'govuk-body-s')
    expect(p).toHaveTextContent(text)
  })

  it('renders additional props', () => {
    render(<P className="custom-class">{text}</P>)
    expect(screen.getByRole('paragraph')).toHaveClass('custom-class')
  })
})
