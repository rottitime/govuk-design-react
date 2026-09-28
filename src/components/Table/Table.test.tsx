import { render, screen } from '@testing-library/react'
import Table from './Table'

const defaultRows = [
  [{ text: 'January' }, { text: '£85' }, { text: '£95' }],
  [{ text: 'February' }, { text: '£75' }, { text: '£55' }]
]

const defaultHead = [
  { text: 'Month' },
  { text: 'Rate for bicycles' },
  { text: 'Rate for vehicles' }
]

describe('Table', () => {
  it('renders a table with rows', () => {
    render(<Table rows={defaultRows} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })

  it('renders table headers', () => {
    render(<Table head={defaultHead} rows={defaultRows} />)
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    expect(screen.getByText('Month')).toBeInTheDocument()
  })

  it('renders caption', () => {
    render(
      <Table caption="Dates and amounts" head={defaultHead} rows={defaultRows} />
    )
    expect(screen.getByText('Dates and amounts')).toBeInTheDocument()
  })

  it('applies caption size', () => {
    const { container } = render(
      <Table
        caption="Caption"
        captionSize="l"
        head={defaultHead}
        rows={defaultRows}
      />
    )
    expect(container.querySelector('caption')).toHaveClass(
      'govuk-table__caption--l'
    )
  })

  it('renders first cell as row header when firstCellIsHeader is true', () => {
    render(
      <Table head={defaultHead} rows={defaultRows} firstCellIsHeader />
    )
    expect(screen.getByText('January')).toHaveAttribute('scope', 'row')
    expect(screen.getByText('February')).toHaveAttribute('scope', 'row')
  })

  it('renders numeric format cells', () => {
    const rows = [
      [
        { text: 'January' },
        { text: '£85', format: 'numeric' as const }
      ]
    ]
    const { container } = render(<Table rows={rows} />)
    expect(
      container.querySelector('.govuk-table__cell--numeric')
    ).toBeInTheDocument()
  })

  it('renders numeric format headers', () => {
    const head = [
      { text: 'Month' },
      { text: 'Amount', format: 'numeric' as const }
    ]
    const { container } = render(<Table head={head} rows={defaultRows} />)
    expect(
      container.querySelector('.govuk-table__header--numeric')
    ).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    render(<Table rows={defaultRows} />)
    expect(screen.getByRole('table')).toHaveClass('govuk-table')
  })
})
