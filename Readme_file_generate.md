# Project README

This document provides a quick starting point for new developers.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (bundled with Node) or yarn
- A compatible shell (bash, WSL on Windows, Powershell)

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd "Starter code"
   ```
2. Install dependencies:
   ```sh
   npm install
   # or yarn install
   ```
3. (Optional) If using Nx Cloud, configure with `npx nx connect`.

### Setup & Configuration

- Environment variables: copy `.env.example` to `.env` and fill values if present (not included in this repo by default).
- Ensure you have access to any internal package registries if used for `packages/*`.

## 🛠️ Technology Stack

| Area               | Technology                           | Version / Notes                  |
| ------------------ | ------------------------------------ | -------------------------------- |
| Runtime            | Node.js                              | 18.x+                            |
| Language           | TypeScript                           | ^5.0                             |
| Monorepo & tooling | [Nx](https://nx.dev)                 | v\* (see package.json)           |
| Bundler            | [Rspack](https://rspack.dev)         | configured per app               |
| Module Federation  | Webpack Module Federation via rspack | micro-frontend support           |
| Testing            | Jest                                 | configured with `jest.config.ts` |
| Linting            | ESLint                               | config under each project        |
| Package manager    | npm / yarn                           | depends on developer preference  |

## 📁 Project Structure

This is an Nx monorepo with the following high‑level layout:

```
/apps
  dashboard/      # Dashboard application
  host/           # Host application
  intelligence/   # Intelligence application
  output/         # Output application
  planning/       # Planning application
/packages
  config/         # Shared configuration code
  shared-types/   # Shared TypeScript types
  shared-ui/      # Reusable React components and styles
  shared-utils/   # Utility functions and helpers
eslint.config.mjs
package.json
nx.json
... (other config files)
```

> See `Architecture.md` for more details about the architecture and dependency graph.

## 🛠 Developer Setup

### Running the development environment

Most operations are run through Nx commands. In a project root or workspace, use:

```sh
# build a specific app
npx nx build dashboard

# serve an app in dev mode (if configured with a dev server)
npx nx serve dashboard

# run tests for a project
npx nx test shared-utils

# lint a project
npx nx lint host
```

### Common tasks

- To list all available projects and targets: `npx nx show projects` or open `nx.json`.
- To generate new code: `npx nx g <plugin>:<generator> <options>` (e.g. `@nx/react:app`).
- Visualize the workspace graph: `npx nx graph` (opens in the browser).

### Development Workflow

1. Checkout a feature branch.
2. Run `npm install` if dependencies changed.
3. Execute `npx nx affected:lint`, `affected:test`, and `affected:build` for CI-style checks.
4. Commit and push changes; create a pull request.

## 📎 Additional Resources

- [Nx docs](https://nx.dev)
- [Architecture.md](./Architecture.md)

---

_This README was generated automatically to provide a baseline. Feel free to expand sections with project-specific instructions as needed._
