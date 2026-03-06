import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Accordion from './Accordion'

const defaultSections = [
  { heading: 'Section 1', content: <p>Content 1</p> },
  { heading: 'Section 2', content: <p>Content 2</p> },
  { heading: 'Section 3', content: <p>Content 3</p> }
]

describe('Accordion', () => {
  it('renders all section headings', () => {
    render(<Accordion sections={defaultSections} />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  it('sections are collapsed by default', () => {
    render(<Accordion sections={defaultSections} />)
    const buttons = screen.getAllByRole('button', { expanded: false })
    // 3 section buttons + 1 "show all" button = 4
    expect(buttons.length).toBe(4)
  })

  it('expands a section on click', async () => {
    const user = userEvent.setup()
    render(<Accordion sections={defaultSections} />)
    const btn = screen.getByRole('button', { name: /Section 1/ })
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses an expanded section on click', async () => {
    const user = userEvent.setup()
    render(
      <Accordion
        sections={[
          { heading: 'Section 1', content: <p>Content 1</p>, expanded: true }
        ]}
      />
    )
    const btn = screen.getByRole('button', { name: /Section 1/ })
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('show all button expands all sections', async () => {
    const user = userEvent.setup()
    render(<Accordion sections={defaultSections} />)
    const showAllBtn = screen.getByText('Show all sections')
    await user.click(showAllBtn)
    const expandedButtons = screen.getAllByRole('button', { expanded: true })
    // 3 section buttons + 1 "hide all" button
    expect(expandedButtons.length).toBe(4)
  })

  it('renders summary text when provided', () => {
    render(
      <Accordion
        sections={[
          {
            heading: 'Section 1',
            summary: 'Additional info',
            content: <p>Content</p>
          }
        ]}
      />
    )
    expect(screen.getByText('Additional info')).toBeInTheDocument()
  })

  it('applies govuk-accordion class', () => {
    const { container } = render(<Accordion sections={defaultSections} />)
    expect(container.firstChild).toHaveClass('govuk-accordion')
  })

  it('has data-module attribute', () => {
    const { container } = render(<Accordion sections={defaultSections} />)
    expect(container.firstChild).toHaveAttribute(
      'data-module',
      'govuk-accordion'
    )
  })

  it('renders content in region with aria-labelledby', () => {
    render(
      <Accordion
        sections={[
          { heading: 'Section 1', content: <p>Content 1</p>, expanded: true }
        ]}
      />
    )
    const region = screen.getByRole('region')
    expect(region).toHaveAttribute('aria-labelledby')
  })
})
