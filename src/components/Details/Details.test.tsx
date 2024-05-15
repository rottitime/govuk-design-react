import { render, screen } from '@testing-library/react'
import Details from './Details'

describe('Details', () => {
  it('renders the summary and content', () => {
    render(
      <Details title="Click me">
        <p>Some content</p>
      </Details>
    )

    const summaryElement = screen.getByText('Click me')
    const contentElement = screen.getByText('Some content')

    expect(summaryElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
  })

  it('expands and collapses the content when clicked', () => {
    render(
      <Details title="Click me">
        <p>Some content</p>
      </Details>
    )

    const summaryElement = screen.getByText('Click me')
    const contentElement = screen.getByText('Some content')

    expect(contentElement).not.toBeVisible()

    summaryElement.click()

    expect(contentElement).toBeVisible()

    summaryElement.click()

    expect(contentElement).not.toBeVisible()
  })
})
