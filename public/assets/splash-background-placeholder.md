# Background Image Placeholder

This file represents where your Figma background image should be placed.

## To Replace This Placeholder:

1. **Export your background image from Figma:**
   - Select your background element in Figma
   - Right panel → Export
   - Choose format: PNG, JPG, or WebP
   - Choose size: 2x for retina displays (3840x2160 for your 1920x1080 design)
   - Export and save as `splash-background.[ext]`

2. **Replace this file** with your exported image

3. **Update the CSS** in `src/components/FigmaBackground.css`:
   ```css
   .figma-background.gradient {
     background: url('/assets/splash-background.jpg') lightgray 50% / cover no-repeat;
   }
   ```

## Recommended Export Settings:
- **Format**: WebP (best compression) or JPG (universal support)
- **Size**: 3840x2160px (2x your design size for crisp display)
- **Quality**: 80-90% for JPG
- **Optimization**: Enable for smaller file sizes

## File Size Tips:
- Keep under 500KB for fast loading
- Use WebP format when possible
- Consider Progressive JPEG for large images
- Test loading speed on slower connections
