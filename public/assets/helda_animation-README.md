# Animation Asset Setup

Your Figma code references an animated GIF: `helda_animation.gif`

## 🎬 To Add Your Animation

### Step 1: Export from Figma
1. In Figma, select your animated element or prototype
2. Use a Figma plugin like **"GIF Export"** or **"LottieFiles"**
3. Export as GIF or consider Lottie/JSON for better performance

### Step 2: Place the File
1. Save your animation as `helda_animation.gif`
2. Place it in this directory: `public/assets/helda_animation.gif`

### Step 3: Alternative Formats (Recommended)
For better performance, consider these formats:

#### **Lottie Animation (Best)**
```jsx
import Lottie from 'lottie-react';
import animationData from '/assets/helda_animation.json';

<Lottie animationData={animationData} />
```

#### **WebM Video (Good)**
```css
.overlap-group {
    background-image: url('/assets/helda_animation.webm');
}
```

#### **CSS Animation (Lightweight)**
Create CSS keyframes instead of using a large GIF file.

## 🎯 Current Status
- ✅ CSS structure ready
- ✅ File path configured
- ⏳ Waiting for `helda_animation.gif` file

## 📏 Recommended Specs
- **Size**: 1920x1080px (matching your layout)
- **Format**: GIF, WebM, or Lottie JSON
- **Duration**: 2-5 seconds for good UX
- **File Size**: Under 1MB for fast loading

Once you add the file, your animation will appear automatically! 🚀
