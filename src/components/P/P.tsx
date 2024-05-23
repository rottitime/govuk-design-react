// https://design-system.service.gov.uk/styles/paragraphs/
import type { ComponentProps } from 'react'

type Props = {
  type?: keyof typeof types
} & ComponentProps<'p'>

const types = {
  small: 's',
  lead: 'l'
}

export default function P({ type, ...props }: Props) {
  const typeSuffix = !!type && type in types && types[type]
  return <p className={`govuk-body${typeSuffix ? `-${typeSuffix}` : ''}`} {...props} />
}
