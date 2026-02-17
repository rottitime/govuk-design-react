# Deployment and releasing

This document describes how to version, release, and deploy this project. It covers GitHub Actions workflows, Changesets, publishing to npm, and Storybook deployment.

## Overview

| What              | How                                                                 |
|-------------------|---------------------------------------------------------------------|
| **Versioning**    | [Changesets](https://github.com/changesets/changesets)              |
| **npm publish**   | Publish workflow (after CI on `main` + "Version Packages" PR merge) |
| **Storybook**     | Deploy workflow → GitHub Pages                                      |
| **Visual checks** | Chromatic workflow (every push)                                     |

## Workflows (`.github/workflows/`)

| Workflow   | File                        | Trigger                          | Purpose                                                |
|-----------|-----------------------------|-----------------------------------|--------------------------------------------------------|
| **CI**    | `lint.yaml`                 | Push to any branch                | Runs `npm run test:all` (lint, tests, build).          |
| **Publish** | `publish.yaml`            | After CI **succeeds** on **main** | Creates "Version Packages" PR or runs npm publish.     |
| **Storybook** | `deploy-github-pages.yaml` | Push to **main** (path-filtered)  | Builds Storybook and deploys to GitHub Pages.          |
| **Chromatic** | `chromatic.yml`           | Every push                        | Visual regression (needs `CHROMATIC_PROJECT_TOKEN`).    |

## How to version and release (when you make a change)

1. **Make your changes** on a feature branch.

2. **Add a changeset** so the release is versioned and documented:
   ```bash
   npm run changeset
   ```
   You will be prompted for:
   - **Version bump**: `patch` | `minor` | `major` (or "none" for docs-only).
   - **Summary**: Short description for the changelog.

3. **Commit** your code **and** the new file under `.changeset/*.md`.

4. **Push** and open a **pull request** into `main`.

5. **Merge** the PR into `main`.

After the merge:

- **CI** runs on `main`. When it succeeds, the **Publish** workflow runs.
- The [changesets/action](https://github.com/changesets/action) will:
  - **If there are unreleased changesets**: open a **"Version Packages"** PR that bumps `package.json` and updates the changelog.
  - **After that "Version Packages" PR is merged**: on the next run it executes `npm run release` and **publishes to the npm registry**.

So: you add changesets and merge your feature PR; the action creates the version-bump PR; merging that PR triggers the actual npm publish.

## Publishing to the npm registry

- **Workflow**: `.github/workflows/publish.yaml` (runs after successful CI on `main`).
- **Command**: The action runs `npm run release`, which runs `npm run test:all && changeset publish`.
- **Secrets**: Configure **`NPM_TOKEN`** in the repository (Settings → Secrets and variables → Actions) with an npm token that has publish access for `@rottitime/govuk-design-react`.
- **Access**: The package is published as **public** (`publishConfig.access` in `package.json` and `access` in `.changeset/config.json`).

## Storybook deployment (GitHub Pages)

- **Workflow**: `.github/workflows/deploy-github-pages.yaml` (name: "Storybook").
- **When**: Runs on **push to `main`** only when these paths change:
  - `src/**/*.tsx`, `src/**/*.ts`, `src/**/*.css`
  - `public/**`
  - `.storybook/*.js`
  - `src/stories/**`
- **What it does**: Runs `npm ci` and `npm run storybook:build`, then deploys the `storybook-static` folder to GitHub Pages.
- **URL**: The live Storybook is at the repo's GitHub Pages URL (e.g. `https://rottitime.github.io/govuk-design-react/`).

Chromatic runs on every push for visual testing; it does not replace the GitHub Pages Storybook deploy.

## Quick checklist

1. Make changes on a branch.
2. Run `npm run changeset`; choose bump type and add a summary.
3. Commit code and `.changeset/*.md`; push and open a PR to `main`.
4. Merge the PR → CI runs; Publish workflow may open a "Version Packages" PR.
5. Merge the "Version Packages" PR → next Publish run publishes to **npm**.
6. Pushes to `main` that touch the paths above trigger the **Storybook** workflow and update **GitHub Pages**.

## Changeset configuration

- **Config**: `.changeset/config.json`
- **Base branch**: `main`
- **Changelog**: Uses `@changesets/cli/changelog`
- **Commit**: `false` (changesets are not auto-committed)
- **Access**: `public`

For more on Changesets, see the [Changesets documentation](https://github.com/changesets/changesets) and [common questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md).
