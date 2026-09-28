import { render, screen } from '@testing-library/react'
import Tabs from './Tabs'

const defaultItems = [
  { id: 'past-day', label: 'Past day', content: <p>Day content</p> },
  { id: 'past-week', label: 'Past week', content: <p>Week content</p> },
  { id: 'past-month', label: 'Past month', content: <p>Month content</p> }
]

describe('Tabs', () => {
  it('renders tabs with title', () => {
    render(<Tabs title="Contents" items={defaultItems} />)
    expect(screen.getByText('Contents')).toBeInTheDocument()
  })

  it('renders all tab links', () => {
    render(<Tabs title="Contents" items={defaultItems} />)
    expect(screen.getByRole('link', { name: 'Past day' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Past week' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Past month' })).toBeInTheDocument()
  })

  it('renders tab panels with content', () => {
    render(<Tabs title="Contents" items={defaultItems} />)
    expect(screen.getByText('Day content')).toBeInTheDocument()
    expect(screen.getByText('Week content')).toBeInTheDocument()
    expect(screen.getByText('Month content')).toBeInTheDocument()
  })

  it('links tabs to panels via href', () => {
    render(<Tabs title="Contents" items={defaultItems} />)
    expect(screen.getByRole('link', { name: 'Past day' })).toHaveAttribute(
      'href',
      '#past-day'
    )
  })

  it('renders panels with correct ids', () => {
    const { container } = render(
      <Tabs title="Contents" items={defaultItems} />
    )
    expect(container.querySelector('#past-day')).toBeInTheDocument()
    expect(container.querySelector('#past-week')).toBeInTheDocument()
    expect(container.querySelector('#past-month')).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    const { container } = render(
      <Tabs title="Contents" items={defaultItems} />
    )
    expect(container.firstChild).toHaveClass('govuk-tabs')
  })

  it('has data-module attribute', () => {
    const { container } = render(
      <Tabs title="Contents" items={defaultItems} />
    )
    expect(container.firstChild).toHaveAttribute(
      'data-module',
      'govuk-tabs'
    )
  })
})
