# Scale Weighing Animation - Implementation Plan

## Overview
Implement an animated weighing scale on the home page that reinforces the comparator theme by showing the scale tilting back and forth as if weighing Pokémon.

## Current State
- Static SVG logo (`assets/ui/logo_colored.svg`)
- No animation (previously had a simple float animation)

## Target State
An animated scale where:
- The beam tilts left and right
- The plates move up and down correspondingly
- The Pokéballs on each plate bob slightly
- Animation loops smoothly and infinitely

## Implementation Steps

### Step 1: Analyze and Split the SVG
1. Open `assets/ui/logo_colored.svg` in a vector editor (Inkscape, Figma, etc.)
2. Identify and separate into distinct groups:
   - **Base/Stand**: The central pillar and base (static)
   - **Beam**: The horizontal bar that tilts (animated - rotation)
   - **Left plate assembly**: Left chain/rope + plate + Pokéball (animated - vertical)
   - **Right plate assembly**: Right chain/rope + plate + Pokéball (animated - vertical)
3. Add appropriate `id` attributes to each group:
   - `id="scale-base"`
   - `id="scale-beam"`
   - `id="scale-left-plate"`
   - `id="scale-right-plate"`
4. Ensure proper transform origins are set for rotation

### Step 2: Create the Animated SVG
Option A: **CSS Animation (Recommended)**
- Embed SVG inline in the template
- Use CSS keyframes to animate each part

Option B: **SMIL Animation**
- Add `<animate>` elements directly in the SVG
- Self-contained but less browser support

### Step 3: CSS Animation Implementation

```css
/* Beam tilts back and forth */
@keyframes beam-tilt {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* Left plate moves inverse to beam tilt */
@keyframes left-plate-bob {
  0%, 100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Right plate moves opposite to left */
@keyframes right-plate-bob {
  0%, 100% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
}

#scale-beam {
  transform-origin: center center;
  animation: beam-tilt 3s ease-in-out infinite;
}

#scale-left-plate {
  animation: left-plate-bob 3s ease-in-out infinite;
}

#scale-right-plate {
  animation: right-plate-bob 3s ease-in-out infinite;
}
```

### Step 4: Template Changes

```html
<!-- Replace img with inline SVG -->
<div class="hero-logo">
  <svg class="logo-animated" viewBox="...">
    <g id="scale-base"><!-- base elements --></g>
    <g id="scale-beam"><!-- beam elements --></g>
    <g id="scale-left-plate"><!-- left plate + pokeball --></g>
    <g id="scale-right-plate"><!-- right plate + pokeball --></g>
  </svg>
</div>
```

### Step 5: Refinements
1. **Timing**: Adjust animation duration (2-4s feels natural for a scale)
2. **Easing**: Use `ease-in-out` for smooth, natural motion
3. **Amplitude**: Keep rotation small (3-8deg) to avoid looking chaotic
4. **Sync**: Ensure all animations are perfectly synced (same duration)

## Technical Considerations

### Transform Origins
- Beam should rotate around its center pivot point
- Plates should move vertically relative to their attachment point

### Performance
- Use `transform` properties (GPU accelerated)
- Avoid animating layout properties
- Consider `will-change: transform` for smoother animation

### Accessibility
- Add `prefers-reduced-motion` media query to disable animation
```css
@media (prefers-reduced-motion: reduce) {
  #scale-beam,
  #scale-left-plate,
  #scale-right-plate {
    animation: none;
  }
}
```

## Alternative: Component-based Approach
Instead of a single SVG, create the scale as separate HTML elements:
- More control over individual parts
- Easier to animate with CSS
- Could add interactivity (hover effects, click to swap sides)

## Estimated Effort
- SVG splitting: 30-60 minutes
- CSS animation: 30 minutes
- Testing & refinement: 30 minutes
- **Total: ~2 hours**

## Future Enhancements
- Interactive: Click to manually tilt the scale
- Dynamic: Show actual Pokémon sprites when comparing
- Reactive: Scale responds to comparison results (heavier side goes down)
