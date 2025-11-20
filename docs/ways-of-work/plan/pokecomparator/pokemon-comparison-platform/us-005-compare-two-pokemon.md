# User Story: Compare Two Pokemon

**ID:** US-005  
**Feature:** Pokemon Comparison Platform  
**Priority:** High  
**Status:** To Do

## User Story

**As a** Pokemon fan  
**I want to** compare two Pokemon side-by-side  
**So that I can** see their differences

## Implementation Plan

### 1. Create Comparison State Management
- Add comparison state to Pokemon service or create dedicated ComparisonService
- Maintain state for two Pokemon slots: `pokemon1` and `pokemon2`
- Implement methods:
  - `setPokemon1(pokemon: Pokemon)`
  - `setPokemon2(pokemon: Pokemon)`
  - `clearComparison()`
  - `swapPokemon()`
- Use RxJS BehaviorSubject for reactive state updates

### 2. Create Comparison Container Component
- Generate `comparison-container.component.ts`
- Subscribe to comparison state
- Layout with two columns (desktop) or stacked (mobile)
- Add "Add Pokemon" buttons for empty slots
- Display Pokemon cards when data is available

### 3. Update Search Component for Comparison Mode
- Add mode selection: "View" or "Compare"
- Add slot selection when in Compare mode: "Slot 1" or "Slot 2"
- When Pokemon is searched in Compare mode, add to selected slot
- Provide visual indication of which slot is active

### 4. Create Dual Pokemon Display
- Reuse Pokemon card component for each Pokemon
- Display Pokemon 1 in left panel (or top on mobile)
- Display Pokemon 2 in right panel (or bottom on mobile)
- Ensure both cards have equal width/height
- Add visual separator between cards

### 5. Implement Stats Comparison Visualization
- Create `comparison-chart.component.ts`
- Generate overlaid radar chart or side-by-side bar chart
- Use different colors for each Pokemon
- Add legend to identify which color represents which Pokemon
- Highlight stat differences

### 6. Add Visual Stat Indicators
- Add comparison indicators next to stats
- Show which Pokemon has higher value for each stat
- Use icons (↑, ↓, =) or color coding
- Calculate and display stat difference values

### 7. Implement Comparison Controls
- Add "Clear Comparison" button to reset both slots
- Add "Swap Pokemon" button to switch positions
- Add "Change Pokemon" buttons for each slot
- Provide visual feedback for all actions

### 8. Handle Edge Cases
- Prevent comparing same Pokemon in both slots
- Handle case where only one Pokemon is selected
- Show placeholder or instruction when slots are empty
- Validate that both Pokemon are loaded before showing comparison chart

### 9. Make Comparison Responsive
- Desktop (>768px): Side-by-side layout
- Tablet (768px-1024px): Adjusted side-by-side or stacked
- Mobile (<768px): Stacked vertical layout
- Ensure comparison chart adapts to layout

## Technical Details

### Comparison State Interface
```typescript
interface ComparisonState {
  pokemon1: Pokemon | null;
  pokemon2: Pokemon | null;
  mode: 'idle' | 'comparing' | 'loading';
}
```

### Comparison Service
```typescript
@Injectable({ providedIn: 'root' })
export class ComparisonService {
  private comparisonState = new BehaviorSubject<ComparisonState>({
    pokemon1: null,
    pokemon2: null,
    mode: 'idle'
  });
  
  comparisonState$ = this.comparisonState.asObservable();
  
  setPokemon1(pokemon: Pokemon): void {
    const current = this.comparisonState.value;
    this.comparisonState.next({
      ...current,
      pokemon1: pokemon,
      mode: current.pokemon2 ? 'comparing' : 'idle'
    });
  }
  
  setPokemon2(pokemon: Pokemon): void {
    const current = this.comparisonState.value;
    this.comparisonState.next({
      ...current,
      pokemon2: pokemon,
      mode: current.pokemon1 ? 'comparing' : 'idle'
    });
  }
  
  clearComparison(): void {
    this.comparisonState.next({
      pokemon1: null,
      pokemon2: null,
      mode: 'idle'
    });
  }
  
  swapPokemon(): void {
    const current = this.comparisonState.value;
    this.comparisonState.next({
      pokemon1: current.pokemon2,
      pokemon2: current.pokemon1,
      mode: current.mode
    });
  }
}
```

