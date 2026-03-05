// https://design-system.service.gov.uk/components/header/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type NavigationItem = {
  text: string
  href: string
  active?: boolean
}

type Props = {
  homepageUrl?: string
  serviceName?: string
  serviceUrl?: string
  navigationItems?: NavigationItem[]
  navigationLabel?: string
  menuButtonText?: string
  productName?: string
  children?: ReactNode
} & ComponentProps<'header'>

export default function Header({
  homepageUrl = '/',
  serviceName,
  serviceUrl = '/',
  navigationItems,
  navigationLabel = 'Menu',
  menuButtonText = 'Menu',
  productName,
  className,
  ...props
}: Props) {
  return (
    <header
      className={[
        'govuk-header',
        ...insertIf(!!className, className as string)
      ].join(' ')}
      data-module="govuk-header"
      role="banner"
      {...props}
    >
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <a
            href={homepageUrl}
            className="govuk-header__link govuk-header__link--homepage"
          >
            <span className="govuk-header__logotype">
              <svg
                aria-hidden="true"
                focusable="false"
                className="govuk-header__logotype-crown"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 30"
                height="30"
                width="32"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M16.658 0S8.188 2.485 8.188 14.55c0 3.17.362 5.09.362 5.09l-5.012-.088s.634-3.17.634-5.002C4.172 2.573 13.049 0 16.658 0ZM4.535 24.083l-.362 3.257H28.12l-.362-3.257H4.535Z"
                />
              </svg>
              <span className="govuk-header__logotype-text"> GOV.UK</span>
            </span>
            {productName && (
              <span className="govuk-header__product-name">
                {productName}
              </span>
            )}
          </a>
        </div>
        {(serviceName || navigationItems) && (
          <div className="govuk-header__content">
            {serviceName && (
              <a href={serviceUrl} className="govuk-header__link govuk-header__service-name">
                {serviceName}
              </a>
            )}
            {navigationItems && navigationItems.length > 0 && (
              <nav aria-label={navigationLabel} className="govuk-header__navigation">
                <button
                  type="button"
                  className="govuk-header__menu-button govuk-js-header-toggle"
                  aria-controls="navigation"
                  aria-label={`Show or hide ${navigationLabel}`}
                  hidden
                >
                  {menuButtonText}
                </button>
                <ul id="navigation" className="govuk-header__navigation-list">
                  {navigationItems.map((item) => (
                    <li
                      key={item.href}
                      className={[
                        'govuk-header__navigation-item',
                        ...insertIf(!!item.active, 'govuk-header__navigation-item--active')
                      ].join(' ')}
                    >
                      <a className="govuk-header__link" href={item.href}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
