# Pokecomparator — Implementation Plan (Angular CLI Monorepo + Module Federation)

This document describes an actionable implementation plan to build the Pokecomparator application as an Angular CLI monorepo using Webpack Module Federation. It assumes a fresh, empty workspace.

## Overview
- Architecture: Host (shell) + three remotes: `remote-catalog`, `remote-detail`, `remote-compare`.
- Integration: Webpack Module Federation via `@angular-architects/module-federation` (recommended for Angular-only microfrontends).
- Shared libraries: `libs/api` (PokeApiService), `libs/ui` (shared components), and `libs/models` (TS types) as needed.
- Goals: independent development and deploy of remotes; host composes remotes at runtime and lazy-loads route entry modules.

## Prerequisites
- Node.js 18+ (or LTS compatible with Angular CLI used)
- Angular CLI 16+ installed globally (optional): `npm install -g @angular/cli`
- Git repository initialized (optional)

## High-level steps
1. Create Angular workspace (no initial app).  
2. Generate `host` app and remotes: `remote-catalog`, `remote-detail`, `remote-compare`.  
3. Generate shared libraries: `libs/api`, `libs/ui`.  
4. Install Module Federation helper and charting libs.  
5. Run the MF schematic for remotes and host (generates `module-federation.config.js` + `webpack.config.js`).  
6. Add route-entry modules in remotes and expose them as `./Module`.  
7. Configure shared dependencies (Angular core libs + `rxjs`) as singletons/strict.  
8. Implement host routes that lazy-load remotes via the `loadRemoteModule` helper.  
9. Add dev scripts and ports; verify local composition.  
10. Implement features in remotes: catalog (list & search), detail (charts), compare (pair comparison).

## Exact scaffold commands (run from an empty repository root)

1) Create a new Angular workspace (no initial application)

```bash
ng new pokecomparator --create-application=false --routing --style=scss --strict
cd pokecomparator
```

2) Generate applications

```bash
ng generate application host --routing --style=scss
ng generate application remote-catalog --routing --style=scss
ng generate application remote-detail --routing --style=scss
ng generate application remote-compare --routing --style=scss
```

3) Generate shared libraries

```bash
ng generate library api --prefix=pc
ng generate library ui --prefix=pc
ng generate library models --prefix=pc  # optional
```

4) Install Module Federation helper and chart libs

Note : you need to update the 

```bash
npm install --save-dev @angular-architects/module-federation
npm install chart.js ng2-charts
npm install concurrently --save-dev   # optional: run multiple dev servers together
```

5) Add Module Federation scaffolding (schematic) for remotes

```bash
ng add @angular-architects/module-federation --project remote-catalog --type remote --port 4210 --remoteName remote_catalog
ng add @angular-architects/module-federation --project remote-detail --type remote --port 4220 --remoteName remote_detail
ng add @angular-architects/module-federation --project remote-compare --type remote --port 4230 --remoteName remote_compare
```

6) Add Module Federation scaffolding for host

```bash
ng add @angular-architects/module-federation --project host --type host --remotes "remote_catalog@http://localhost:4201/remoteEntry.js,remote_detail@http://localhost:4202/remoteEntry.js,remote_compare@http://localhost:4203/remoteEntry.js"
```

> The schematic will create/modify `module-federation.config.js` and `webpack.config.js` under the relevant `projects/*` folders and update `angular.json`.

7) Create route-entry modules in each remote and map `exposes`

- Create `projects/remote-catalog/src/app/remote-entry/entry.module.ts` (export `CatalogModule`).
- Create equivalent `entry.module.ts` for `remote-detail` and `remote-compare`.
- Update each remote's `module-federation.config.js` `exposes` section to include:

```js
exposes: {
  './Module': './src/app/remote-entry/entry.module.ts'
}
```

8) Shared dependencies configuration (per-project `module-federation.config.js`)

- Configure shared libs similar to:

```js
shared: {
  '@angular/core': { singleton: true, strictVersion: true, requiredVersion: deps['@angular/core'] },
  '@angular/common': { singleton: true, strictVersion: true, requiredVersion: deps['@angular/common'] },
  '@angular/router': { singleton: true, strictVersion: true, requiredVersion: deps['@angular/router'] },
  'rxjs': { singleton: true, strictVersion: false }
}
```

