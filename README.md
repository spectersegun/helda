# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Helda V2 - Modern Web Dashboard

A modern, responsive web application built with React, TypeScript, and Vite. Features a beautiful splash page, secure authentication system, and an intuitive dashboard interface.

## ✨ Features

### 🎨 User Experience
- **Animated Splash Page** - Smooth entrance with Framer Motion animations
- **Secure Authentication** - Login system with protected routes
- **Responsive Dashboard** - Mobile-first design with collapsible sidebar
- **Modern UI Components** - Clean, accessible interface elements

### 🛠️ Technical Stack
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and builds
- **React Router** for client-side navigation
- **Framer Motion** for smooth animations
- **Lucide React** for consistent iconography
- **CSS Grid & Flexbox** for responsive layouts

### 🎯 Figma Dev Integration
- Component structure optimized for Figma Dev workflow
- Semantic HTML with clear prop interfaces
- Consistent naming conventions
- Reusable component architecture
- Design token-ready CSS custom properties

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials
For testing the authentication system:
- **Email:** demo@helda.com
- **Password:** demo123

## 📱 Pages & Features

### Splash Page (`/`)
- Animated logo and welcome text
- Gradient background with floating elements
- Auto-redirect to login or dashboard
- Mobile responsive design

### Login Page (`/login`)
- Clean, modern login form
- Password visibility toggle
- Form validation and error handling
- Demo credentials provided

### Dashboard (`/dashboard`)
- Protected route requiring authentication
- Responsive sidebar navigation
- Statistics cards with animations
- Activity feed and chart placeholders
- User profile management
- Logout functionality

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Main page components
│   ├── SplashPage.tsx  # Landing/splash page
│   ├── LoginPage.tsx   # Authentication page
│   └── Dashboard.tsx   # Main dashboard
├── assets/             # Static assets
├── App.tsx            # Main application component
├── App.css            # Global application styles
├── index.css          # CSS variables and base styles
└── main.tsx           # Application entry point
```

## 🎨 Design System

The application uses a comprehensive design system with:
- **Color Palette:** Primary blues and secondary purples
- **Typography:** Inter font family with consistent sizing
- **Spacing:** Standardized spacing scale
- **Components:** Reusable, accessible UI elements
- **Animations:** Subtle Framer Motion transitions

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Functional components with hooks
- CSS modules for component styling
- Consistent naming conventions
- Accessibility-first approach

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The `dist` folder will contain the optimized production build ready for deployment.

## 🤝 Figma Integration

This project is structured for easy integration with Figma Dev:
1. **Component Props:** Clear TypeScript interfaces
2. **Naming Conventions:** Consistent component and prop naming
3. **CSS Variables:** Design tokens using CSS custom properties
4. **Semantic HTML:** Proper markup for accessibility
5. **Responsive Design:** Mobile-first approach with breakpoints

### 🎨 Figma Dev Ready Components

The following components are optimized for Figma Dev integration:
- `FigmaLogo` - Replace with your logo component from Figma
- `FigmaBackground` - Replace with your background elements
- Design token CSS variables ready for Figma values

### 📋 Quick Figma Integration Steps

1. **Open Figma Dev Mode** on your splash page design
2. **Copy generated React/CSS code** from Figma Dev panel
3. **Replace placeholder components** in `src/components/`
4. **Export assets** to `public/assets/` directory
5. **Update CSS variables** with your design tokens

See `FIGMA-INTEGRATION.md` for detailed instructions.

## 📝 License

This project is licensed under the MIT License.

## 🛟 Support

For questions or issues, please check the documentation or create an issue in the repository.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
