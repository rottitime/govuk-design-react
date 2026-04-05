import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterCount from './CharacterCount'

describe('CharacterCount', () => {
  it('renders label and textarea', () => {
    render(
      <CharacterCount label="Description" name="desc" maxLength={200} />
    )
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })

  it('shows remaining characters', () => {
    render(
      <CharacterCount label="Description" name="desc" maxLength={200} />
    )
    expect(
      screen.getByText('You have 200 characters remaining')
    ).toBeInTheDocument()
  })

  it('updates count on typing', async () => {
    const user = userEvent.setup()
    render(
      <CharacterCount label="Description" name="desc" maxLength={10} />
    )
    const textarea = screen.getByLabelText('Description')
    await user.type(textarea, 'hello')
    expect(
      screen.getByText('You have 5 characters remaining')
    ).toBeInTheDocument()
  })

  it('shows over-limit message when exceeding maxLength', async () => {
    const user = userEvent.setup()
    render(
      <CharacterCount label="Description" name="desc" maxLength={3} />
    )
    const textarea = screen.getByLabelText('Description')
    await user.type(textarea, 'hello')
    expect(
      screen.getByText('You have 2 characters too many')
    ).toBeInTheDocument()
  })

  it('counts words when maxWords is set', async () => {
    const user = userEvent.setup()
    render(
      <CharacterCount label="Description" name="desc" maxWords={10} />
    )
    const textarea = screen.getByLabelText('Description')
    await user.type(textarea, 'one two three')
    expect(
      screen.getByText('You have 7 words remaining')
    ).toBeInTheDocument()
  })

  it('renders hint text', () => {
    render(
      <CharacterCount
        label="Description"
        name="desc"
        maxLength={200}
        hint="Provide a brief description"
      />
    )
    expect(
      screen.getByText('Provide a brief description')
    ).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <CharacterCount
        label="Description"
        name="desc"
        maxLength={200}
        errorMessage="Description is required"
      />
    )
    expect(
      screen.getByText('Description is required')
    ).toBeInTheDocument()
  })

  it('applies govuk-character-count class', () => {
    const { container } = render(
      <CharacterCount label="Description" name="desc" maxLength={200} />
    )
    expect(container.firstChild).toHaveClass('govuk-character-count')
  })

  it('has data-module attribute', () => {
    const { container } = render(
      <CharacterCount label="Description" name="desc" maxLength={200} />
    )
    expect(container.firstChild).toHaveAttribute(
      'data-module',
      'govuk-character-count'
    )
  })

  it('handles singular character remaining', async () => {
    const user = userEvent.setup()
    render(
      <CharacterCount label="Description" name="desc" maxLength={5} />
    )
    const textarea = screen.getByLabelText('Description')
    await user.type(textarea, 'abcd')
    expect(
      screen.getByText('You have 1 character remaining')
    ).toBeInTheDocument()
  })
})
