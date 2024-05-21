import { forwardRef, type HTMLProps } from 'react'

type Props = HTMLProps<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ children, ...props }, ref) => (
  <textarea {...props} ref={ref} className="govuk-textarea">
    {children}
  </textarea>
))

export default Textarea
