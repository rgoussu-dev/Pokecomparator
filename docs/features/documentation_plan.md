# Pokecomparator Documentation Plan

This document outlines a comprehensive plan to thoroughly document the Pokecomparator project, covering README files, architecture documentation, and code-borne JSDoc documentation.

## Table of Contents

- [Current State Assessment](#current-state-assessment)
- [Proposed Documentation Structure](#proposed-documentation-structure)
- [Phase 1: Root README.md Enhancement](#phase-1-root-readmemd-enhancement)
- [Phase 2: Project-level READMEs](#phase-2-project-level-readmes)
- [Phase 3: Architecture Documentation](#phase-3-architecture-documentation)
- [Phase 4: JSDoc Code Documentation](#phase-4-jsdoc-code-documentation)
- [Phase 5: AGENTS.md in docs/](#phase-5-agentsmd-in-docs)
- [Phase 6: Compodoc Integration](#phase-6-compodoc-integration)
- [Implementation Order](#implementation-order)
- [Acceptance Criteria](#acceptance-criteria)

---

## Current State Assessment

| Area | Status | Notes |
|------|--------|-------|
| **Root README.md** | ⚠️ Minimal | Only 4 lines, lacks installation, setup, architecture overview |
| **Project READMEs** | ❌ Auto-generated | `domain`, `infra`, `ui` have boilerplate Angular CLI READMEs |
| **Microfrontend READMEs** | ❌ Missing | `host`, `remote-catalog`, `remote-detail`, `remote-compare` lack README |
| **AGENTS.md in docs/** | ❌ Missing | Root `AGENTS.md` exists but no copy in `docs/` folder |
| **Architecture docs** | ❌ Missing | `docs/architecture/` directory doesn't exist |
| **JSDoc** | ⚠️ Partial | Domain layer well documented, UI atoms and host app lack JSDoc |

---

## Proposed Documentation Structure

```
pokecomparator/
├── README.md                           # Enhanced root README
├── AGENTS.md                           # Existing (keep)
├── docs/
│   ├── AGENTS.md                       # Copy for doc browsing
│   ├── agents/                         # Existing context files
│   ├── architecture/                   # NEW: Architecture documentation
│   │   ├── README.md                   # Architecture overview
│   │   ├── hexagonal-architecture.md   # Hexagonal/ports-adapters explanation
│   │   ├── microfrontend-setup.md      # Module Federation setup
│   │   ├── data-flow.md                # Data flow diagrams
│   │   └── diagrams/                   # Mermaid source files (optional)
│   ├── deployment/                     # Existing
│   └── features/                       # Existing
├── projects/
│   ├── host/README.md                  # NEW
│   ├── remote-catalog/README.md        # NEW
│   ├── remote-detail/README.md         # NEW
│   ├── remote-compare/README.md        # NEW
│   ├── domain/README.md                # ENHANCED
│   ├── infra/README.md                 # ENHANCED
│   └── ui/README.md                    # ENHANCED
```

---

## Phase 1: Root README.md Enhancement

### Target Content

The root `README.md` should be comprehensive and serve as the primary entry point for developers.

#### Sections to Include

1. **Project Title & Badges**
   - Build status, coverage, Angular version badges

2. **Project Description**
   - Clear explanation of what Pokecomparator does
   - Link to live demo (if deployed)

3. **Features**
   - Pokemon catalog with search
   - Individual Pokemon detail view with charts
   - Side-by-side comparison functionality

4. **Tech Stack**
   - Angular 21
   - Module Federation (Microfrontends)
   - Hexagonal Architecture
   - PokeAPI integration

5. **Architecture Overview**
   - High-level diagram (Mermaid)
   - Link to detailed architecture docs

6. **Quick Start**
   ```bash
   # Clone the repository
   git clone <repo-url>
   cd pokecomparator

   # Install dependencies
   npm install

   # Run all microfrontends
   npm run run:all

   # Access at http://localhost:4200
   ```

7. **Project Structure**
   - Brief explanation of `projects/` layout
   - Role of each project

8. **Development Commands**
   | Command | Description |
   |---------|-------------|
   | `npm run run:all` | Start all microfrontends |
   | `npm run build` | Build all projects |
   | `npm test` | Run unit tests |
   | `npm run lint` | Lint all projects |
   | `ng run ui:storybook` | Launch Storybook |
   | `npm run docs` | Generate Compodoc documentation |

9. **Testing**
   - Unit testing approach
   - How to run tests

10. **Documentation**
    - Link to Compodoc generated docs
    - Link to Storybook
    - Link to architecture docs

11. **Contributing**
    - Link to AGENTS.md for AI-assisted development
    - Code style guidelines reference

12. **Data Source**
    - PokeAPI acknowledgment and link

13. **License**

---

## Phase 2: Project-level READMEs

### Libraries

#### `projects/domain/README.md`

| Section | Content |
|---------|---------|
| **Purpose** | Business logic layer following hexagonal architecture |
| **Key Concepts** | Ports (interfaces), Models (domain entities), Services (use cases) |
| **Directory Structure** | Explain `models/`, `ports/`, `services/` |
| **Models** | Document `PokemonSummary`, `PokemonDetail`, `PokemonPage`, etc. |
| **Ports** | Document `PokemonRepository`, `PokemonDetailRepository` interfaces |
| **Services** | Document `PokemonCatalogService`, `PokemonDetailService`, `ComparisonService` |
| **Usage Example** | How to inject and use services |
| **Extending** | How to add new domain logic |

#### `projects/infra/README.md`

| Section | Content |
|---------|---------|
| **Purpose** | Secondary adapters implementing domain ports |
| **Adapters** | `PokeApiAdapter`, `PokeApiDetailAdapter` |
| **PokeAPI Integration** | Base URL, endpoints used, response mapping |
| **Adding New Adapters** | Step-by-step guide |
| **Error Handling** | How API errors are handled |
| **Caching Strategy** | If implemented |

#### `projects/ui/README.md`

| Section | Content |
|---------|---------|
| **Purpose** | Shared component library / design system |
| **Structure** | Atoms vs Molecules pattern |
| **Atoms** | List all atoms with brief description |
| **Molecules** | List all molecules with brief description |
| **Storybook** | How to run and access |
| **Theming** | Theme toggle, CSS variables |
| **Usage** | Import examples |
| **Adding Components** | Conventions and guidelines |

### Microfrontends

#### `projects/host/README.md`

| Section | Content |
|---------|---------|
| **Purpose** | Shell application orchestrating microfrontends |
| **Responsibilities** | Routing, layout, navigation, remote loading |
| **Module Federation** | Configuration overview |
| **Routes** | Route definitions and remote mappings |
| **Environment Config** | Environment files explanation |
| **Standalone Mode** | Feature flag for standalone operation |

#### `projects/remote-catalog/README.md`

| Section | Content |
|---------|---------|
| **Purpose** | Pokemon catalog listing feature |
| **Exposed Module** | `CatalogModule` entry point |
| **Features** | Paginated list, search, card selection |
| **Components** | `PokeCatalog`, `PokemonCard` |
| **Routes** | Internal routing structure |
| **Dependencies** | Domain services used |

#### `projects/remote-detail/README.md`

| Section | Content |
|---------|---------|
| **Purpose** | Individual Pokemon detail view |
| **Exposed Module** | `DetailModule` entry point |
| **Features** | Stats display, type visualization, charts |
| **Components** | Main detail components |
| **Chart Integration** | Chart.js / ng2-charts usage |

#### `projects/remote-compare/README.md`

| Section | Content |
|---------|---------|
| **Purpose** | Pokemon comparison feature |
| **Exposed Module** | `CompareModule` entry point |
| **Features** | Side-by-side comparison, stat diff |
| **Components** | Comparison components |
| **Query Params** | `pokemon1`, `pokemon2` parameters |

---

## Phase 3: Architecture Documentation

### Files to Create

#### `docs/architecture/README.md`

Main entry point for architecture documentation with links to detailed docs.

```markdown
# Architecture Overview

Pokecomparator follows a **Hexagonal Architecture** (Ports & Adapters) combined with a 
**Microfrontend Architecture** using Webpack Module Federation.

## Quick Links
- [Hexagonal Architecture](./hexagonal-architecture.md)
- [Microfrontend Setup](./microfrontend-setup.md)
- [Data Flow](./data-flow.md)

## High-Level Diagram

[Include C4 Context Diagram here]
```

#### `docs/architecture/hexagonal-architecture.md`

**Content:**

1. **What is Hexagonal Architecture?**
   - Core concepts explanation
   - Benefits for this project

2. **How It's Applied**
   - Domain at the center
   - Ports as interfaces
   - Adapters as implementations

3. **Project Mapping**
   ```mermaid
   graph TB
       subgraph "Domain (Business Logic)"
           Services[Services]
           Models[Models]
           Ports[Ports/Interfaces]
       end
       
       subgraph "Infrastructure (Adapters)"
           PokeAPI[PokeAPI Adapter]
       end
       
       subgraph "UI (Primary Adapters)"
           Host[Host App]
           Catalog[Remote Catalog]
           Detail[Remote Detail]
           Compare[Remote Compare]
       end
       
       UI --> Domain
       Domain --> Infrastructure
       PokeAPI --> ExternalAPI[PokeAPI.co]
   ```

4. **Dependency Rule**
   - Inner layers don't know outer layers
   - Dependency injection for adapters

5. **Code Examples**
   - Port definition
   - Adapter implementation
   - Service usage

#### `docs/architecture/microfrontend-setup.md`

**Content:**

1. **Why Microfrontends?**
   - Independent development
   - Independent deployment
   - Technology flexibility

2. **Module Federation Configuration**
   - Host configuration
   - Remote configuration
   - Shared dependencies

3. **Architecture Diagram**
   ```mermaid
   graph LR
       subgraph "Host :4200"
           Shell[Shell/Layout]
           Router[Router]
       end
       
       subgraph "Remote Catalog :4201"
           CatalogMF[Catalog Module]
       end
       
       subgraph "Remote Detail :4202"
           DetailMF[Detail Module]
       end
       
       subgraph "Remote Compare :4203"
           CompareMF[Compare Module]
       end
       
       Router -->|loadRemoteModule| CatalogMF
       Router -->|loadRemoteModule| DetailMF
       Router -->|loadRemoteModule| CompareMF
   ```

4. **Shared Dependencies**
   - Angular core libs
   - RxJS
   - Domain library

5. **Runtime Manifest**
   - Production URL configuration
   - Dynamic remote loading

6. **Development Workflow**
   - Running all remotes
   - Standalone mode

#### `docs/architecture/data-flow.md`

**Content:**

1. **Overview**
   - How data flows through the application

2. **Catalog Flow**
   ```mermaid
   sequenceDiagram
       participant User
       participant PokeCatalog
       participant CatalogService
       participant Repository
       participant PokeAPIAdapter
       participant PokeAPI
       
       User->>PokeCatalog: Load page
       PokeCatalog->>CatalogService: getPokemonList()
       CatalogService->>Repository: getPokemonList()
       Repository->>PokeAPIAdapter: getPokemonList()
       PokeAPIAdapter->>PokeAPI: GET /pokemon
       PokeAPI-->>PokeAPIAdapter: Response
       PokeAPIAdapter-->>Repository: PokemonPage
       Repository-->>CatalogService: PokemonPage
       CatalogService-->>PokeCatalog: PokemonPage
       PokeCatalog-->>User: Render cards
   ```

3. **Detail Flow**
   - Similar sequence for detail retrieval

4. **Comparison Flow**
   - How two Pokemon are loaded and compared

5. **State Management**
   - Signals usage
   - Component state vs service state

---

## Phase 4: JSDoc Code Documentation

### JSDoc Standard

All components, services, interfaces, and significant functions should have comprehensive JSDoc documentation following this template:

```typescript
/**
 * Brief one-line description of the component/class.
 *
 * @description
 * Detailed explanation of the purpose, behavior, and any important
 * implementation details. This can span multiple lines and include
 * information about:
 * - How the component fits into the larger system
 * - Key behaviors and side effects
 * - Important state management details
 *
 * @example
 * Basic usage:
 * ```html
 * <pc-button variant="primary" (click)="handleClick()">
 *   Click me
 * </pc-button>
 * ```
 *
 * @example
 * With all options:
 * ```html
 * <pc-button
 *   variant="secondary"
 *   size="lg"
 *   [disabled]="isLoading"
 *   [fullWidth]="true"
 *   ariaLabel="Submit form">
 *   Submit
 * </pc-button>
 * ```
 *
 * @usageNotes
 * - Use `primary` variant for main call-to-action buttons
 * - Use `secondary` variant for alternative actions
 * - Use `ghost` variant for subtle or inline actions
 * - Always provide `ariaLabel` when button content is not descriptive
 *
 * @see {@link ButtonVariant} for available variants
 * @see {@link ButtonSize} for available sizes
 *
 * @publicApi
 */
```

### Files Requiring JSDoc

#### UI Library - Atoms

| File | Priority | Notes |
|------|----------|-------|
| `atoms/button/button.ts` | 🔴 High | Core interactive element |
| `atoms/input/input.ts` | 🔴 High | Form element |
| `atoms/label/label.ts` | 🔴 High | Form element |
| `atoms/icon/icon.ts` | 🔴 High | SVG sprite integration |
| `atoms/box/box.ts` | 🟡 Medium | Layout primitive |
| `atoms/stack/stack.ts` | 🟡 Medium | Layout primitive |
| `atoms/cluster/cluster.ts` | 🟡 Medium | Layout primitive |
| `atoms/grid/grid.ts` | 🟡 Medium | Layout primitive |
| `atoms/container/container.ts` | 🟡 Medium | Layout primitive |
| `atoms/center/center.ts` | 🟡 Medium | Layout primitive |
| `atoms/cover/cover.ts` | 🟢 Low | Layout primitive |
| `atoms/frame/frame.ts` | 🟢 Low | Layout primitive |
| `atoms/imposter/imposter.ts` | 🟢 Low | Layout primitive |
| `atoms/reel/reel.ts` | 🟢 Low | Layout primitive |
| `atoms/sidebar/sidebar.ts` | 🟢 Low | Layout primitive |
| `atoms/switcher/switcher.ts` | 🟢 Low | Layout primitive |

#### UI Library - Molecules

| File | Priority | Notes |
|------|----------|-------|
| `molecule/header/header.ts` | 🔴 High | Main navigation |
| `molecule/searchbar/searchbar.ts` | 🔴 High | Search functionality |
| `molecule/paginated-list/paginated-list.ts` | 🔴 High | List container |
| `molecule/theme-toggle/theme-toggle.ts` | 🟡 Medium | Theme switching |

#### Host Application

| File | Priority | Notes |
|------|----------|-------|
| `host/src/app/app.ts` | 🔴 High | Root component |
| `host/src/app/components/home/home.ts` | 🟡 Medium | Landing page |
| `host/src/app/components/not-found/not-found.ts` | 🟢 Low | 404 page |

#### Remote Catalog

| File | Priority | Notes |
|------|----------|-------|
| `remote-catalog/src/app/catalog/components/poke-catalog/poke-catalog.ts` | ⚠️ Partial | Needs enhancement |
| `remote-catalog/src/app/catalog/components/pokemon-card/pokemon-card.ts` | ⚠️ Partial | Needs enhancement |
| `remote-catalog/src/app/catalog/catalog.module.ts` | 🟡 Medium | Entry module |

#### Remote Detail

| File | Priority | Notes |
|------|----------|-------|
| All components in `remote-detail/src/app/` | 🟡 Medium | Feature components |

#### Remote Compare

| File | Priority | Notes |
|------|----------|-------|
| All components in `remote-compare/src/app/` | 🟡 Medium | Feature components |

#### Domain Library (Already Well Documented)

| File | Status | Notes |
|------|--------|-------|
| `domain/src/lib/services/*.ts` | ✅ Done | Good JSDoc |
| `domain/src/lib/ports/*.ts` | ✅ Done | Good JSDoc |
| `domain/src/lib/models/*.ts` | ✅ Done | Good JSDoc |

#### Infra Library

| File | Priority | Notes |
|------|----------|-------|
| `infra/src/lib/adapters/pokeapi.adapter.ts` | ⚠️ Partial | Has some docs, needs enhancement |
| `infra/src/lib/adapters/pokeapi-detail.adapter.ts` | 🟡 Medium | Needs JSDoc |

---

## Phase 5: AGENTS.md in docs/

Create an AGENTS.md for each subprojects, explaining their context in a coding agent efficient format

inside docs/agents/ add the following AGENTS.md that are missing : 

- `docs/agents/analysis-review.md`
- `docs/agents/build.md`
- `docs/agents/testing.md`

---

## Phase 6: Compodoc Integration

### Setup

Add Compodoc script to `package.json`:

```json
{
  "scripts": {
    "docs": "compodoc -p tsconfig.json -d documentation",
    "docs:serve": "compodoc -p tsconfig.json -d documentation -s",
    "docs:watch": "compodoc -p tsconfig.json -d documentation -s -w"
  }
}
```

### Configuration

Create `.compodocrc.json` in root:

```json
{
  "name": "Pokecomparator Documentation",
  "hideGenerator": true,
  "disablePrivate": true,
  "disableProtected": false,
  "disableInternal": true,
  "disableLifeCycleHooks": false,
  "disableRoutesGraph": false,
  "disableCoverage": false,
  "coverageTest": 70,
  "coverageTestThresholdFail": true,
  "customFavicon": "",
  "includes": "docs",
  "includesName": "Documentation"
}
```

### CI Integration

Add to CI/CD pipeline:
```yaml
# In .gitlab-ci.yml or equivalent
docs:
  stage: build
  script:
    - npm ci
    - npm run docs
  artifacts:
    paths:
      - documentation/
```

---

## Implementation Order

| Phase | Task | Effort | Priority | Dependencies |
|-------|------|--------|----------|--------------|
| 1 | Root README.md | Medium | 🔴 High | None |
| 3.1 | `docs/architecture/README.md` | Low | 🔴 High | None |
| 3.2 | `docs/architecture/hexagonal-architecture.md` | Medium | 🔴 High | None |
| 3.3 | `docs/architecture/microfrontend-setup.md` | Medium | 🔴 High | None |
| 3.4 | `docs/architecture/data-flow.md` | Medium | 🟡 Medium | 3.2, 3.3 |
| 2.1 | `projects/domain/README.md` | Medium | 🟡 Medium | 3.2 |
| 2.2 | `projects/infra/README.md` | Low | 🟡 Medium | 2.1 |
| 2.3 | `projects/ui/README.md` | Medium | 🟡 Medium | None |
| 2.4 | `projects/host/README.md` | Low | 🟡 Medium | 3.3 |
| 2.5 | `projects/remote-catalog/README.md` | Low | 🟡 Medium | None |
| 2.6 | `projects/remote-detail/README.md` | Low | 🟡 Medium | None |
| 2.7 | `projects/remote-compare/README.md` | Low | 🟡 Medium | None |
| 4.1 | JSDoc - UI Atoms (High Priority) | High | 🟡 Medium | None |
| 4.2 | JSDoc - UI Molecules | Medium | 🟡 Medium | 4.1 |
| 4.3 | JSDoc - Host App | Low | 🟢 Low | None |
| 4.4 | JSDoc - Remote Catalog | Medium | 🟢 Low | None |
| 4.5 | JSDoc - Remote Detail | Medium | 🟢 Low | None |
| 4.6 | JSDoc - Remote Compare | Medium | 🟢 Low | None |
| 4.7 | JSDoc - Infra Adapters | Low | 🟢 Low | None |
| 5 | AGENTS.md in docs/ | Low | 🟢 Low | None |
| 6 | Compodoc Integration | Low | 🟡 Medium | 4.* |

---

## Acceptance Criteria

### Phase 1 - Root README.md
- [ ] Contains all 13 sections outlined above
- [ ] Includes working quick start instructions
- [ ] Contains high-level architecture diagram (Mermaid)
- [ ] All links are valid

### Phase 2 - Project READMEs
- [ ] Each project has a README.md
- [ ] READMEs follow the outlined structure
- [ ] Contains relevant code examples
- [ ] Links to related documentation

### Phase 3 - Architecture Documentation
- [ ] `docs/architecture/` directory exists
- [ ] All 4 documentation files created
- [ ] Mermaid diagrams render correctly
- [ ] Code examples are accurate

### Phase 4 - JSDoc
- [ ] All high-priority files have comprehensive JSDoc
- [ ] JSDoc includes `@description`, `@example`, `@usageNotes` where applicable
- [ ] Compodoc coverage > 70%

### Phase 5 - AGENTS.md
- [ ] Copy exists in `docs/AGENTS.md`
- [ ] Sync note added

### Phase 6 - Compodoc
- [ ] Scripts added to package.json
- [ ] Configuration file created
- [ ] CI integration documented/added
- [ ] Coverage threshold enforced

---

## Notes

- Mermaid diagrams are used for inline rendering in GitHub/GitLab
- JSDoc follows comprehensive format with examples
- Compodoc will be integrated into the build pipeline
- Priority levels: 🔴 High, 🟡 Medium, 🟢 Low
- Status indicators: ✅ Done, ⚠️ Partial, ❌ Missing
