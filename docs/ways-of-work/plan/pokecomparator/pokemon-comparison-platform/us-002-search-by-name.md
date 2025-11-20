# User Story: Search Pokemon by Name

**ID:** US-002  
**Feature:** Pokemon Comparison Platform  
**Priority:** High  
**Status:** To Do

## User Story

**As a** Pokemon fan  
**I want to** search for a Pokemon by typing its name  
**So that I can** find Pokemon without knowing their ID numbers

## Implementation Plan

### 1. Extend Pokemon Service
- Add `getPokemonByName(name: string)` method to `pokemon.service.ts`
- Implement HTTP call to `https://pokeapi.co/api/v2/pokemon/{name}`
- Convert input name to lowercase before API call (API expects lowercase)
- Extend caching to support name-based lookups: `Map<string, Pokemon>`
- Add error handling for invalid names

### 2. Update Search Component
- Modify `search.component.ts` to support both ID and name inputs
- Add text input field that accepts alphanumeric characters and hyphens
- Implement smart detection: if input is numeric, search by ID; otherwise by name
- Add input sanitization (trim whitespace, convert to lowercase)
- Update form validation for text inputs

### 3. Enhance Search UI
- Add toggle or combined input field for ID/Name search
- Display placeholder text: "Enter Pokemon name or ID"
- Add search icon to input field
- Support "Enter" key to trigger search

### 4. Handle Special Characters
- Support Pokemon names with hyphens (e.g., "ho-oh", "porygon-z")
- Handle special forms (e.g., "mr-mime", "mime-jr")
- Normalize input: remove extra spaces, convert to lowercase

### 5. Improve Error Handling
- Distinguish between "not found" and network errors
- Provide specific error messages for name searches
- Suggest checking spelling in error messages
- Maintain user input in field for easy correction

### 6. Add Search History (Optional Enhancement)
- Store recent searches in local storage
- Display dropdown with recent searches
- Limit to 5-10 most recent searches

## Technical Details

### API Endpoint
```
GET https://pokeapi.co/api/v2/pokemon/{name}
```

### Name Format
- API accepts lowercase names only
- Hyphens are used for special characters (e.g., "mr-mime" not "Mr. Mime")
- Spaces are replaced with hyphens
- Special forms: "nidoran-f", "nidoran-m"

### Example Names
- Valid: "pikachu", "charizard", "mr-mime", "ho-oh", "porygon-z"
- Invalid: "Pikachu" (will work but should be lowercased), "mr mime" (needs hyphen)

### Input Validation Rules
- Allow letters (a-z, A-Z)
- Allow hyphens (-)
- Allow numbers (for pokemon like "porygon2")
- Trim leading/trailing whitespace
- Convert to lowercase before API call
- Minimum length: 1 character
- Maximum length: 50 characters

## Gherkin Scenarios

### Scenario 1: Successfully search for Pokemon by name
```gherkin
Given I am on the Pokemon search page
When I enter "pikachu" in the search field
And I click the "Search" button
Then I should see a loading indicator
And the system should call GET https://pokeapi.co/api/v2/pokemon/pikachu
And I should see the Pokemon name "Pikachu" displayed
And I should see the Pokemon image
And I should see the type badge "Electric"
And I should see all six base stats
```

### Scenario 2: Search with mixed case name
```gherkin
Given I am on the Pokemon search page
When I enter "ChArIzArD" in the search field
And I click the "Search" button
Then the system should convert the input to lowercase
And the system should call GET https://pokeapi.co/api/v2/pokemon/charizard
And I should see the Pokemon name "Charizard" displayed
And I should see types "Fire" and "Flying"
```

### Scenario 3: Search with extra whitespace
```gherkin
Given I am on the Pokemon search page
When I enter "  bulbasaur  " in the search field
And I click the "Search" button
Then the system should trim the whitespace
And the system should call GET https://pokeapi.co/api/v2/pokemon/bulbasaur
And I should see the Pokemon "Bulbasaur" displayed
```

### Scenario 4: Search for Pokemon with hyphen in name
```gherkin
Given I am on the Pokemon search page
When I enter "mr-mime" in the search field
And I click the "Search" button
Then the system should call GET https://pokeapi.co/api/v2/pokemon/mr-mime
And I should see the Pokemon name "Mr. Mime" displayed
And I should see the type badge "Psychic"
```

