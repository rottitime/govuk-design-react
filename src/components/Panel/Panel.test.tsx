import { render, screen } from '@testing-library/react'
import Panel from './Panel'

const title = 'Test Title'
describe('Panel', () => {
  it('renders title correctly', () => {
    render(<Panel title={title} />)
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    const children = <div>Test Children</div>
    render(<Panel title="Test Title">{children}</Panel>)
    const childrenElement = screen.getByText('Test Children')
    expect(childrenElement).toBeInTheDocument()
  })

  it('passes additional props correctly', () => {
    const className = 'test-class'
    const { container } = render(<Panel title={title} className={className} />)
    const panelElement = container.firstChild
    expect(panelElement).toHaveClass(className)
  })
})
