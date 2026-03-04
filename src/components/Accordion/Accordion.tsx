// https://design-system.service.gov.uk/components/accordion/

import { type ComponentProps, type ReactNode, useId, useState } from 'react'

import { insertIf } from '@/utils/array.utils'

type AccordionSection = {
  heading: string
  summary?: string
  content: ReactNode
  expanded?: boolean
}

type Props = {
  sections: AccordionSection[]
  showAllText?: string
  hideAllText?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
} & Omit<ComponentProps<'div'>, 'children'>

export default function Accordion({
  sections,
  showAllText = 'Show all sections',
  hideAllText = 'Hide all sections',
  headingLevel = 2,
  className,
  id: providedId,
  ...props
}: Props) {
  const autoId = useId()
  const id = providedId ?? autoId

  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const initial = new Set<number>()
    sections.forEach((section, index) => {
      if (section.expanded) initial.add(index)
    })
    return initial
  })

  const allExpanded = sections.length > 0 && expandedSections.size === sections.length

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSections(new Set())
    } else {
      setExpandedSections(new Set(sections.map((_, i) => i)))
    }
  }

  const HeadingTag = `h${headingLevel}` as const

  return (
    <div
      className={[
        'govuk-accordion',
        ...insertIf(!!className, className as string)
      ].join(' ')}
      data-module="govuk-accordion"
      id={id}
      {...props}
    >
      <div className="govuk-accordion__controls">
        <button
          type="button"
          className="govuk-accordion__show-all"
          aria-expanded={allExpanded}
          onClick={toggleAll}
        >
          <span className="govuk-accordion__show-all-text">
            {allExpanded ? hideAllText : showAllText}
          </span>
        </button>
      </div>
      {sections.map((section, index) => {
        const sectionId = `${id}-section-${index}`
        const isExpanded = expandedSections.has(index)

        return (
          <div
            key={sectionId}
            className={[
              'govuk-accordion__section',
              ...insertIf(isExpanded, 'govuk-accordion__section--expanded')
            ].join(' ')}
          >
            <div className="govuk-accordion__section-header">
              <HeadingTag className="govuk-accordion__section-heading">
                <button
                  type="button"
                  className="govuk-accordion__section-button"
                  aria-controls={`${sectionId}-content`}
                  aria-expanded={isExpanded}
                  id={`${sectionId}-heading`}
                  onClick={() => toggleSection(index)}
                >
                  <span className="govuk-accordion__section-heading-text">
                    <span className="govuk-accordion__section-heading-text-focus">
                      {section.heading}
                    </span>
                  </span>
                  <span className="govuk-visually-hidden govuk-accordion__section-heading-divider">
                    ,{' '}
                  </span>
                  <span className="govuk-accordion__section-toggle">
                    <span className="govuk-accordion__section-toggle-focus">
                      <span className="govuk-accordion__section-toggle-text">
                        {isExpanded ? 'Hide' : 'Show'}
                      </span>
                    </span>
                  </span>
                </button>
              </HeadingTag>
              {section.summary && (
                <div className="govuk-accordion__section-summary govuk-body">
                  {section.summary}
                </div>
              )}
            </div>
            <div
              id={`${sectionId}-content`}
              className="govuk-accordion__section-content"
              role="region"
              aria-labelledby={`${sectionId}-heading`}
              hidden={!isExpanded}
            >
              {section.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
