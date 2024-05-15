import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('renders App component', () => {
  render(<App />)

  // Assert that the React logo is rendered
  const reactLogo = screen.getByAltText('React logo')
  expect(reactLogo).toBeInTheDocument()

  // Assert that the count is initially 0
  const countText = screen.getByText(/count is 0/i)
  expect(countText).toBeInTheDocument()

  // Assert that the "Edit src/App.tsx" text is rendered
  const editText = screen.getByText('src/App.tsx')
  expect(editText).toBeInTheDocument()
})

test('increments count when button is clicked', () => {
  render(<App />)

  // Find the button and click it
  const button = screen.getByText(/count is 0/i).closest('button')
  fireEvent.click(button!)

  // Assert that the count is incremented to 1
  const countText = screen.getByText(/count is 1/i)
  expect(countText).toBeInTheDocument()
})
