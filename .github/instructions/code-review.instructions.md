# GitHub Copilot Repository Instructions for govuk-design-react

## Context
This repository contains the `govuk-design-react` component library. Contributors are expected to follow strict standards for code quality, accessibility, testing, and documentation. Copilot should assist in generating code and suggestions that adhere to these standards.

## Code Quality
- Ensure **no linting errors**. Follow ESLint rules configured in the repository.
- Ensure **no TypeScript errors**. All type annotations should be correct and consistent.
- Write clean, readable, and maintainable code that aligns with the existing coding style.

## Testing
- All components and utilities **must be unit tested** using the testing framework configured in the repo (Vitest/Jest).
- Test coverage should be sufficient to validate core functionality, edge cases, and accessibility behavior.
- Include testing of props, events, and interactions for components.

## Documentation
- All components **must be documented in Storybook**.
- Stories should cover different component states, variations, and edge cases.
- Ensure the documentation clearly explains **props, usage, and accessibility features**.

## Exports
- Any new or updated components **must be exported** in the main library file:
  [lib/main.ts](https://github.com/rottitime/govuk-design-react/blob/main/lib/main.ts)
- Ensure proper typing is exported for each component.

## Accessibility
- All UI elements **must meet accessibility standards**, including:
  - ARIA attributes where appropriate
  - Keyboard navigation
  - Screen reader compatibility
- Follow accessibility guidelines in the GOV.UK Design System:
  [GOV.UK Design System Accessibility](https://design-system.service.gov.uk/)

## Design System Compliance
- Ensure all code changes **follow the documentation and component requirements** in the GOV.UK Design System:
  [GOV.UK Design System](https://design-system.service.gov.uk/)
- Include guidance for content, behavior, and interactions consistent with the design system.

## Copilot Behavior
- When suggesting code, prioritize:
  - Correct TypeScript types
  - Testable components
  - Storybook documentation examples
  - Accessibility best practices
  - Compliance with GOV.UK Design System standards
- Avoid suggestions that:
  - Introduce linting or TypeScript errors
  - Skip testing or documentation
  - Break accessibility or GOV.UK guidelines
