# Monorepo Build & Architecture Deep Dive

A comprehensive technical guide to understanding the PnSRM US Monorepo architecture, build system, and workflow.

---

## Table of Contents

1. [Overview](#overview)
2. [Repo Structure](#repo-structure)
3. [Nx & Build System](#nx--build-system)
4. [Module Federation Architecture](#module-federation-architecture)
5. [Shared Libraries & Packages](#shared-libraries--packages)
6. [What Happens When You Run `yarn nx serve host`](#what-happens-when-you-run-yarn-nx-serve-host)
7. [Project.json Deep Dive](#projectjson-deep-dive)
8. [TypeScript Path Aliases](#typescript-path-aliases)
9. [Building & Deployment](#building--deployment)
10. [Development Workflow](#development-workflow)

---

## Overview

This is an **Nx-based monorepo** with a **micro-frontend architecture** using **Module Federation**. Instead of a traditional single bundle, the system breaks into:

- **Host App** (`apps/host`): The main shell that loads and coordinates other apps
- **Remote Apps** (`apps/dashboard`, `apps/intelligence`, `apps/planning`, `apps/output`): Independent applications loaded dynamically at runtime
- **Shared Libraries** (`packages/shared-ui`, `packages/shared-types`, `packages/shared-utils`, `packages/config`): Code reused across all apps

All of this is orchestrated by **Nx**, which handles tasks (build, serve, test, lint), caching, and dependency tracking.

---

## Repo Structure

```
/
├─ apps/                      # Deployable applications
│  ├─ host/                   # Main shell app (micro-frontend container)
│  ├─ dashboard/              # Remote micro-frontend #1
│  ├─ intelligence/           # Remote micro-frontend #2
│  ├─ planning/               # Remote micro-frontend #3
│  └─ output/                 # Remote micro-frontend #4
│
├─ packages/                  # Shared libraries (internal npm packages)
│  ├─ shared-ui/              # React components (Dropdown, FilterWidget, etc.)
│  ├─ shared-types/           # TypeScript type definitions
│  ├─ shared-utils/           # Utility functions
│  └─ config/                 # Shared configuration
│
├─ nx.json                    # Nx workspace config (plugins, settings)
├─ package.json               # Root dependencies & workspace config
├─ tsconfig.base.json         # Base TypeScript config with path aliases
├─ jest.config.ts            # Jest config for testing
└─ eslint.config.mjs         # ESLint configuration
```

Each app and package has:

- `project.json` – defines build targets and metadata
- `tsconfig.json` – project-specific TypeScript settings
- `rspack.config.ts` (apps only) – bundler configuration
- `module-federation.config.ts` (apps only) – Module Federation setup

---

## Nx & Build System

### What is Nx?

Nx is a **task orchestration and build system**. Instead of manually running scripts, Nx:

1. **Infers tasks** from your code (via plugins like @nx/rspack, @nx/jest, @nx/eslint)
2. **Manages dependencies** between projects using a dependency graph
3. **Caches results** to avoid redundant builds
4. **Runs affected tasks** (e.g., if you change `shared-ui`, it rebuilds apps that depend on it)

### Nx Plugins in This Repo

From `nx.json`:

```json
"plugins": [
  "@nx/webpack/plugin",      // Webpack bundler support
  "@nx/eslint/plugin",       // Auto-infer lint targets
  "@nx/jest/plugin",         // Auto-infer test targets
  "@nx/rspack/plugin"        // Rspack bundler (primary)
]
```

These plugins **automatically infer targets** for each project. For example, when Nx sees a `rspack.config.ts`, it auto-creates `build` and `serve` targets without you needing to define them in `project.json`.

### Build Tool: Rspack

This repo uses **Rspack** (Rust-based bundler, faster than Webpack):

- **Dev mode** → Hot Module Reloading (HMR) for rapid iteration
- **Prod mode** → Optimized tree-shaking, minification, code-splitting
- Configured per app in `apps/*/rspack.config.ts`

---

## Module Federation Architecture

### What is Module Federation?

Module Federation lets you build and deploy **multiple JavaScript applications independently**, then **load them dynamically at runtime**. This enables:

- Independent deployments of each app
- Code sharing without monolithic builds
- Micro-frontend architecture

### How It Works

**Host App** (`apps/host`):

```json
{
  "name": "host",
  "remotes": ["dashboard", "intelligence", "planning", "output"],
  "shared": { "react", "react-dom", "react-router-dom" }
}
```

- Acts as the **shell** that loads other apps
- Lists **remotes**: other apps it will dynamically import
- Declares **shared dependencies** (React, React DOM, React Router) so they're only loaded once

**Remote Apps** (e.g., `apps/dashboard`):

```json
{
  "name": "dashboard",
  "exposes": {
    "./Module": "./src/remote-entry.ts"
  },
  "shared": { "react", "react-dom", "react-router-dom" }
}
```

- **Exposes** modules that the host (or other apps) can load
- `remote-entry.ts` is the entry point that exports the app's root component
- Also declares **shared dependencies**

### Shared Dependencies Strategy

Both host and remotes agree on which packages are **singletons**:

```typescript
shared: (libraryName, defaultConfig) => {
  if (libraryName === 'react' || libraryName === 'react-dom' || libraryName === 'react-router-dom') {
    return { ...defaultConfig, singleton: true, strictVersion: false };
  }
  return defaultConfig;
};
```

- **singleton: true** → Only one instance of React in the entire browser at runtime
- **strictVersion: false** → Allow compatible versions (don't require exact match)

This prevents duplication and version conflicts.

---

## Shared Libraries & Packages

### Types of Libraries

#### 1. **shared-ui**

**Purpose**: React components & UI widgets

**Structure**:

```
packages/shared-ui/
├─ project.json           # No build target (library, not compiled)
├─ src/
│  ├─ index.ts           # Barrel export
│  └─ lib/
│     ├─ shared-ui.tsx   # Demo component (not essential)
│     ├─ components/
│     │  └─ dropdown/    # Reusable dropdown component
│     └─ widgets/
│        └─ filter-widget/  # Reusable filter widget
```

**Key Point**: `shared-ui` is **NOT compiled** – it's used as source directly by apps via TypeScript path aliases.

**How Apps Import It**:

```typescript
import { FilterWidget } from '@pn/shared-ui';
import { Dropdown } from '@pn/shared-ui';
```

This path alias resolves via `tsconfig.base.json`:

```json
"@pn/shared-ui": ["packages/shared-ui/src/index.ts"]
```

**Barrel Export** (`packages/shared-ui/src/index.ts`):

```typescript
export * from './lib/shared-ui';
export * from './lib/components/dropdown';
export * from './lib/widgets/filter-widget';
```

This defines the public API of the library.

#### 2. **shared-types**

**Purpose**: TypeScript type definitions shared across apps

**Build Settings** (`project.json`):

```json
{
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "options": {
        "outputPath": "dist/packages/shared-types",
        "main": "packages/shared-types/src/index.ts"
      }
    }
  }
}
```

- **Compiled** with `@nx/js:tsc` (TypeScript compiler)
- Outputs to `dist/packages/shared-types/`
- Other projects can import types via `@pn/shared-types`

#### 3. **shared-utils**

**Purpose**: Utility functions (helpers, validators, etc.)

**Build Settings**: Same as `shared-types` (compiled with tsc)

**Package.json** (`packages/shared-utils/package.json`):

```json
{
  "name": "@pn/shared-utils",
  "version": "0.0.1",
  "main": "./src/index.js"
}
```

#### 4. **config**

**Purpose**: Application configuration, constants, and settings

**Build Settings**: Also compiled with tsc

### How Shared Libs Are Accessed in MFEs

**Step 1: Define Path Alias** (`tsconfig.base.json`)

```json
{
  "paths": {
    "@pn/shared-ui": ["packages/shared-ui/src/index.ts"],
    "@pn/shared-types": ["packages/shared-types/src/index.ts"],
    "@pn/shared-utils": ["packages/shared-utils/src/index.ts"],
    "@pn/config": ["packages/config/src/index.ts"]
  }
}
```

**Step 2: Export Public API** (e.g., `packages/shared-ui/src/index.ts`)

```typescript
// Re-exports everything that consumers should use
export * from './lib/components/dropdown';
export * from './lib/widgets/filter-widget';
```

**Step 3: Import in Remote Apps** (e.g., `apps/dashboard/src/app/landing-page/landing-page.tsx`)

```typescript
import { FilterWidget } from '@pn/shared-ui';  // Resolves to path alias

export function LandingPage() {
  return (
    <FilterWidget
      dropdownCount={7}
      dropdownHeadings={['Region', 'Category', 'Brand', 'Product', 'Channel', 'Time Period', 'Retailer']}
      staticLeft="All Retailers"
      onApply={handleApply}
      onReset={handleReset}
    />
  );
}
```

**Step 4: Rspack Resolves & Bundles**

- Rspack sees the import path `@pn/shared-ui`
- Looks up the alias in `tsconfig.base.json`
- Finds `packages/shared-ui/src/index.ts`
- Imports the component
- Includes it in the final bundle

### Full Code Example: Using Shared-UI in a Remote App

**File**: `apps/dashboard/src/app/landing-page/landing-page.tsx`

```typescript
import { useState } from 'react';
import { FilterWidget } from '@pn/shared-ui';  // ← Shared library import
import styles from './landing-page.module.scss';

const FILTER_HEADINGS = [
  'Region',
  'Category',
  'Brand',
  'Product',
  'Channel',
  'Time Period',
  'Retailer',
];

export function LandingPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleApply = (values: Record<string, string>) => {
    setActiveFilters(values);
  };

  const handleReset = () => {
    setActiveFilters({});
  };

  return (
    <main className={styles['landing-page']}>
      <header className={styles['landing-page__header']}>
        <h1>Dashboard</h1>
        <p>Pet Nutrition Supplier Relationship Management</p>
      </header>

      <section className={styles['landing-page__filters']}>
        {/* ↓ Using the FilterWidget from shared-ui */}
        <FilterWidget
          dropdownCount={7}
          dropdownHeadings={FILTER_HEADINGS}
          staticLeft="All Retailers"
          onApply={handleApply}
          onReset={handleReset}
        />
      </section>

      {/* Display active filters */}
      {Object.keys(activeFilters).length > 0 && (
        <section className={styles['landing-page__content']}>
          <h2>Active Filters</h2>
          <ul>
            {FILTER_HEADINGS.map((heading, index) => {
              const key = `filter-${index + 1}`;
              return activeFilters[key] ? (
                <li key={key}>
                  {heading}: {activeFilters[key]}
                </li>
              ) : null;
            })}
          </ul>
        </section>
      )}
    </main>
  );
}

export default LandingPage;
```

---

## What Happens When You Run `yarn nx serve host`

This is the complete flow from command to running application:

### Step 1: Nx Command Parsing

```bash
yarn nx serve host
```

Nx parses the command:

- `serve` → target name
- `host` → project name

### Step 2: Dependency Graph Analysis

Nx checks `apps/host/project.json`:

```json
{
  "name": "host",
  "sourceRoot": "apps/host/src",
  "projectType": "application",
  "targets": {
    "serve": {
      "options": { "port": 4200 },
      "dependsOn": [] // (not defined, so no deps)
    }
  }
}
```

Since no explicit dependencies are listed, Nx also checks:

- `apps/host/package.json` (dev deps)
- Module federation config to infer remote dependencies

### Step 3: Execute `@nx/rspack/plugin` Serve Target

The plugin in `nx.json` configures:

```json
"@nx/rspack/plugin": {
  "serveTargetName": "serve"
}
```

Nx executes the "serve" target using the `@nx/rspack` executor, which:

1. **Reads `rspack.config.ts`** from `apps/host/`
2. **Loads plugins** defined in the config:
   ```typescript
   plugins: [
     new NxAppRspackPlugin({...}),
     new NxReactRspackPlugin({...}),
     new NxModuleFederationPlugin({ config }, { dts: false }),
     new NxModuleFederationDevServerPlugin({ config }),
   ]
   ```

### Step 4: Rspack Configuration Setup

From `apps/host/rspack.config.ts`:

```typescript
{
  output: {
    path: join(__dirname, '../../dist/apps/host'),
    publicPath: 'auto',
  },
  devServer: {
    port: 4200,
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true,
    },
  },
  plugins: [
    new NxAppRspackPlugin({
      tsConfig: './tsconfig.app.json',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.scss'],
      outputHashing: 'none',  // dev mode: no hash
      optimization: false,    // dev mode: no optimization
    }),
    new NxReactRspackPlugin({}),
    new NxModuleFederationPlugin({ config: host_mf_config }, { dts: false }),
    new NxModuleFederationDevServerPlugin({ config: host_mf_config }),
  ]
}
```

**Config Breakdown**:

- **output.path**: Where dev build goes (if bundled)
- **devServer.port**: 4200 (where host runs)
- **main**: `./src/main.ts` (entry point)
- **index**: `./src/index.html` (HTML template)
- **Module Federation**: Loads the `module-federation.config.ts`

### Step 5: Module Federation Discovery

From `apps/host/module-federation.config.ts`:

```typescript
{
  name: 'host',
  remotes: ['dashboard', 'intelligence', 'planning', 'output'],
  shared: {
    'react': { singleton: true, strictVersion: false },
    'react-dom': { singleton: true, strictVersion: false },
    'react-router-dom': { singleton: true, strictVersion: false }
  }
}
```

The `NxModuleFederationDevServerPlugin` now:

1. **Looks up each remote** (dashboard, intelligence, planning, output) in `nx.json`
2. **Finds their configs**: `apps/dashboard/module-federation.config.ts`, etc.
3. **Maps remotes to dev ports**:
   - `dashboard` → `http://localhost:4202` (from `apps/dashboard/rspack.config.ts`)
   - `intelligence` → `http://localhost:4203`
   - `planning` → `http://localhost:4204`
   - `output` → `http://localhost:4205`

This creates a runtime module federation manifest.

### Step 6: Dev Server Startup

Rspack starts the webpack-dev-server on port 4200:

```
<i>[rspack-dev-server] Server started: http://localhost:4200
```

The dev server:

- **Hot reloads** on file changes
- **Serves** `index.html` from `apps/host/src/`
- **Watches** for changes in:
  - `apps/host/src/**`
  - `packages/shared-ui/src/**` (via path alias)
  - `packages/shared-types/src/**`
  - etc.

### Step 7: Browser Loads Host App

User opens `http://localhost:4200` in browser:

**Request 1**: GET `/`

- Returns `apps/host/src/index.html`
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Host</title>
    </head>
    <body>
      <div id="root"></div>
      <!-- Rspack injects script here -->
    </body>
  </html>
  ```

**Request 2**: Rspack injects `main.js`

- Browser loads `main.js` (from memory in dev mode)
  ```typescript
  // apps/host/src/main.ts
  import('./bootstrap');
  ```

### Step 8: Bootstrap React App

`main.ts` dynamically imports `bootstrap.tsx`:

```typescript
// apps/host/src/bootstrap.tsx
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
```

React initializes and renders the `<App />` component.

### Step 9: App Router Loads Remotes

`apps/host/src/app/app.tsx`:

```typescript
import * as React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

const Dashboard = React.lazy(() => import('dashboard/Module'));
const Intelligence = React.lazy(() => import('intelligence/Module'));
const Planning = React.lazy(() => import('planning/Module'));
const Output = React.lazy(() => import('output/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/intelligence">Intelligence</Link></li>
        <li><Link to="/planning">Planning</Link></li>
        <li><Link to="/output">Output</Link></li>
      </ul>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </React.Suspense>
  );
}
```

- **React.lazy()** defines async component loading
- **Routes** map paths to remote components
- When user navigates to `/dashboard`, React.lazy triggers the import

### Step 10: Remote Module Loading

When `import('dashboard/Module')` executes:

1. **Rspack Module Federation** intercepts the import
2. **Checks the federation manifest**: "dashboard/Module is at http://localhost:4202"
3. **Loads the remote entry**:
   ```
   GET http://localhost:4202/remote-entry.js
   ```
4. **Remote app's bootstrap** (`apps/dashboard/src/bootstrap.tsx`) runs in the host context
5. **Returns the Component**:

   ```typescript
   // apps/dashboard/src/remote-entry.ts
   export { default } from './app/app';
   ```

   This is the `<LandingPage />` component from dashboard

6. **Shared dependencies** are negotiated:
   - If host has React 19, remote uses it
   - If versions conflict, Module Federation decides (based on `singleton: true`)

### Step 11: Dashboard Loads Shared-UI

Once dashboard's `App` renders:

```typescript
// apps/dashboard/src/app/app.tsx
import { LandingPage } from './landing-page';

export function App() {
  return <LandingPage />;
}
```

And `LandingPage` imports:

```typescript
// apps/dashboard/src/app/landing-page/landing-page.tsx
import { FilterWidget } from '@pn/shared-ui';

export function LandingPage() {
  return (
    <FilterWidget
      dropdownCount={7}
      dropdownHeadings={[...]}
      staticLeft="All Retailers"
      onApply={handleApply}
      onReset={handleReset}
    />
  );
}
```

Rspack resolves `@pn/shared-ui`:

1. **Looks up** the path alias in `tsconfig.base.json` → `packages/shared-ui/src/index.ts`
2. **Imports** `FilterWidget` and `Dropdown` components
3. **Includes them** in the dashboard bundle (or shares if configured)

### Step 12: Full Page Render

1. **Host app** renders on port 4200
2. **Dashboard remote** (port 4202) is loaded async via Module Federation
3. **FilterWidget** (from `packages/shared-ui`) is embedded in Dashboard
4. **Styles** (SCSS) are processed and applied
5. **HMR watches** all files for changes

---

## Project.json Deep Dive

Every Nx project has a `project.json` file that defines:

- **Metadata**: name, type (app/lib), tags
- **Targets**: build, serve, test, lint, etc.

### Example: Host App

[apps/host/project.json](apps/host/project.json):

```json
{
  "name": "host",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/host/src",
  "projectType": "application",
  "tags": [],
  "targets": {
    "serve": {
      "options": {
        "port": 4200
      },
      "dependsOn": []
    }
  }
}
```

**Breakdown**:

- **name**: "host" – project identifier
- **sourceRoot**: "apps/host/src" – where the source code lives
- **projectType**: "application" – this is an app, not a library
- **targets.serve**:
  - **options.port**: 4200 – rspack dev server port
  - **dependsOn**: [] – no dependencies (if listed, Nx builds them first)

The serve target is **minimal** because Nx plugins auto-infer it from `rspack.config.ts`.

### Example: Dashboard Remote

[apps/dashboard/project.json](apps/dashboard/project.json):

```json
{
  "name": "dashboard",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/dashboard/src",
  "projectType": "application",
  "tags": [],
  "targets": {
    "serve": {
      "options": {
        "port": 4201
      },
      "dependsOn": ["host:serve"]
    }
  }
}
```

**Key Difference**: `dependsOn: ["host:serve"]`

- When you run `nx serve dashboard`, Nx also starts `host:serve`
- This ensures the host is available for the remote to connect to
- (The actual port is 4201, overridden from 4202 in rspack config)

### Example: Shared Library (shared-types)

[packages/shared-types/project.json](packages/shared-types/project.json):

```json
{
  "name": "shared-types",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/shared-types/src",
  "projectType": "library",
  "tags": ["type:types scope:shared"],
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/packages/shared-types",
        "main": "packages/shared-types/src/index.ts",
        "tsConfig": "packages/shared-types/tsconfig.lib.json",
        "assets": ["packages/shared-types/*.md"]
      }
    }
  }
}
```

**Breakdown**:

- **projectType**: "library" – this is a reusable library
- **targets.build**:
  - **executor**: "@nx/js:tsc" – use TypeScript compiler
  - **outputPath**: "dist/packages/shared-types" – output directory
  - **main**: The entry point file
  - **tsConfig**: "packages/shared-types/tsconfig.lib.json" – which tsconfig to use
  - **assets**: Copy markdown files to output

When you run `nx build shared-types`, it:

1. Compiles TypeScript to JavaScript
2. Outputs to `dist/packages/shared-types`
3. Other projects can import from this compiled output

### Example: UI Library (shared-ui)

[packages/shared-ui/project.json](packages/shared-ui/project.json):

```json
{
  "name": "shared-ui",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/shared-ui/src",
  "projectType": "library",
  "tags": ["type:ui scope:shared"],
  "targets": {}
}
```

**Note**: `targets: {}` is **empty**!

- `shared-ui` is not compiled; it's used as **source files directly**
- Apps reference it via path alias `@pn/shared-ui`, not a compiled bundle
- When an app (e.g., dashboard) imports from shared-ui, rspack includes the source TypeScript/TSX directly

---

## TypeScript Path Aliases

Aliases make imports short and refactor-friendly.

### How They Work

In [tsconfig.base.json](tsconfig.base.json):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@pn/shared-ui": ["packages/shared-ui/src/index.ts"],
      "@pn/shared-types": ["packages/shared-types/src/index.ts"],
      "@pn/shared-utils": ["packages/shared-utils/src/index.ts"],
      "@pn/config": ["packages/config/src/index.ts"],
      "dashboard/Module": ["apps/dashboard/src/remote-entry.ts"],
      "intelligence/Module": ["apps/intelligence/src/remote-entry.ts"],
      "planning/Module": ["apps/planning/src/remote-entry.ts"],
      "output/Module": ["apps/output/src/remote-entry.ts"]
    }
  }
}
```

### Resolving Aliases

**Import Statement**:

```typescript
import { FilterWidget } from '@pn/shared-ui';
```

**Resolution**:

1. TypeScript compiler sees `@pn/shared-ui`
2. Looks up in `paths` → `["packages/shared-ui/src/index.ts"]`
3. Resolves to absolute path: `/mnt/c/Users/.../Starter code/packages/shared-ui/src/index.ts`
4. Loads that file and its exports

### Module Federation Aliases

```json
"dashboard/Module": ["apps/dashboard/src/remote-entry.ts"],
"intelligence/Module": ["apps/intelligence/src/remote-entry.ts"],
...
```

These allow **dynamic imports** for Module Federation:

```typescript
const Dashboard = React.lazy(() => import('dashboard/Module'));
```

At runtime, Module Federation **overrides** this:

- Instead of loading from `apps/dashboard/src/remote-entry.ts`
- It loads from `http://localhost:4202/remote-entry.js`

---

## Building & Deployment

### Development Build

```bash
yarn nx serve host
```

- **Mode**: Development
- **Output**: In-memory (not written to disk)
- **Optimization**: Disabled (faster rebuild)
- **Source Maps**: Enabled (for debugging)
- **HMR**: Enabled (for instant updates)

### Production Build

```bash
yarn nx build host
```

Equivalent to:

```bash
npx nx run host:build
```

This:

1. **Reads `rspack.config.prod.ts`** (if it exists) or uses `rspack.config.ts` with `NODE_ENV=production`
2. **Compiles TypeScript** → JavaScript
3. **Processes SCSS** → CSS
4. **Bundles** all dependencies
5. **Minifies** code
6. **Tree-shakes** unused code
7. **Generates hashes** for cache-busting
8. **Outputs** to `dist/apps/host/`

**Output Structure**:

```
dist/apps/host/
├─ index.html
├─ main.[hash].js
├─ styles.[hash].css
├─ favicon.ico
└─ assets/
```

### Building All Apps

```bash
yarn nx build
```

Nx detects all projects and builds everything (caching unchanged projects).

### Building Affected Projects

```bash
yarn nx affected:build --base=main
```

Only rebuilds projects that changed since `main` branch.

---

## Development Workflow

### Scenario 1: Modify Shared-UI Component

**File**: `packages/shared-ui/src/lib/components/dropdown/dropdown.tsx`

**Steps**:

1. Edit the file
2. Dev server watches and detects change
3. Rspack recompiles the file
4. All apps that import from `@pn/shared-ui` hot-reload
5. Browser refreshes (or HMR updates)

**No explicit build needed** because:

- `shared-ui` is not compiled; it's imported as source
- Rspack processes it on-the-fly

### Scenario 2: Modify Dashboard App

**File**: `apps/dashboard/src/app/landing-page/landing-page.tsx`

**Steps**:

1. Edit the file
2. Dev server detects change **only** in dashboard (no other apps need rebuild)
3. Rspack recompiles dashboard's `main.js`
4. Dashboard's remote entry is updated
5. Host app (in browser) detects the change and reloads dashboard via Module Federation

### Scenario 3: Modify Shared-Types

**File**: `packages/shared-types/src/lib/shared-types.ts`

**Steps**:

1. Edit the file
2. Since `shared-types` is **compiled with tsc**, you may need to rebuild:
   ```bash
   yarn nx build shared-types
   ```
   OR
3. If using the source directly (less typical), the change is picked up automatically

### Scenario 4: Add a New Remote App

1. **Generate** using Nx:

   ```bash
   npx nx g @nx/react:app new-remote --mfe
   ```

2. **Create** `module-federation.config.ts`:

   ```typescript
   export default {
     name: 'new-remote',
     exposes: { './Module': './src/remote-entry.ts' },
     shared: { 'react': ..., 'react-dom': ... }
   };
   ```

3. **Add to host's remotes** (`apps/host/module-federation.config.ts`):

   ```typescript
   remotes: ['dashboard', 'intelligence', 'planning', 'output', 'new-remote'];
   ```

4. **Add to host's router** (`apps/host/src/app/app.tsx`):

   ```typescript
   const NewRemote = React.lazy(() => import('new-remote/Module'));
   ```

5. **Add route**:
   ```tsx
   <Route path="/new-remote" element={<NewRemote />} />
   ```

---

## Common Commands

| Command                   | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `yarn nx serve host`      | Start host on 4200 + all remotes               |
| `yarn nx serve dashboard` | Start dashboard on 4202 (with host dependency) |
| `yarn nx build host`      | Production build of host                       |
| `yarn nx build`           | Build all projects                             |
| `yarn nx test shared-ui`  | Run tests for shared-ui                        |
| `yarn nx lint host`       | Lint host app                                  |
| `yarn nx graph`           | Visualize dependency graph (opens browser)     |
| `yarn nx affected:build`  | Build only projects affected by changes        |

---

## Architecture Diagrams

### Dependency Graph

```
┌──────────────────┐
│   apps/host      │ (port 4200 - Main Shell)
│  (BrowserRouter) │
└────────┬─────────┘
         │
         ├─→ [Module Federation Runtime]
         │
         ├─ remotes: [dashboard, intelligence, planning, output]
         │   ├─ dashboard (4202) ──→ @pn/shared-ui
         │   ├─ intelligence (4203)
         │   ├─ planning (4204)
         │   └─ output (4205)
         │
         └─ shared packages:
            ├─ @pn/shared-ui (source)
            ├─ @pn/shared-types (compiled)
            ├─ @pn/shared-utils (compiled)
            └─ @pn/config (compiled)
```

### Build Pipeline

```
Source Files (src/)
    ↓
TypeScript Compiler / Rspack
    ↓
Bundle Generation
    ↓
Code Splitting (dev chunks)
    ↓
Minification (prod only)
    ↓
Hash-based Output
    ↓
dist/ (or memory in dev)
```

---

## Summary for New Developers

1. **Nx** orchestrates the build system; use `yarn nx <target> <project>`
2. **Rspack** is the bundler; configured per app
3. **Module Federation** architecture allows independent deployments
4. **Host** (port 4200) loads **Remotes** (4202+) at runtime
5. **Shared Libraries** in `packages/` are imported via path aliases
6. **shared-ui** is source-only (not compiled), others are compiled
7. **HMR** means edits reflect instantly in dev mode
8. **No manual rebuilds** needed for source changes in dev
9. Check dependency graph with `yarn nx graph`
10. Use `project.json` to understand each project's configuration
