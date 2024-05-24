import { render } from '@testing-library/react'
import Tag from './Tag'
import { tagColors } from '@/const'

const text = 'Hello world!'

describe('Tag', () => {
  it('renders without crashing', () => {
    render(<Tag>{text}</Tag>)
  })

  it('renders with the specified color', () => {
    const colors = Object.keys(tagColors) as Array<keyof typeof tagColors>
    colors.forEach((color) => {
      const { container } = render(<Tag color={color}>{text}</Tag>)

      expect(container.firstChild as HTMLElement).toHaveClass(`govuk-tag--${color}`)
    })
  })

  it.each(Object.keys(tagColors))(
    'renders with the correct class name for color %s',
    (color) => {
      const { container } = render(
        <Tag color={color as keyof typeof tagColors}>{text}</Tag>
      )

      expect(container.firstChild as HTMLElement).toHaveAttribute(
        'class',
        `govuk-tag govuk-tag--${color}`
      )
    }
  )

  it('renders with additional props', () => {
    const { container } = render(
      <Tag color="blue" id="tag-id">
        {text}
      </Tag>
    )
    const tagElement = container.firstChild as HTMLElement
    expect(tagElement).toHaveAttribute('id', 'tag-id')
  })

  it('renders with capitalized text when capitalise prop is true', () => {
    const { container } = render(<Tag capitalise={true}>{text.toLowerCase()}</Tag>)
    expect(container.firstChild).toHaveTextContent('Hello world!')
  })
})
