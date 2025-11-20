# User Story: Search Pokemon by ID

**ID:** US-001  
**Feature:** Pokemon Comparison Platform  
**Priority:** High  
**Status:** To Do

## User Story

**As a** Pokemon fan  
**I want to** search for a Pokemon using its Pokedex ID number  
**So that I can** quickly find specific Pokemon

## Implementation Plan

### 1. Create Angular Service for PokeAPI Integration
- Create `pokemon.service.ts` in `src/app/services/`
- Implement HTTP client to call PokeAPI endpoint: `https://pokeapi.co/api/v2/pokemon/{id}`
- Add error handling for invalid IDs and network failures
- Implement caching mechanism using Angular's HttpInterceptor or service-level Map

### 2. Create Search Component
- Generate `search.component.ts` in `src/app/components/`
- Add numeric input field with validation (positive integers only)
- Add search button with loading state
- Implement form validation using Angular Reactive Forms
- Bind search action to service method

### 3. Implement Data Model
- Create `pokemon.model.ts` interface in `src/app/models/`
- Define Pokemon interface with properties:
  - `id: number`
  - `name: string`
  - `sprites: { front_default: string, other: { 'official-artwork': { front_default: string } } }`
  - `types: Array<{ slot: number, type: { name: string, url: string } }>`
  - `stats: Array<{ base_stat: number, stat: { name: string } }>`

### 4. Create Pokemon Display Component
- Generate `pokemon-display.component.ts` in `src/app/components/`
- Display Pokemon name (capitalize first letter)
- Show Pokemon image from `sprites.other['official-artwork'].front_default` or `sprites.front_default`
- Render type badges with appropriate colors
- Display all six base stats with labels

### 5. Add Loading and Error States
- Create loading spinner component
- Implement error message display with user-friendly text
- Add retry mechanism for failed requests

### 6. Style Components
- Create CSS for search input and button
- Style Pokemon display card with responsive layout
- Add type badge colors (Fire=red, Water=blue, Grass=green, etc.)
- Ensure mobile responsiveness (min-width: 320px)

## Technical Details

### API Endpoint
```
GET https://pokeapi.co/api/v2/pokemon/{id}
```

### Response Structure (Relevant Fields)
```json
{
  "id": 25,
  "name": "pikachu",
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/.../25.png",
    "other": {
      "official-artwork": {
        "front_default": "https://raw.githubusercontent.com/..."
      }
    }
  },
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "stats": [
    {
      "base_stat": 35,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    }
    // ... other stats
  ]
}
```

### Caching Strategy
- Store Pokemon data in service-level Map: `Map<number, Pokemon>`
- Check cache before making API call
- Cache expiry: session-based (no expiry during single session)

## Gherkin Scenarios

### Scenario 1: Successfully search for Pokemon by valid ID
```gherkin
Given I am on the Pokemon search page
When I enter the ID "25" in the search field
And I click the "Search" button
Then I should see a loading indicator
And the system should call GET https://pokeapi.co/api/v2/pokemon/25
And I should see the Pokemon name "Pikachu" displayed
And I should see the Pokemon image
And I should see the type badge "Electric"
And I should see all six base stats with values
```

### Scenario 2: Search with cached Pokemon data
```gherkin
Given I have previously searched for Pokemon ID "25"
And the Pokemon data is cached in the service
When I enter the ID "25" in the search field
And I click the "Search" button
Then the system should NOT make an API call
And I should immediately see the Pokemon "Pikachu" displayed
And the display should show cached data
```

### Scenario 3: Search for Pokemon with invalid ID (non-existent)
```gherkin
Given I am on the Pokemon search page
When I enter the ID "99999" in the search field
And I click the "Search" button
Then I should see a loading indicator
And the system should call GET https://pokeapi.co/api/v2/pokemon/99999
And the API should return a 404 error
Then I should see an error message "Pokemon not found. Please check the ID and try again."
And the search field should remain populated with "99999"
```

### Scenario 4: Search with invalid input (negative number)
```gherkin
Given I am on the Pokemon search page
When I enter the ID "-5" in the search field
Then the search button should be disabled
And I should see a validation message "Please enter a valid Pokemon ID (positive number)"
```

### Scenario 5: Search with invalid input (non-numeric)
```gherkin
Given I am on the Pokemon search page
When I enter "abc" in the search field
Then the input should not accept the characters
Or the search button should be disabled
And I should see a validation message "Please enter a numeric ID"
```

### Scenario 6: Search with network error
```gherkin
Given I am on the Pokemon search page
And the network connection is unavailable
When I enter the ID "1" in the search field
And I click the "Search" button
Then I should see a loading indicator
And after a timeout period
Then I should see an error message "Unable to connect. Please check your internet connection and try again."
And I should see a "Retry" button
```

### Scenario 7: Display Pokemon with single type
```gherkin
Given I have searched for Pokemon ID "25"
And the API returns Pokemon with type ["electric"]
When the Pokemon information is displayed
Then I should see exactly one type badge
And the badge should display "Electric"
And the badge should have the electric type color (yellow)
```

### Scenario 8: Display Pokemon with dual types
```gherkin
Given I have searched for Pokemon ID "6"
And the API returns Pokemon with types ["fire", "flying"]
When the Pokemon information is displayed
Then I should see two type badges
And the first badge should display "Fire" with red color
And the second badge should display "Flying" with light blue color
```

### Scenario 9: Display all six base stats
```gherkin
Given I have searched for Pokemon ID "25"
When the Pokemon stats are displayed
Then I should see the stat "HP" with value "35"
And I should see the stat "Attack" with value "55"
And I should see the stat "Defense" with value "40"
And I should see the stat "Special Attack" with value "50"
And I should see the stat "Special Defense" with value "50"
And I should see the stat "Speed" with value "90"
```

### Scenario 10: Search on mobile device
```gherkin
Given I am accessing the app on a mobile device with screen width 375px
When I am on the Pokemon search page
Then the search input should be fully visible
And the search button should be accessible
When I search for Pokemon ID "1"
Then the Pokemon display should stack vertically
And the image should be appropriately sized for mobile
And all stats should be readable
```

## Acceptance Criteria

- ✓ User can enter a numeric Pokemon ID in the search field
- ✓ Form validation prevents non-numeric and negative inputs
- ✓ Search button triggers API call to PokeAPI
- ✓ Loading indicator displays during API request
- ✓ Pokemon name is displayed correctly (capitalized)
- ✓ Pokemon official artwork image is displayed
- ✓ All Pokemon types are displayed as colored badges
- ✓ All six base stats are displayed with labels and values
- ✓ Error messages display for invalid IDs (404)
- ✓ Error messages display for network failures
- ✓ Cached data is used for repeated searches
- ✓ Component is responsive on mobile devices (320px+)

## Dependencies

- Angular HttpClient module
- PokeAPI availability
- Pokemon model interface
- Pokemon display component

## Estimated Effort

**Story Points:** 5  
**Time Estimate:** 2-3 days

## Notes

- PokeAPI has no rate limiting, but implement caching as best practice
- Pokemon IDs range from 1 to 1000+ (current generation)
- Official artwork sprites provide better quality than front_default
- Consider lazy loading images for better performance
