# User Story: Visualize Pokemon Stats

**ID:** US-004  
**Feature:** Pokemon Comparison Platform  
**Priority:** High  
**Status:** To Do

## User Story

**As a** Pokemon fan  
**I want to** see Pokemon statistics displayed as a chart  
**So that I can** quickly understand stat distribution at a glance

## Implementation Plan

### 1. Choose and Install Chart Library
- Install Chart.js and ng2-charts: `npm install chart.js ng2-charts`
- Or install ngx-charts: `npm install @swimlane/ngx-charts`
- Import required modules in `app.module.ts`
- Register Chart.js plugins if needed

### 2. Create Stats Chart Component
- Generate `stats-chart.component.ts` in `src/app/components/`
- Create @Input() property to receive Pokemon stats data
- Implement chart configuration object
- Choose chart type: Radar (spider) or Bar chart
- Set up responsive canvas element

### 3. Transform Stats Data for Chart
- Create data transformation method in component
- Map API stats to chart format:
  ```typescript
  {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
    datasets: [{
      label: 'Base Stats',
      data: [35, 55, 40, 50, 50, 90] // actual stat values
    }]
  }
  ```
- Maintain consistent stat order

### 4. Configure Chart Appearance
- Set chart dimensions (responsive)
- Configure colors for data points and lines
- Set scales: min value 0, max value 255 (max Pokemon stat)
- Add grid lines for readability
- Configure tooltips to show stat names and values
- Set legend visibility and position

### 5. Implement Radar Chart Option
- Configure radar chart specific options
- Set point style and size
- Configure area fill opacity
- Set angular grid lines
- Adjust scale for balanced display

### 6. Implement Bar Chart Option
- Configure bar chart specific options
- Set horizontal or vertical orientation
- Configure bar colors and widths
- Set axis labels
- Add value labels on bars

### 7. Make Chart Responsive
- Use responsive: true in chart options
- Set maintainAspectRatio appropriately
- Test on different screen sizes
- Adjust dimensions for mobile (320px+)
- Ensure legibility at all sizes

### 8. Add Accessibility Features
- Add aria-label to canvas element
- Provide text alternative for chart data
- Ensure color contrast meets standards
- Add keyboard navigation support

## Technical Details

### Chart.js Configuration (Radar Chart)
```typescript
chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      beginAtZero: true,
      max: 255,
      ticks: {
        stepSize: 50
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.label}: ${context.parsed.r}`;
        }
      }
    }
  }
};

