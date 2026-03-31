import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'

const defaultItems = [
  {
    title: 'Company directors',
    href: '#',
    status: { text: 'Completed' }
  },
  {
    title: 'Registered office address',
    href: '#',
    hint: 'Include your full address',
    status: { text: 'Incomplete', tagColour: 'blue' as const }
  },
  {
    title: 'Submit application',
    status: { text: 'Cannot start yet', tagColour: 'grey' as const }
  }
]

describe('TaskList', () => {
  it('renders all task items', () => {
    render(<TaskList items={defaultItems} />)
    expect(screen.getByText('Company directors')).toBeInTheDocument()
    expect(screen.getByText('Registered office address')).toBeInTheDocument()
    expect(screen.getByText('Submit application')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    render(<TaskList items={defaultItems} />)
    expect(
      screen.getByRole('link', { name: /Company directors/ })
    ).toBeInTheDocument()
  })

  it('renders status text', () => {
    render(<TaskList items={defaultItems} />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Incomplete')).toBeInTheDocument()
  })

  it('renders status with tag colour', () => {
    const { container } = render(<TaskList items={defaultItems} />)
    expect(container.querySelector('.govuk-tag--blue')).toHaveTextContent(
      'Incomplete'
    )
  })

  it('renders hint text', () => {
    render(<TaskList items={defaultItems} />)
    expect(
      screen.getByText('Include your full address')
    ).toBeInTheDocument()
  })

  it('renders items without href as plain text', () => {
    render(<TaskList items={defaultItems} />)
    expect(screen.getByText('Submit application')).not.toHaveAttribute('href')
  })

  it('applies the correct CSS class', () => {
    const { container } = render(<TaskList items={defaultItems} />)
    expect(container.firstChild).toHaveClass('govuk-task-list')
  })
})
