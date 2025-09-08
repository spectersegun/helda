# Figma Integration Guide for Helda V2

## 🎨 How to Add Figma Layouts, Styles & Assets

### **Method 1: Figma Dev Mode (Recommended)**

#### Step 1: Setup Figma Dev
1. Open your Figma file
2. Enable **Dev Mode** (toggle in top-right)
3. Select your splash page frame/component
4. Click **Code** tab in the right panel

#### Step 2: Generate & Copy Code
```tsx
// Example of what Figma Dev generates:
const SplashBackground = () => (
  <div style={{
    width: 1440,
    height: 1024,
    background: 'linear-gradient(180deg, #667EEA 0%, #764BA2 100%)',
    borderRadius: 24
  }}>
    {/* Your Figma elements */}
  </div>
)
```

#### Step 3: Replace Components
- Replace `FigmaLogo` component with generated code
- Replace `FigmaBackground` with your background styles
- Update CSS custom properties

### **Method 2: Export Assets from Figma**

#### Step 1: Export Images/SVGs
1. Select elements in Figma
2. Right panel → **Export**
3. Choose format (SVG for icons, PNG/WebP for images)
4. Export to `public/assets/` folder

#### Step 2: Export Design Tokens
```css
/* Copy from Figma Dev or use tokens */
:root {
  --primary-color: #667EEA;    /* From Figma color styles */
  --secondary-color: #764BA2;
  --spacing-xl: 64px;          /* From Figma spacing */
  --border-radius-lg: 24px;    /* From Figma corner radius */
  --font-size-hero: 48px;      /* From Figma typography */
}
```

### **Method 3: Figma Plugins Integration**

#### Recommended Plugins:
1. **Figma to Code** - Generates React components
2. **Design Tokens** - Exports CSS variables
3. **Figma to CSS** - Converts styles to CSS

## 🚀 Quick Integration Steps

### 1. Replace Logo Component
```tsx
// In src/components/FigmaLogo.tsx
import YourFigmaLogo from './YourFigmaLogo'; // Generated from Figma

const FigmaLogo = () => (
  <YourFigmaLogo className="logo-animation" />
);
```

### 2. Update Background Styles
```css
/* In src/components/FigmaBackground.css */
.figma-background.gradient {
  /* Paste your Figma gradient here */
  background: linear-gradient(135deg, #YOUR_COLORS);
}
```

### 3. Add Figma Assets
```
public/
├── assets/
│   ├── splash-logo.svg      # Exported from Figma
│   ├── background-shape.png # Exported from Figma
│   └── icons/
│       ├── arrow-right.svg
│       └── user-avatar.svg
```

### 4. Use Figma Design Tokens
```css
/* Update src/index.css with Figma values */
:root {
  --primary-500: #YOUR_PRIMARY_FROM_FIGMA;
  --gradient-hero: linear-gradient(/* From Figma */);
  --shadow-large: /* Copy from Figma drop shadow */;
}
```

## 📱 Component Structure for Figma Dev

Your components are structured to work seamlessly with Figma Dev:

```tsx
// Figma-ready component structure
interface FigmaComponentProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  // Props match Figma component properties
}

const FigmaComponent: React.FC<FigmaComponentProps> = ({
  className,
  variant = 'primary'
}) => (
  <div className={`figma-component ${variant} ${className}`}>
    {/* Generated Figma code goes here */}
  </div>
);
```

## 🎯 Next Steps

1. **Open your Figma file in Dev Mode**
2. **Select your splash page design**  
3. **Copy the generated React/CSS code**
4. **Replace the placeholder components** with your Figma code
5. **Export any image assets** to `public/assets/`
6. **Update CSS custom properties** with Figma design tokens

## 💡 Pro Tips

- Use **Figma Auto Layout** for responsive components
- Export **SVG icons** for crisp scaling
- Use **Figma Variables** for design tokens
- Test components in both light/dark modes
- Optimize images with WebP format for better performance