chartData: ChartData<'radar'> = {
  labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
  datasets: [{
    label: 'Base Stats',
    data: [],
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    pointBackgroundColor: 'rgb(75, 192, 192)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(75, 192, 192)'
  }]
};
```

### Chart.js Configuration (Bar Chart)
```typescript
chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  indexAxis: 'y', // horizontal bars
  scales: {
    x: {
      beginAtZero: true,
      max: 255
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

chartData: ChartData<'bar'> = {
  labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
  datasets: [{
    label: 'Base Stats',
    data: [],
    backgroundColor: [
      '#FF5959', // HP - red
      '#F5AC78', // Attack - orange
      '#FAE078', // Defense - yellow
      '#9DB7F5', // Sp. Attack - light blue
      '#A7DB8D', // Sp. Defense - green
      '#FA92B2'  // Speed - pink
    ]
  }]
};
```

### Stat Value Extraction
```typescript
extractStats(pokemon: Pokemon): number[] {
  const statOrder = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  return statOrder.map(statName => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  });
}
```

## Gherkin Scenarios

### Scenario 1: Display radar chart for Pokemon stats
```gherkin
Given the Pokemon "Pikachu" has been loaded
And the stats are HP: 35, Attack: 55, Defense: 40, Sp. Attack: 50, Sp. Defense: 50, Speed: 90
When the stats chart component receives the Pokemon data
Then a radar chart should be displayed
And the chart should have 6 axes labeled: "HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"
And the data points should be plotted at the correct values
And the points should be connected to form a polygon
And the area should be filled with semi-transparent color
```

### Scenario 2: Display bar chart for Pokemon stats
```gherkin
Given the Pokemon "Snorlax" has been loaded
When the bar chart visualization is selected
Then a horizontal bar chart should be displayed
And there should be 6 bars, one for each stat
And each bar should be labeled with the stat name
And the bar length should correspond to the stat value
And each bar should have a distinct color
```

### Scenario 3: Chart scales correctly
```gherkin
Given any Pokemon is displayed with a stats chart
When the chart is rendered
Then the minimum scale value should be 0
And the maximum scale value should be 255
And grid lines should be visible for readability
And tick marks should be displayed at regular intervals
```

### Scenario 4: Chart displays correct stat values
```gherkin
Given the Pokemon "Pikachu" has Speed stat with value 90
When the radar chart is displayed
Then the "Speed" point should be plotted at 90 on the scale
And the tooltip on hover should show "Speed: 90"
And the value should be visually accurate
```

### Scenario 5: Chart is responsive on desktop
```gherkin
Given I am viewing the stats chart on a desktop (1920px width)
When the chart is displayed
Then the chart should fill its container appropriately
And all labels should be clearly readable
And the chart should maintain proper aspect ratio
And no labels should be cut off or overlap
```

### Scenario 6: Chart is responsive on tablet
```gherkin
Given I am viewing the stats chart on a tablet (768px width)
When the chart is displayed
Then the chart should scale to fit the screen
And all labels should remain readable
And the chart should maintain usability
```

### Scenario 7: Chart is responsive on mobile
```gherkin
Given I am viewing the stats chart on a mobile device (375px width)
When the chart is displayed
Then the chart should fit within the screen width
And labels should be readable (possibly with smaller font)
And the chart should remain interactive
And tooltips should work on touch devices
```

### Scenario 8: Chart tooltip on hover (desktop)
```gherkin
Given the stats chart is displayed on a desktop
When I hover my mouse over the "Attack" data point
Then a tooltip should appear
And the tooltip should display "Attack: 55" (or the actual value)
And the tooltip should be clearly visible
```

### Scenario 9: Chart interaction on touch devices
```gherkin
Given the stats chart is displayed on a mobile device
When I tap on a data point
Then the tooltip should appear
And display the stat name and value
And I should be able to tap other points to see their values
```

### Scenario 10: Chart updates when Pokemon changes
```gherkin
Given the stats chart is displaying data for "Pikachu"
When the user searches for a different Pokemon "Charizard"
And the new Pokemon data is loaded
Then the chart should smoothly transition to the new data
And all six stat values should update
And the chart should reflect Charizard's stats
```

### Scenario 11: Chart renders within performance budget
```gherkin
Given a Pokemon's stats are available
When the stats chart component renders
Then the chart should render within 1 second
And the component should not cause frame drops
And the application should remain responsive
```

### Scenario 12: Chart accessibility - aria labels
```gherkin
Given the stats chart is displayed
When a screen reader user accesses the chart
Then the canvas element should have an aria-label
Such as "Pikachu base stats chart"
And the chart should have a text description available
```

### Scenario 13: Chart accessibility - text alternative
```gherkin
Given the stats chart is displayed
When a screen reader user needs the data
Then a text alternative should be available
Such as a table or list showing:
  - HP: 35
  - Attack: 55
  - Defense: 40
  - Sp. Attack: 50
  - Sp. Defense: 50
  - Speed: 90
```

### Scenario 14: Chart with very low stats
```gherkin
Given a Pokemon has very low stats (e.g., all stats below 50)
When the chart is displayed
Then all data points should be visible
And the chart should not appear empty
And the scale should still range from 0 to 255
```

### Scenario 15: Chart with very high stats
```gherkin
Given a Pokemon has very high stats (e.g., Legendary with 150+ in multiple stats)
When the chart is displayed
Then all data points should be plotted accurately
And the high values should be clearly visible
And the chart should not appear distorted
```

### Scenario 16: Chart colors are distinguishable
```gherkin
Given the stats chart is displayed
When using a bar chart with individual stat colors
Then each bar should have a distinct color
And the colors should provide sufficient contrast
And the colors should be distinguishable for colorblind users
```

## Acceptance Criteria

- ✓ Stats are visualized as a radar chart or bar chart
- ✓ Chart displays all six Pokemon base stats
- ✓ Each stat is clearly labeled (HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed)
- ✓ Chart scale ranges from 0 to 255
- ✓ Data points are plotted accurately based on stat values
- ✓ Chart is responsive on mobile (320px+) and desktop
- ✓ Labels remain readable at all screen sizes
- ✓ Chart updates smoothly when Pokemon changes
- ✓ Tooltips show stat names and values on hover/tap
- ✓ Chart renders within 1 second
- ✓ Chart has appropriate aria-label for accessibility
- ✓ Text alternative is available for screen readers
- ✓ Colors meet WCAG contrast requirements
- ✓ Chart maintains aspect ratio appropriately

## Dependencies

- Chart.js and ng2-charts (or ngx-charts)
- Pokemon data with stats array
- Stats data transformation utility
- Responsive CSS/component sizing

## Estimated Effort

**Story Points:** 5  
**Time Estimate:** 2-3 days

## Notes

- Radar charts are traditional for Pokemon stats but may be less accessible
- Bar charts are more accessible and easier to read exact values
- Consider providing both options with a toggle
- Chart.js is lighter than ngx-charts but less Angular-native
- Test chart performance with multiple renders
- Ensure chart is destroyed properly when component unmounts
- Consider adding animation on initial render
- Future enhancement: Add comparison overlay mode
