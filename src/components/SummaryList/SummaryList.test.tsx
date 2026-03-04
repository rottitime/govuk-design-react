import { render, screen } from '@testing-library/react'
import SummaryList from './SummaryList'

const defaultRows = [
  { key: 'Name', value: 'Sarah Philips' },
  { key: 'Date of birth', value: '5 January 1978' },
  { key: 'Address', value: '72 Guild Street, London, SE23 6FH' }
]

describe('SummaryList', () => {
  it('renders rows with keys and values', () => {
    render(<SummaryList rows={defaultRows} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Sarah Philips')).toBeInTheDocument()
    expect(screen.getByText('Date of birth')).toBeInTheDocument()
  })

  it('renders actions with links', () => {
    const rows = [
      {
        key: 'Name',
        value: 'Sarah Philips',
        actions: [{ text: 'Change', href: '#', visuallyHiddenText: 'name' }]
      }
    ]
    render(<SummaryList rows={rows} />)
    const link = screen.getByRole('link', { name: /Change/ })
    expect(link).toBeInTheDocument()
  })

  it('renders visually hidden text for actions', () => {
    const rows = [
      {
        key: 'Name',
        value: 'Sarah Philips',
        actions: [{ text: 'Change', href: '#', visuallyHiddenText: 'name' }]
      }
    ]
    const { container } = render(<SummaryList rows={rows} />)
    expect(
      container.querySelector('.govuk-visually-hidden')
    ).toHaveTextContent('name')
  })

  it('applies no-border variant', () => {
    const { container } = render(
      <SummaryList rows={defaultRows} noBorder />
    )
    expect(container.firstChild).toHaveClass(
      'govuk-summary-list--no-border'
    )
  })

  it('renders actions column when any row has actions', () => {
    const rows = [
      {
        key: 'Name',
        value: 'Sarah Philips',
        actions: [{ text: 'Change', href: '#' }]
      },
      { key: 'DOB', value: '5 Jan 1978' }
    ]
    const { container } = render(<SummaryList rows={rows} />)
    expect(
      container.querySelectorAll('.govuk-summary-list__actions')
    ).toHaveLength(2)
  })

  it('applies the correct CSS class', () => {
    const { container } = render(<SummaryList rows={defaultRows} />)
    expect(container.firstChild).toHaveClass('govuk-summary-list')
  })
})
