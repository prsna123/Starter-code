# PN_SRM_US_MONO_REPO

Please read MONOREO_BUILD_AND_ARCHITECTURE.md for architecutre details.

# Build Strategy:

The shared packages are not mfe's and are built as libraries. The apps are built as mfe's and consume the shared packages as dependencies. The apps are built using rspack and module federation for micro-frontend support. The shared packages are built using the standard TypeScript build process. The apps are built using the Nx build process, which takes care of building the shared packages as needed.

# Getting Started

## 🚀 Quick Start

1. Clone the repository:

   ```sh
   git clone https://dev.azure.com/MarsDevTeam/Pet%20Nutrition%20Digital%20Strategy/_git/SRM-US-HOST-APP
   cd "SRM-US-HOST-APP"
   ```

2. Install dependencies:

   ```sh
    yarn install
   ```

   Note: yarn is recommended for better performance with Nx, but npm can also be used.
   For yarn, you need to have yarn@4.6.0 or later installed.

3. To run the host app in development mode:

   ```sh
   yarn start
   ```

   What happens internally when you run this?
   This will start the host app[yarn nx serve host] and any other apps it depends on (like dashboard, intelligence, output, planning). You can access the host app at http://localhost:4200 by default. But The remotes [dashboard, intelligence, output, planning] will serve as static build to host. So HMR will not work for remotes. You need to rebuild the remote and refresh the host app to see changes in remotes.

   For developer:
   - If you are working on the host app, you can run `yarn start` and it will automatically build the remotes as needed.
   - If you are working on a remote app (like dashboard), you can run `yarn start:dashboard` which internally run the Host app and the remote[dashboard] app. But here you see the new dashboard changes but other remotes will still run with older builds. The same applies to other remotes (intelligence, output, planning).

4. To build the host app for production:
   ```sh
   yarn build
   ```
   This will build the host app and all its remotes. The output will be in the `dist/apps/host` folder and the remotes will be in their respective `dist/apps/*` folders.
