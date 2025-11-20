# User Story: View Pokemon Information

**ID:** US-003  
**Feature:** Pokemon Comparison Platform  
**Priority:** High  
**Status:** To Do

## User Story

**As a** Pokemon fan  
**I want to** see a Pokemon's name, image, types, and stats  
**So that I can** understand its characteristics

## Implementation Plan

### 1. Create Pokemon Display Component
- Generate `pokemon-card.component.ts` in `src/app/components/`
- Create component template with sections for:
  - Pokemon name header
  - Pokemon image
  - Type badges container
  - Stats list
- Implement @Input() decorator to receive Pokemon data
- Add loading state placeholder

### 2. Implement Name Display
- Create text transform pipe: `capitalize.pipe.ts`
- Convert API name format (lowercase with hyphens) to display format
- Handle special cases:
  - "mr-mime" → "Mr. Mime"
  - "ho-oh" → "Ho-Oh"
  - "porygon-z" → "Porygon-Z"
  - "nidoran-f" → "Nidoran ♀"
  - "nidoran-m" → "Nidoran ♂"

### 3. Implement Image Display
- Primary image source: `sprites.other['official-artwork'].front_default`
- Fallback image source: `sprites.front_default`
- Add image loading state with placeholder
- Implement lazy loading for performance
- Add alt text for accessibility: "Image of [Pokemon Name]"
- Handle missing images gracefully

### 4. Create Type Badge Component
- Generate `type-badge.component.ts` in `src/app/components/`
- Create type-to-color mapping object
- Style badges with rounded corners and type colors
- Make badges responsive
- Handle single and dual-type Pokemon

### 5. Implement Stats Display
- Create `stats-list.component.ts` in `src/app/components/`
- Map API stat names to display names:
  - "hp" → "HP"
  - "attack" → "Attack"
  - "defense" → "Defense"
  - "special-attack" → "Sp. Attack"
  - "special-defense" → "Sp. Defense"
  - "speed" → "Speed"
- Display stat names and values in readable format
- Optionally add stat bars for visual representation

### 6. Style Pokemon Card
- Create responsive card layout
- Add shadow and border for card effect
- Ensure proper spacing between elements
- Implement mobile-first responsive design
- Add hover effects for interactivity

### 7. Add Loading State
- Create skeleton loader for card
- Show placeholder for image while loading
- Display loading animation

## Technical Details

### Pokemon Data Structure
```typescript
interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
      url: string;
    }
  }>;
}
```

### Type Color Mapping
```typescript
const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};
```

### Stat Name Mapping
```typescript
const STAT_NAMES = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  'speed': 'Speed'
};
```

## Gherkin Scenarios

### Scenario 1: Display Pokemon with all information
```gherkin
Given the Pokemon service has fetched data for "Pikachu"
When the Pokemon card component receives the data
Then I should see the name "Pikachu" displayed in the header
And I should see the official artwork image
And I should see one type badge labeled "Electric" with yellow color
And I should see six stats displayed:
  | Stat Name    | Value |
  | HP           | 35    |
  | Attack       | 55    |
  | Defense      | 40    |
  | Sp. Attack   | 50    |
  | Sp. Defense  | 50    |
  | Speed        | 90    |
```

### Scenario 2: Display Pokemon with dual types
```gherkin
Given the Pokemon service has fetched data for "Charizard"
When the Pokemon card component receives the data
Then I should see the name "Charizard"
And I should see two type badges
And the first badge should display "Fire" with red color (#F08030)
And the second badge should display "Flying" with light purple color (#A890F0)
```

### Scenario 3: Display Pokemon name with hyphen
```gherkin
Given the Pokemon service has fetched data for "mr-mime"
When the Pokemon card component receives the data
Then the name should be displayed as "Mr. Mime"
And not "mr-mime" or "Mr-Mime"
```

### Scenario 4: Display Pokemon with special name formatting
```gherkin
Given the Pokemon service has fetched data for "ho-oh"
When the Pokemon card component receives the data
Then the name should be displayed as "Ho-Oh"
And both words should be capitalized
```

### Scenario 5: Handle missing official artwork
```gherkin
Given the Pokemon data has no official artwork sprite
And the front_default sprite is available
When the Pokemon card component receives the data
Then the component should display the front_default sprite
And the image should be visible
```

