// Types for Figma-generated components
export interface SplashPageProps {
  className?: string;
}

export interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export interface BackgroundProps {
  className?: string;
  variant?: 'gradient' | 'image' | 'pattern';
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}
