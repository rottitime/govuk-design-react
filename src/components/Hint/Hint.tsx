import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export default function Hint(props: Props) {
  return <div {...props} className={`govuk-hint ${props.className || ''}`.trim()} />
}