### Scenario 6: Handle missing all images
```gherkin
Given the Pokemon data has no sprites available
When the Pokemon card component receives the data
Then a placeholder image should be displayed
Or a Pokemon icon should be shown
And the alt text should indicate missing image
```

### Scenario 7: Display loading state
```gherkin
Given the Pokemon data is being fetched
When the Pokemon card component is waiting for data
Then I should see a skeleton loader
And I should see placeholder shapes for:
  - Pokemon name
  - Image area
  - Type badges
  - Stats list
```

### Scenario 8: Stats displayed in correct order
```gherkin
Given the Pokemon data contains six stats
When the stats are displayed
Then the stats should appear in this order:
  1. HP
  2. Attack
  3. Defense
  4. Sp. Attack
  5. Sp. Defense
  6. Speed
```

### Scenario 9: Display stat values correctly
```gherkin
Given the Pokemon "Snorlax" has HP stat with base_stat value 160
When the stats are displayed
Then I should see "HP" label
And I should see the value "160"
And the value should be clearly associated with the HP label
```

### Scenario 10: Responsive layout on mobile
```gherkin
Given I am viewing the Pokemon card on a mobile device (375px width)
When the card is displayed
Then the card should fit within the screen width
And the image should be appropriately sized (not overflow)
And the type badges should be readable
And the stats should be clearly visible
And no horizontal scrolling should be required
```

### Scenario 11: Responsive layout on desktop
```gherkin
Given I am viewing the Pokemon card on a desktop (1920px width)
When the card is displayed
Then the card should have a maximum width constraint
And the card should be centered or properly aligned
And the image should maintain aspect ratio
And all elements should be proportionally sized
```

### Scenario 12: Type badge color accuracy
```gherkin
Given the Pokemon "Bulbasaur" has types "grass" and "poison"
When the type badges are displayed
Then the "Grass" badge should have color #78C850 (green)
And the "Poison" badge should have color #A040A0 (purple)
And the text should be readable against the background color
```

### Scenario 13: Accessibility - Image alt text
```gherkin
Given a Pokemon "Pikachu" is displayed
When a screen reader reads the image
Then the alt text should be "Image of Pikachu"
Or "Pikachu official artwork"
And the alt text should be descriptive
```

### Scenario 14: Accessibility - Stat information
```gherkin
Given a Pokemon's stats are displayed
When a screen reader reads the stats
Then each stat name should be properly announced
And each stat value should be associated with its name
And the information should be navigable
```

### Scenario 15: Card hover effect (desktop)
```gherkin
Given I am viewing the Pokemon card on a desktop
When I hover my mouse over the card
Then the card should show a visual hover effect
Such as a subtle shadow increase or slight scale
And the transition should be smooth
```

## Acceptance Criteria

- ✓ Pokemon name is displayed with proper capitalization
- ✓ Special name formats are handled correctly (Mr. Mime, Ho-Oh)
- ✓ Pokemon official artwork image is displayed
- ✓ Fallback to front_default sprite if artwork unavailable
- ✓ Placeholder shown if no images available
- ✓ All Pokemon types are displayed as colored badges
- ✓ Type colors match Pokemon type standards
- ✓ Dual-type Pokemon show both types in correct order
- ✓ All six base stats are displayed with labels
- ✓ Stat names are properly formatted (HP, Attack, Sp. Attack, etc.)
- ✓ Stat values are clearly associated with labels
- ✓ Loading state is shown while data loads
- ✓ Card is responsive on mobile (320px+) and desktop
- ✓ Images have appropriate alt text for accessibility
- ✓ Layout maintains proper spacing and alignment

## Dependencies

- Pokemon data model interface
- Pokemon service with data fetching
- Type color constants
- Capitalize/format name pipe
- CSS styling framework or custom styles

## Estimated Effort

**Story Points:** 5  
**Time Estimate:** 2-3 days

## Notes

- Consider using Angular Material cards for consistent styling
- Image lazy loading can improve performance
- Type colors should match official Pokemon game colors
- Consider adding Pokemon ID display
- Future enhancement: Add Pokemon height, weight, abilities
- Consider adding stat total calculation
