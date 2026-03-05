// https://design-system.service.gov.uk/components/notification-banner/

import { useId, type ComponentProps, type ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type Props = {
  children: ReactNode
  title?: string
  type?: 'success'
  role?: string
} & Omit<ComponentProps<'div'>, 'role'>

export default function NotificationBanner({
  children,
  title = 'Important',
  type,
  role,
  className,
  ...props
}: Props) {
  const isSuccess = type === 'success'
  const titleId = useId()

  return (
    <div
      className={[
        'govuk-notification-banner',
        ...insertIf(isSuccess, 'govuk-notification-banner--success'),
        ...insertIf(!!className, className)
      ].join(' ')}
      {...props}
      role={role || (isSuccess ? 'alert' : 'region')}
      aria-labelledby={titleId}
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2
          className="govuk-notification-banner__title"
          id={titleId}
        >
          {isSuccess ? 'Success' : title}
        </h2>
      </div>
      <div className="govuk-notification-banner__content">{children}</div>
    </div>
  )
}
