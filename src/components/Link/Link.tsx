// https://design-system.service.gov.uk/styles/links/

import { isExternalUrl } from '@/utils/string.utils'
import type { ComponentProps } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type Anchor = ComponentProps<'a'>
type Props = Anchor & { href: string; button?: boolean }

export default function Link({ button, children, ...props }: Props) {
  const { href } = props
  const classes = [button ? 'govuk-button' : 'govuk-link'].join('')
  const linkProps: Anchor = {
    className: classes,
    role: button ? 'button' : undefined,
    ...props
  }
  return isExternalUrl(href) ? (
    <a rel="noopener noreferrer" {...linkProps}>
      {children}
    </a>
  ) : (
    <RouterLink {...linkProps} to={href}>
      {children}
    </RouterLink>
  )
}