### Comparison Chart Configuration
```typescript
comparisonChartData: ChartData<'radar'> = {
  labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
  datasets: [
    {
      label: 'Pikachu',
      data: [35, 55, 40, 50, 50, 90],
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.2)'
    },
    {
      label: 'Charizard',
      data: [78, 84, 78, 109, 85, 100],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }
  ]
};
```

## Gherkin Scenarios

### Scenario 1: Enter comparison mode and add first Pokemon
```gherkin
Given I am on the Pokemon search page
When I click the "Compare" mode button
Then I should see two empty comparison slots
And I should see "Add Pokemon to Slot 1" placeholder
And I should see "Add Pokemon to Slot 2" placeholder
When I search for "pikachu"
And I select "Add to Slot 1"
Then Pikachu should be displayed in the left panel (Slot 1)
And Slot 2 should remain empty
```

### Scenario 2: Add second Pokemon to complete comparison
```gherkin
Given "Pikachu" is already in Slot 1
And Slot 2 is empty
When I search for "charizard"
And I select "Add to Slot 2"
Then Charizard should be displayed in the right panel (Slot 2)
And both Pokemon should be displayed side-by-side
And I should see a comparison chart with both Pokemon's stats
```

### Scenario 3: Display side-by-side comparison on desktop
```gherkin
Given I am viewing the comparison on a desktop (1920px width)
And Pikachu is in Slot 1 and Charizard is in Slot 2
Then both Pokemon cards should be displayed side-by-side
And each card should take approximately 50% of the container width
And both cards should be vertically aligned at the top
And a comparison chart should be displayed below the cards
```

### Scenario 4: Display stacked comparison on mobile
```gherkin
Given I am viewing the comparison on a mobile device (375px width)
And Pikachu is in Slot 1 and Charizard is in Slot 2
Then both Pokemon cards should be stacked vertically
And Pikachu (Slot 1) should be displayed at the top
And Charizard (Slot 2) should be displayed below
And the comparison chart should be displayed at the bottom
And all elements should fit within screen width
```

### Scenario 5: Show overlaid comparison chart
```gherkin
Given Pikachu and Charizard are being compared
When the comparison chart is displayed
Then a radar chart should show both Pokemon's stats
And Pikachu's data should be plotted in one color (e.g., yellow)
And Charizard's data should be plotted in another color (e.g., red)
And a legend should identify which line belongs to which Pokemon
And both stat polygons should be visible and distinguishable
```

### Scenario 6: Display stat comparison indicators
```gherkin
Given Pikachu (Speed: 90) and Charizard (Speed: 100) are being compared
When viewing the stat comparison
Then next to Pikachu's Speed stat, I should see a down indicator (↓) or red color
And next to Charizard's Speed stat, I should see an up indicator (↑) or green color
And the difference "+10" should be shown for Charizard's Speed
```

### Scenario 7: Clear comparison
```gherkin
Given Pikachu and Charizard are being compared
When I click the "Clear Comparison" button
Then both Slot 1 and Slot 2 should be emptied
And I should see empty slot placeholders
And the comparison chart should be hidden
And I should be able to start a new comparison
```

### Scenario 8: Swap Pokemon positions
```gherkin
Given Pikachu is in Slot 1 and Charizard is in Slot 2
When I click the "Swap Pokemon" button
Then Charizard should move to Slot 1 (left/top)
And Pikachu should move to Slot 2 (right/bottom)
And the comparison chart should update with the new positions
```

### Scenario 9: Change Pokemon in a slot
```gherkin
Given Pikachu is in Slot 1 and Charizard is in Slot 2
When I click "Change Pokemon" button on Slot 1
And I search for "bulbasaur"
Then Bulbasaur should replace Pikachu in Slot 1
And Charizard should remain in Slot 2
And the comparison chart should update to compare Bulbasaur and Charizard
```

