// https://design-system.service.gov.uk/components/service-navigation/

import { useId, type ComponentProps } from 'react'

import { insertIf } from '@/utils/array.utils'

type NavigationItem = {
  text: string
  href: string
  active?: boolean
}

type Props = {
  serviceName?: string
  serviceUrl?: string
  navigationItems?: NavigationItem[]
  navigationLabel?: string
  menuButtonText?: string
} & ComponentProps<'div'>

export default function ServiceNavigation({
  serviceName,
  serviceUrl = '/',
  navigationItems,
  navigationLabel = 'Menu',
  menuButtonText = 'Menu',
  className,
  ...props
}: Props) {
  const navId = useId()

  return (
    <div
      className={[
        'govuk-service-navigation',
        ...insertIf(!!className, className)
      ].join(' ')}
      {...props}
      data-module="govuk-service-navigation"
    >
      <div className="govuk-width-container">
        <div className="govuk-service-navigation__container">
          {serviceName && (
            <span className="govuk-service-navigation__service-name">
              <a href={serviceUrl} className="govuk-service-navigation__link">
                {serviceName}
              </a>
            </span>
          )}
          {navigationItems && navigationItems.length > 0 && (
            <nav aria-label={navigationLabel} className="govuk-service-navigation__wrapper">
              <button
                type="button"
                className="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
                aria-controls={navId}
                hidden
              >
                {menuButtonText}
              </button>
              <ul className="govuk-service-navigation__list" id={navId}>
                {navigationItems.map((item) => (
                  <li
                    key={item.href}
                    className={[
                      'govuk-service-navigation__item',
                      ...insertIf(!!item.active, 'govuk-service-navigation__item--active')
                    ].join(' ')}
                  >
                    <a
                      className="govuk-service-navigation__link"
                      href={item.href}
                      {...(item.active ? { 'aria-current': 'page' as const } : {})}
                    >
                      {item.active ? (
                        <strong className="govuk-service-navigation__active-fallback">
                          {item.text}
                        </strong>
                      ) : (
                        item.text
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}
