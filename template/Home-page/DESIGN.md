---
name: Luxe Editorial
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c19'
  on-tertiary-container: '#848480'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e4e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1b1c19'
  on-tertiary-fixed-variant: '#474744'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Georgia
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Georgia
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Georgia
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Georgia
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Literata
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  meta:
    fontFamily: Literata
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  margin-desktop: 80px
  margin-mobile: 20px
  gutter: 32px
  stack-xl: 120px
  stack-lg: 64px
  stack-md: 32px
---

## Brand & Style
The design system is rooted in the "High-End Editorial" aesthetic, mimicking the experience of flipping through a premium physical fashion monograph. The target audience is discerning, fashion-forward individuals who value curation over clutter. 

The visual language utilizes a **Minimalist-Classical** mix: heavy whitespace creates breathing room for high-resolution photography, while refined, razor-thin borders provide structure without bulk. The emotional response should be one of "quiet luxury"—sophisticated, authoritative, and timeless. Every interaction is designed to feel deliberate and graceful.

## Colors
This design system employs a sophisticated, high-contrast palette to establish an editorial hierarchy.

- **Primary (Deep Charcoal):** Used for primary typography, logos, and structural borders. It provides a grounded, authoritative feel.
- **Secondary (Gold Accent):** A muted, metallic gold used sparingly for calls-to-action, active states, and decorative flourishes to signal premium value.
- **Tertiary (Soft Cream):** The primary background color. It is softer than pure white, reducing eye strain and adding a "paper-like" tactile quality to the digital experience.
- **Neutral (Slate Gray):** Used for secondary metadata and body text that requires less visual weight than the headlines.

## Typography
The typography is a dialogue between traditional serif authority and modern readability. 

- **Headlines (Georgia):** Used for all major titles and the brand mark. It should be set with tight tracking in large sizes to emphasize its classical proportions.
- **Body (Literata):** Substituted for the requested Crimson Text to ensure superior digital legibility and a "bookish" warmth that feels high-end. 
- **Labels (Hanken Grotesk):** A clean sans-serif is introduced for navigation elements and utility labels to provide a functional contrast to the serif-heavy narrative content. All labels should be uppercase with generous letter spacing.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop (12 columns, 1200px max-width) centered in the viewport to mimic a magazine spread. 

**Spacing Rhythm:**
- Use "Generous Whitespace": Vertical sections should be separated by `stack-xl` (120px) to allow imagery to breathe.
- **Mobile:** Transition to a single-column fluid layout with 20px side margins. 
- **Asymmetry:** Occasionally break the grid with "Editorial Insets"—images that span 8 columns while text spans the adjacent 4, creating a dynamic, non-templated appearance.

## Elevation & Depth
This design system eschews shadows in favor of **Tonal Layering** and **Refined Outlines**. 

- **Flat Hierarchy:** Depth is communicated through color blocking (e.g., a cream card on a slightly darker "bone" background) rather than Z-axis elevation.
- **Borders:** Use 1px solid lines in Primary (Charcoal) or a 10% opacity version of Primary for subtle containment. 
- **Hover States:** Instead of lifting an element, use a subtle "fade-in" of the Secondary (Gold) color or a slight zoom-in effect on imagery within a clipped container.

## Shapes
The shape language is strictly **Sharp (0px)**. 

Luxury editorial design relies on the precision of right angles. All buttons, image containers, and input fields must have square corners. This reinforces the architectural and "high-fashion" nature of the brand. Rare exceptions are made for circular profile avatars or social media icons to provide a singular point of visual contrast.

## Components

### Navigation
- **Top Bar:** Center-aligned logo using Georgia. Left-side features a "Search" text link (no icon), right-side features social links (Instagram, Pinterest, Vogue) in `label-caps`.
- **Sticky State:** The nav should be ultra-thin (60px height) and semi-transparent with a backdrop blur when scrolling.

### Editorial Cards
- **Seasonal Picks:** Large-scale imagery with a 1px border. The title is overlaid in a Gold box at the bottom-left corner.
- **Article Previews:** Vertical orientation. Image on top, followed by a `label-caps` category, then the Georgia headline. No "Read More" button; the entire card is clickable with a subtle image scale on hover.

### Category Grids
- Use a 3-column masonry layout. Each grid item is separated by a 32px gutter. Top-level categories should use a serif italic `meta` style for descriptions.

### Buttons
- **Primary:** No fill, 1px charcoal border, charcoal text in `label-caps`. 
- **CTA:** Solid Gold fill with Primary (Charcoal) text for high-priority actions like "Subscribe."

### Inputs
- Bottom-border only (1px charcoal). Labels float above in `label-caps`.