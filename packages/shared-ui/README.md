# Shared UI

This package contains reusable React components and styles that can be shared across multiple applications in the monorepo. It is designed to promote consistency and reduce duplication by providing a common set of UI elements.

## 📁 Structure

```packages/
  shared-ui/
    src/
      lib/
        components/   # Reusable React components[atoms] eg: Button, Input, etc.
        molecules/    # More complex components composed of atoms eg: Card, Alert, Modal etc.
        organisms/    # Even more complex components composed of molecules eg: Header, Footer, Sidebar etc.
        widgets/      # More complex components composed of organisms eg: Table, FilterComponent etc.

        index.ts        # Entry point for the library
        tsconfig.lib.json # TypeScript configuration for the library
        README.md         # Documentation for the shared UI package
```

If we look the structure of the `shared-ui` package, we can see that it is organized into different folders based on the complexity of the components. This follows the Atomic Design methodology, which helps in creating a scalable and maintainable design system.

Internally we won't have a package.json file in the shared-ui package, as it is being treated as a library within the Nx monorepo. The build and dependency management is handled at the monorepo level, so we don't need a separate package.json for this library. Instead, we can define the dependencies and build configuration in the root package.json and Nx configuration files.