- Keep the shared surface minimal and prefer exposing route-level modules rather than many small components.

9) Host routing: lazy-load remotes with `loadRemoteModule`

- In `projects/host/src/app/app-routing.module.ts` use the helper provided by the architects plugin:

```ts
{ path: 'catalog', loadChildren: () =>
  loadRemoteModule({ remoteName: 'remote_catalog', exposedModule: './Module' })
    .then(m => m.CatalogModule)
}
```

- Add similar routes for `detail` and `compare`.
- Provide skeleton/fallback UI and error handling for remote load failures.

10) Dev ports and npm scripts (add to root `package.json` `scripts`)

```json
"scripts": {
  "start:host": "ng serve host --port 4200",
  "start:catalog": "ng serve remote-catalog --port 4201",
  "start:detail": "ng serve remote-detail --port 4202",
  "start:compare": "ng serve remote-compare --port 4203",
  "start:all": "concurrently \"npm run start:host\" \"npm run start:catalog\" \"npm run start:detail\" \"npm run start:compare\""
}
```

Run remotes first, then host. Verify CORS is permissive for `remoteEntry.js` in dev (webpack dev server usually allows it locally).

## Project layout (resulting)

- angular.json
- package.json
- tsconfig.base.json / tsconfig.json
- projects/
  - host/
    - src/
    - module-federation.config.js
    - webpack.config.js
  - remote-catalog/
    - src/
    - module-federation.config.js
    - webpack.config.js
  - remote-detail/
  - remote-compare/
  - api/ (library generated)
  - ui/ (library generated)
  - models/ (optional)

## Feature-to-remote mapping
- `remote-catalog` — list of pokemons, search by name/ID, selection. Uses `PokeApiService` from `libs/api`.
- `remote-detail` — individual pokemon page, images, types, stat charts (Chart.js/ng2-charts).
- `remote-compare` — selection of two pokemons and side-by-side comparison charts and stat highlights.
- `host` — global layout, navigation, top-level routes, runtime manifest loader for remoteEntry URLs.

## Implementation order (recommended)
1. Scaffold workspace and projects (commands above).  
2. Implement `libs/api` with `PokeApiService` (methods: `getPokemonList`, `getPokemonById`) and unit tests.  
3. Implement `remote-catalog` (UI: list, search).  
4. Implement `remote-detail` (stat charts using `ng2-charts`).  
5. Implement `remote-compare` (pairs selection + comparison charts).  
6. Wire host routing to remotes and add runtime manifest loader for production remoteEntry URLs.  
7. Polish UI, add error/empty states and caching strategy (client-side short TTL).  

## Runtime manifest for remoteEntry URLs (production)
- Prefer a small JSON manifest served by the host (e.g., `/mfe-manifest.json`) that maps remote names to remoteEntry URLs.
- Host fetches the manifest at bootstrap and dynamically configures remotes so host does not need rebuilding when remote URLs change.

## Shared state / cross-MFE communication
- Prefer URL parameters for shareable state (e.g., selected Pokemon ids).  
- For richer cross-MFE sync, expose a lightweight RxJS-based shared service from `libs/api` and mark it `singleton` in Module Federation config.

## Testing & recommended tools
- Unit tests: Jest or Karma+Jasmine per project.  
- E2E: Cypress testing the host + remotes composed locally.  
- Charts: use `ng2-charts` + `chart.js` for stat/radar/bar charts.

## Dev tips & pitfalls
- Enforce identical Angular major/minor versions across host and remotes. Use CI checks to gate mismatched versions.  
- Use singletons for `@angular/core`, `@angular/common`, `@angular/router`.  
- Avoid duplicating large libraries across remotes — either share them or isolate them in one remote.  
- Add graceful fallback UI for remote load failures and capture telemetry for load errors.

## Next steps I can perform
- Create this file in the repository (done).  
- Optionally scaffold the Angular workspace and projects automatically in this repo.  
- Or produce ready-to-apply patches for initial `libs/api` and `remote-catalog` skeletons.

---

Authored: Implementation plan for Pokecomparator (Angular CLI monorepo + Module Federation)
