<p align="center">
  <a href="https://github.com/rottitime/govuk-design-react">
    <img src="https://rottitime.github.io/govuk-design-react/doc/logo2.webp" alt="GOV.UK Design System for React" width="400" />
  </a>
</p>

# React Govuk Design System

> React components and templates for the [GOV.UK Design System](https://design-system.service.gov.uk/) — TypeScript, accessible, and ready for UK government services.

[![npm version](https://img.shields.io/npm/v/@rottitime/govuk-design-react.svg)](https://www.npmjs.com/package/@rottitime/govuk-design-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20demo-ff4785?logo=storybook)](https://rottitime.github.io/govuk-design-react/)

**🙌 [We're looking for volunteer contributors](VOLUNTEERS.md)** — help us grow this library. All levels welcome.

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Benefits](#benefits)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Volunteer with us](#volunteer-with-us)
- [Releasing and deployment](#releasing-and-deployment)
- [License](#license)
- [Related Links](#related-links)

## Introduction

**@rottitime/govuk-design-react** gives you pre-built, accessible React components based on the official [GOV.UK Design System](https://design-system.service.gov.uk/). Use it to build services that meet UK government design and accessibility standards without building everything from scratch.

## Demo

**[Open Storybook →](https://rottitime.github.io/govuk-design-react/)** — live examples and docs for every component.

## Benefits

By using GovUK Design React, you'll enjoy:

- 💡 **Proven Design**: Powered by [GovUK Design System](https://design-system.service.gov.uk/), which goes through user testing, has the best accessibility, and is fully responsive.
- ⏱️ **Time Savings**: No need to create components from scratch—get up and running quickly with pre-built components.
- ♿ **Accessibility**: Components are designed to meet the highest accessibility standards, ensuring your application is usable by everyone.
- 🎨 **Consistency**: Maintain design consistency with the UK Government Design System across all your projects.
- 🛠️ **Customization**: Easily customize components to fit your specific needs without compromising on design standards.
- ✅ **Testing and Linting**: Built-in unit tests and linting ensure code quality and reliability.
- 📚 **Live Documentation**: Interactive [storybook documentation](https://rottitime.github.io/govuk-design-react/?path=/story/details--primary) lets you see components in action and experiment with different configurations.

## Getting Started

Ready to dive in? Here's a quick guide to get you up and running with GovUK Design React.

### Requirements

- **govuk-frontend** — This library uses the official GOV.UK Frontend styles and is tested with **govuk-frontend v6.x** (peer dependency `^6.1.0`). Install it in your project so components render with the correct GOV.UK look and feel.

### Installation

Install the library and its peer dependency via npm or yarn:

```bash
npm install @rottitime/govuk-design-react govuk-frontend
```

### Usage

Using GovUK Design React is as simple as importing the components you need and integrating them into your React application:

```jsx
import React from 'react'
import { Button } from '@rottitime/govuk-design-react'

const App = () => (
  <div>
    <h1>Hello, GovUK Design React!</h1>
    <Button>Click me</Button>
  </div>
)

export default App
```

See the [Storybook documentation](https://rottitime.github.io/govuk-design-react/) for live examples and guides for each component.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please check out our [contributing guidelines](https://github.com/rottitime/govuk-design-react/blob/main/CONTRIBUTING.md) for more information on how to get started.

## Volunteer with us

We're actively looking for **volunteer contributors** to help build components, improve docs, fix bugs, and boost accessibility. Whether you're experienced or learning — [see how you can help →](VOLUNTEERS.md)

## Releasing and deployment

For versioning, publishing to npm, and Storybook deployment, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

## License

MIT — see [LICENSE](https://github.com/rottitime/govuk-design-react/blob/main/LICENSE).

---

## Related Links

- [GOV.UK Design System](https://design-system.service.gov.uk/) — official UK Government Design System
- [Storybook](https://rottitime.github.io/govuk-design-react/) — component demos and docs
- [npm package](https://www.npmjs.com/package/@rottitime/govuk-design-react)
- [Contributing](https://github.com/rottitime/govuk-design-react/blob/main/CONTRIBUTING.md)
- [Volunteers](VOLUNTEERS.md) — join as a volunteer contributor
- [Deployment](DEPLOYMENT.md) — versioning, npm publish, Storybook
- [Terms for non-GOV.UK sites](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk#if-your-service-isnt-on-govuk)

Questions or bugs? [Open an issue](https://github.com/rottitime/govuk-design-react/issues).