### Scenario 5: Search for Pokemon with number in name
```gherkin
Given I am on the Pokemon search page
When I enter "porygon2" in the search field
And I click the "Search" button
Then the system should call GET https://pokeapi.co/api/v2/pokemon/porygon2
And I should see the Pokemon name "Porygon2" displayed
```

### Scenario 6: Search with non-existent Pokemon name
```gherkin
Given I am on the Pokemon search page
When I enter "fakemon" in the search field
And I click the "Search" button
Then I should see a loading indicator
And the system should call GET https://pokeapi.co/api/v2/pokemon/fakemon
And the API should return a 404 error
Then I should see an error message "Pokemon not found. Please check the spelling and try again."
And the search field should remain populated with "fakemon"
```

### Scenario 7: Search with invalid characters
```gherkin
Given I am on the Pokemon search page
When I enter "pikachu!" in the search field
Then I should see a validation message "Only letters, numbers, and hyphens are allowed"
Or the invalid characters should be automatically removed
And the search field should contain "pikachu"
```

### Scenario 8: Smart detection - numeric input searches by ID
```gherkin
Given I am on the Pokemon search page
And the search field accepts both names and IDs
When I enter "25" in the search field
And I click the "Search" button
Then the system should detect the input as numeric
And the system should call GET https://pokeapi.co/api/v2/pokemon/25
And I should see the Pokemon "Pikachu" displayed
```

### Scenario 9: Smart detection - text input searches by name
```gherkin
Given I am on the Pokemon search page
And the search field accepts both names and IDs
When I enter "pikachu" in the search field
And I click the "Search" button
Then the system should detect the input as text
And the system should call GET https://pokeapi.co/api/v2/pokemon/pikachu
And I should see the Pokemon "Pikachu" displayed
```

### Scenario 10: Press Enter key to search
```gherkin
Given I am on the Pokemon search page
When I enter "squirtle" in the search field
And I press the "Enter" key
Then the search should be triggered automatically
And I should see the Pokemon "Squirtle" displayed
```

### Scenario 11: Search with empty field
```gherkin
Given I am on the Pokemon search page
When I click the "Search" button without entering any text
Then the search button should be disabled
Or I should see a validation message "Please enter a Pokemon name or ID"
And no API call should be made
```

### Scenario 12: Case-insensitive search caching
```gherkin
Given I have previously searched for "PIKACHU"
And the Pokemon data is cached
When I enter "pikachu" in the search field
And I click the "Search" button
Then the system should recognize the cached entry
And I should immediately see the Pokemon "Pikachu" displayed
And no new API call should be made
```

### Scenario 13: Search for regional form
```gherkin
Given I am on the Pokemon search page
When I enter "meowth-alola" in the search field
And I click the "Search" button
Then the system should call GET https://pokeapi.co/api/v2/pokemon/meowth-alola
And I should see the Pokemon "Meowth" displayed
And I should see the type "Dark"
```

### Scenario 14: Display proper name capitalization
```gherkin
Given I have searched for "charizard" (lowercase)
When the Pokemon information is displayed
Then the name should be displayed as "Charizard" (capitalized)
And not "charizard" or "CHARIZARD"
```

## Acceptance Criteria

- ✓ User can enter a Pokemon name in the search field
- ✓ Search works with lowercase, uppercase, and mixed case inputs
- ✓ System automatically converts names to lowercase before API call
- ✓ Whitespace is trimmed from input
- ✓ Pokemon with hyphens in names are supported (mr-mime, ho-oh)
- ✓ Pokemon with numbers in names are supported (porygon2)
- ✓ Invalid names show error message: "Pokemon not found. Please check the spelling and try again."
- ✓ Search field remains populated with user input after errors
- ✓ Search can be triggered by Enter key
- ✓ Empty search field is validated
- ✓ Cached data is used for repeated name searches
- ✓ Pokemon names are displayed with proper capitalization
- ✓ Search works on mobile devices

## Dependencies

- US-001 (Search by ID) completed
- Pokemon service with caching
- Input validation utilities
- Error handling components

## Estimated Effort

**Story Points:** 3  
**Time Estimate:** 1-2 days

## Notes

- PokeAPI name format: lowercase with hyphens for spaces
- Some Pokemon have multiple forms (e.g., "meowth" vs "meowth-alola")
- Special cases: "nidoran-f" (female), "nidoran-m" (male)
- Consider adding name suggestion/autocomplete in future iteration
- Name caching should normalize keys to lowercase
