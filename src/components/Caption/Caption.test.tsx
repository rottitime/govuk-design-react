import { render, screen } from '@testing-library/react'
import Caption from '@/components/Caption/Caption'
import type { ComponentProps } from 'react'

const text = 'Test Caption'
describe('Caption', () => {
  it('renders with default size', () => {
    render(<Caption>{text}</Caption>)
    expect(screen.getByText(text)).toHaveClass('govuk-caption-m')
  })

  it.each<[ComponentProps<typeof Caption>['size'], string]>([
    ['large', 'l'],
    ['extra-large', 'xl']
  ])('renders with %s size', (size, expected) => {
    render(<Caption size={size}>{text}</Caption>)
    expect(screen.getByText(text)).toHaveClass(`govuk-caption-${expected}`)
  })
})
