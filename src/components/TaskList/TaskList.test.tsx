import { render, screen } from '@testing-library/react'
import TaskList, { type TaskItem } from './TaskList'

const defaultItems = [
  {
    title: 'Company directors',
    href: '#company-directors',
    status: { text: 'Completed' }
  },
  {
    id: 'registered-office-address',
    title: 'Registered office address',
    href: '#registered-office-address',
    hint: 'Include your full address',
    status: { text: 'Incomplete', tagColour: 'blue' as const }
  },
  {
    id: 'submit-application',
    title: 'Submit application',
    description: 'You cannot submit until every section is complete',
    status: { text: 'Cannot start yet', tagColour: 'grey' as const }
  }
] satisfies TaskItem[]

describe('TaskList', () => {
  it('renders all task items', () => {
    render(<TaskList items={defaultItems} />)
    expect(screen.getByText('Company directors')).toBeInTheDocument()
    expect(screen.getByText('Registered office address')).toBeInTheDocument()
    expect(screen.getByText('Submit application')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    render(<TaskList items={defaultItems} />)
    expect(screen.getByRole('link', { name: /Company directors/ })).toHaveAttribute(
      'href',
      '#company-directors'
    )
  })

  it('renders status text', () => {
    render(<TaskList items={defaultItems} />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Incomplete')).toBeInTheDocument()
  })

  it('renders status using the Tag component colour class', () => {
    const { container } = render(<TaskList items={defaultItems} />)
    expect(container.querySelector('.govuk-tag--blue')).toHaveTextContent('Incomplete')
  })

  it('renders hint and description text', () => {
    render(<TaskList items={defaultItems} />)
    expect(screen.getByText('Include your full address')).toHaveClass(
      'govuk-task-list__hint'
    )
    expect(
      screen.getByText('You cannot submit until every section is complete')
    ).toHaveClass('govuk-task-list__hint')
  })

  it('renders items without href as plain text without a link modifier', () => {
    const { container } = render(<TaskList items={defaultItems} />)
    expect(screen.getByText('Submit application').closest('a')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.govuk-task-list__item').item(2)).not.toHaveClass(
      'govuk-task-list__item--with-link'
    )
  })

  it('uses stable href or id values for keys so reordered lists keep item nodes', () => {
    const { rerender } = render(<TaskList items={defaultItems} />)
    const submitItem = screen.getByText('Submit application').closest('li')

    rerender(<TaskList items={[defaultItems[2]!, defaultItems[0]!, defaultItems[1]!]} />)

    expect(screen.getByText('Submit application').closest('li')).toBe(submitItem)
  })

  it('generates unique described-by ids for multiple task lists', () => {
    render(
      <>
        <TaskList items={defaultItems} />
        <TaskList items={defaultItems} />
      </>
    )

    const links = screen.getAllByRole('link', { name: /Registered office address/ })
    const firstLink = links[0]!
    const secondLink = links[1]!
    expect(firstLink.getAttribute('aria-describedby')).not.toBe(
      secondLink.getAttribute('aria-describedby')
    )
  })

  it('applies the correct CSS class and custom class', () => {
    const { container } = render(
      <TaskList items={defaultItems} className="custom-task-list" />
    )
    expect(container.firstChild).toHaveClass('govuk-task-list', 'custom-task-list')
  })
})
