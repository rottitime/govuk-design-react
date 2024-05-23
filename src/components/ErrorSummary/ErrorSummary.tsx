import { useEffect, useRef } from 'react'

type Props = {
  title?: string
  errors: {
    href: string
    text: string
  }[]
}

export default function ErrorSummary({ title = 'There is a problem', errors }: Props) {
  const divRef = useRef<HTMLDivElement>(null)

  //useffect to focus on first render
  useEffect(() => {
    if (errors.length) divRef.current?.focus()
  }, [errors.length])

  return (
    <div
      className="govuk-error-summary"
      data-module="govuk-error-summary"
      tabIndex={-1}
      ref={divRef}
    >
      <div role="alert">
        <h2 className="govuk-error-summary__title">{title}</h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            {errors.map(({ href, text }) => (
              <li key={href}>
                <a href={href}>{text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