### Scenario 10: Prevent comparing same Pokemon
```gherkin
Given Pikachu is in Slot 1
When I attempt to add Pikachu to Slot 2
Then I should see a validation message "Cannot compare the same Pokemon"
Or the action should be prevented
And Slot 2 should remain empty or show the previous Pokemon
```

### Scenario 11: Comparison with only one Pokemon
```gherkin
Given Pikachu is in Slot 1
And Slot 2 is empty
Then Pikachu should be displayed in its slot
And Slot 2 should show "Add Pokemon to Slot 2" placeholder
And no comparison chart should be displayed
Or the comparison chart should show only Pikachu's data
```

### Scenario 12: Highlight stat differences
```gherkin
Given Pikachu (HP: 35) and Snorlax (HP: 160) are being compared
When viewing the HP stat
Then Pikachu's HP should be visually indicated as lower
And Snorlax's HP should be visually indicated as higher
And the difference "-125" should be shown for Pikachu
And the difference "+125" should be shown for Snorlax
```

### Scenario 13: Comparison chart legend
```gherkin
Given Pikachu and Charizard are being compared
When the comparison chart is displayed
Then a legend should be visible
And the legend should show Pikachu's name with its color
And the legend should show Charizard's name with its color
And clicking on a legend item should toggle that Pokemon's visibility in the chart
```

### Scenario 14: Equal stats indication
```gherkin
Given two Pokemon have the same value for a stat
When viewing that stat in the comparison
Then an equals indicator (=) should be displayed
Or both values should be highlighted in neutral color
And no difference value should be shown
```

### Scenario 15: Comparison persistence
```gherkin
Given Pikachu is in Slot 1 and Charizard is in Slot 2
When I navigate to a different page
And then return to the comparison page
Then the comparison should be maintained
And Pikachu should still be in Slot 1
And Charizard should still be in Slot 2
Note: This scenario is optional for MVP
```

### Scenario 16: Type advantage indication (Enhancement)
```gherkin
Given Charizard (Fire/Flying) is compared with Squirtle (Water)
When viewing the type information
Then Squirtle's Water type should be highlighted as effective against Fire
And Charizard's Fire type should be indicated as weak against Water
Note: This scenario is for future enhancement
```

## Acceptance Criteria

- ✓ User can select "Compare" mode
- ✓ User can add Pokemon to Slot 1 and Slot 2
- ✓ Both Pokemon display side-by-side on desktop (>768px)
- ✓ Both Pokemon stack vertically on mobile (<768px)
- ✓ All Pokemon information (name, image, types, stats) is shown for both
- ✓ Comparison chart displays both Pokemon's stats overlaid
- ✓ Chart uses distinct colors for each Pokemon
- ✓ Legend identifies which Pokemon each color represents
- ✓ Visual indicators show which Pokemon has higher stats
- ✓ User can clear comparison to start over
- ✓ User can swap Pokemon positions
- ✓ User can change Pokemon in individual slots
- ✓ System prevents comparing same Pokemon with itself
- ✓ Comparison is responsive on all device sizes
- ✓ Chart updates smoothly when Pokemon change

## Dependencies

- US-001 (Search by ID) completed
- US-002 (Search by Name) completed
- US-003 (View Pokemon Information) completed
- US-004 (Visualize Stats) completed
- Pokemon card component
- Stats chart component
- Comparison state management service

## Estimated Effort

**Story Points:** 8  
**Time Estimate:** 3-4 days

## Notes

- Consider using Angular CDK Layout for responsive breakpoints
- State management could use NgRx for complex scenarios
- Comparison data persistence requires local storage integration
- Type advantage calculation requires additional PokeAPI data
- Future enhancement: Compare more than 2 Pokemon
- Future enhancement: Share comparison via URL
- Consider adding print/export functionality
- Ensure proper cleanup of subscriptions in components
