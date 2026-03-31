import { render, screen } from '@testing-library/react'
import Pagination from './Pagination'
import type { PaginationItem } from './Pagination'

const items: PaginationItem[] = [
  { type: 'page', number: 1, href: '/page/1' },
  { type: 'page', number: 2, href: '/page/2', current: true },
  { type: 'page', number: 3, href: '/page/3' }
]

describe('Pagination', () => {
  it('renders a navigation landmark', () => {
    render(<Pagination items={items} />)
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Pagination'
    )
  })

  it('renders page items', () => {
    render(<Pagination items={items} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('marks current page with aria-current', () => {
    render(<Pagination items={items} />)
    expect(screen.getByText('2').closest('a')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('renders previous link', () => {
    render(<Pagination items={items} previous={{ href: '/page/1' }} />)
    const prev = screen.getByText('Previous').closest('a')
    expect(prev).toHaveAttribute('href', '/page/1')
    expect(prev).toHaveAttribute('rel', 'prev')
  })

  it('renders next link', () => {
    render(<Pagination items={items} next={{ href: '/page/3' }} />)
    const next = screen.getByText('Next').closest('a')
    expect(next).toHaveAttribute('href', '/page/3')
    expect(next).toHaveAttribute('rel', 'next')
  })

  it('renders previous with label text', () => {
    render(
      <Pagination
        previous={{ href: '/page/1', labelText: 'Applying for a licence' }}
      />
    )
    expect(
      screen.getByText('Applying for a licence')
    ).toBeInTheDocument()
  })

  it('renders ellipsis items', () => {
    const itemsWithEllipsis: PaginationItem[] = [
      { type: 'page', number: 1, href: '/1' },
      { type: 'ellipsis' },
      { type: 'page', number: 5, href: '/5', current: true }
    ]
    render(<Pagination items={itemsWithEllipsis} />)
    expect(screen.getByText('⋯')).toBeInTheDocument()
  })

  it('applies the correct CSS class', () => {
    const { container } = render(<Pagination items={items} />)
    expect(container.firstChild).toHaveClass('govuk-pagination')
  })
})
