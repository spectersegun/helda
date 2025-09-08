# Assets Directory

This directory contains all the assets exported from Figma.

## Directory Structure

```
public/assets/
├── images/
│   ├── splash-background.jpg    # Main splash background image
│   ├── splash-background.webp   # Optimized background (preferred)
│   └── hero-illustration.svg    # Main illustration
├── icons/
│   ├── logo.svg                 # Main logo (SVG)
│   ├── logo-white.svg          # White version of logo
│   ├── arrow-right.svg         # Button arrow icon
│   └── user-avatar.svg         # Default user avatar
└── shapes/
    ├── background-shape-1.svg   # Decorative shapes
    ├── background-shape-2.svg
    └── gradient-orb.svg
```

## How to Add Assets from Figma

### 1. Export from Figma
1. Select the element in Figma
2. In the Export panel (right sidebar):
   - Choose **SVG** for icons and simple graphics
   - Choose **PNG** or **WebP** for complex images
   - Set appropriate size (2x for retina displays)
3. Click **Export**

### 2. Optimize Assets
- **SVG**: Use SVGO to optimize SVG files
- **Images**: Use WebP format for better compression
- **Icons**: Ensure they're scalable and accessible

### 3. Update Components
Replace the placeholder comments in components with actual asset paths:

```tsx
// Replace this:
{/* <img src="/assets/logo.svg" alt="Logo" /> */}

// With this:
<img src="/assets/logo.svg" alt="Helda V2 Logo" />
```

## Asset Naming Convention

- Use kebab-case: `background-shape-1.svg`
- Be descriptive: `login-form-background.jpg`
- Include variant suffixes: `logo-white.svg`, `logo-dark.svg`
- Use consistent prefixes: `icon-`, `bg-`, `shape-`

## Performance Tips

1. **Use WebP** for images when possible
2. **Compress SVGs** with SVGO
3. **Lazy load** large images
4. **Use appropriate sizes** - don't export huge images for small UI elements
5. **Consider dark mode** variants of assets
