# Standalone Mode Feature Flags

## Overview

When running remotes in standalone mode (outside the host), certain features that depend on cross-remote navigation or host context should be disabled. This document outlines the implementation plan for feature flags that detect and handle standalone vs. integrated mode.

## Problem Statement

Each remote can run:
1. **Integrated Mode**: Loaded inside the host via Module Federation - full features available
2. **Standalone Mode**: Running independently on its own port - limited features

Features that should be disabled in standalone mode:
- **remote-detail**: "Compare with another Pokémon" search/button
- **remote-catalog**: Navigation to detail/compare pages (could redirect to host)
- **remote-compare**: Pokémon search that links to detail pages

## Proposed Solution: Injection Token + Detection Service

### Step 1: Create the Injection Token

Location: `projects/ui/src/lib/services/standalone-detection.service.ts`

```typescript
import { Injectable, InjectionToken, inject } from '@angular/core';

/**
 * Token to determine if the app is running in standalone mode
 * (outside of the host's module federation context)
 */
export const IS_STANDALONE = new InjectionToken<boolean>('IS_STANDALONE', {
  providedIn: 'root',
  factory: () => {
    // When loaded via module federation, webpack creates shared scopes
    return !(window as any).__webpack_share_scopes__;
  }
});

/**
 * Service for managing feature availability based on runtime context
 */
@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  private readonly isStandalone = inject(IS_STANDALONE);

  /**
   * Features that require host context
   */
  readonly features = {
    /** Can navigate to comparison page */
    comparison: !this.isStandalone,
    /** Can navigate to detail page from catalog */
    detailNavigation: !this.isStandalone,
    /** Can navigate between remotes */
    crossRemoteNavigation: !this.isStandalone,
    /** Shows "Back to main app" link */
    showHostLink: this.isStandalone,
  };

  /**
   * Check if a specific feature is enabled
   */
  isEnabled(feature: keyof typeof this.features): boolean {
    return this.features[feature];
  }
}
```

### Step 2: Export from UI Library

Location: `projects/ui/src/public-api.ts`

```typescript
// Add to existing exports
export { IS_STANDALONE, FeatureFlagsService } from './lib/services/standalone-detection.service';
```

### Step 3: Implementation per Remote

#### remote-detail

**File**: `projects/remote-detail/src/app/detail/components/poke-detail/poke-detail.ts`

```typescript
import { FeatureFlagsService } from '@ui';

@Component({...})
export class PokeDetail {
  // ... existing code
  
  readonly featureFlags = inject(FeatureFlagsService);
}
```

**File**: `projects/remote-detail/src/app/detail/components/poke-detail/poke-detail.html`

```html
<!-- Wrap comparison feature -->
@if (featureFlags.isEnabled('comparison')) {
  <div class="comparison-search">
    <!-- existing comparison search UI -->
  </div>
}
```

#### remote-catalog

**File**: `projects/remote-catalog/src/app/catalog/components/pokemon-card/pokemon-card.ts`

```typescript
import { FeatureFlagsService } from '@ui';

@Component({...})
export class PokemonCard {
  readonly featureFlags = inject(FeatureFlagsService);
  
  onCardClick(): void {
    if (this.featureFlags.isEnabled('detailNavigation')) {
      this.router.navigate(['/detail', this.pokemon.id]);
    }
    // In standalone, card click does nothing or shows a message
  }
}
```

#### remote-compare

**File**: `projects/remote-compare/src/app/compare/components/poke-compare/poke-compare.ts`

```typescript
import { FeatureFlagsService } from '@ui';

@Component({...})
export class PokeCompare {
  readonly featureFlags = inject(FeatureFlagsService);
}
```

**Template**: Disable links to detail pages in standalone mode.

### Step 4: Add "Back to Host" Link (Optional)

For standalone mode, add a link to return to the main application:

```html
@if (featureFlags.isEnabled('showHostLink')) {
  <a href="http://localhost:4200" class="back-to-host">
    ← Back to PokeComparator
  </a>
}
```

## Testing

### Unit Tests

```typescript
describe('FeatureFlagsService', () => {
  it('should detect standalone mode when no webpack share scopes', () => {
    // Mock window without __webpack_share_scopes__
    const service = TestBed.inject(FeatureFlagsService);
    expect(service.isEnabled('comparison')).toBe(false);
  });

  it('should enable features in integrated mode', () => {
    // Mock window with __webpack_share_scopes__
    (window as any).__webpack_share_scopes__ = {};
    const service = TestBed.inject(FeatureFlagsService);
    expect(service.isEnabled('comparison')).toBe(true);
  });
});
```

### Manual Testing

1. Run `npm run run:all` - verify all features work
2. Run individual remote `ng serve remote-detail` - verify comparison feature is hidden
3. Run individual remote `ng serve remote-catalog` - verify detail navigation is disabled

## Implementation Checklist

### Phase 1: Core Infrastructure
- [ ] Create `IS_STANDALONE` token in UI library
- [ ] Create `FeatureFlagsService` in UI library
- [ ] Export from `public-api.ts`
- [ ] Add unit tests for detection logic

### Phase 2: remote-detail
- [ ] Inject `FeatureFlagsService` in `PokeDetail`
- [ ] Wrap comparison search UI with feature flag check
- [ ] Add "Back to host" link for standalone mode
- [ ] Test standalone behavior

### Phase 3: remote-catalog
- [ ] Inject `FeatureFlagsService` in `PokemonCard`
- [ ] Conditionally enable/disable card click navigation
- [ ] Show visual indicator when navigation is disabled
- [ ] Test standalone behavior

### Phase 4: remote-compare
- [ ] Inject `FeatureFlagsService` in `PokeCompare`
- [ ] Disable detail page links in standalone mode
- [ ] Test standalone behavior

## Future Enhancements

1. **Environment-based overrides**: Allow feature flags to be overridden via environment variables
2. **Remote configuration**: Fetch feature flags from a remote config service
3. **Graceful degradation**: Show informative messages when features are disabled
4. **Deep linking**: In standalone mode, provide copy-able links to the integrated app
