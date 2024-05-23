import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FileUpload from './FileUpload'

const label = 'Upload a file'

describe('FileUpload', () => {
  it('renders the file upload input', () => {
    render(<FileUpload label={label} />)
    const input = screen.getByLabelText(label)
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('govuk-file-upload')
  })

  it('renders without errors', () => {
    const error = 'The CSV must be smaller than 2MB'
    render(<FileUpload label={label} error={error} />)
    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('displays the label correctly', () => {
    render(<FileUpload label={label} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('displays the error message correctly', () => {
    const error = 'File size exceeds the limit'
    render(<FileUpload label={label} error={error} />)
    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('calls the onChange event handler when a file is selected', async () => {
    const mockOnChange = vi.fn()
    render(<FileUpload onChange={mockOnChange} label={label} />)
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' })
    const input = screen.getByLabelText<HTMLInputElement>(label)
    await userEvent.upload(input, file)

    const inputFiles = input.files!
    expect(inputFiles[0]).toBe(file)
    expect(inputFiles.item(0)).toBe(file)
    expect(inputFiles).toHaveLength(1)
  })
})
