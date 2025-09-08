import React from 'react';
import type { BackgroundProps } from '../types/figma-components';
import './FigmaBackground.css';

const FigmaBackground: React.FC<BackgroundProps> = ({ 
  className = '',
  variant = 'gradient'
}) => {
  return (
    <div className={`figma-background ${className} ${variant}`}>
      {/* Figma Dev Generated Structure */}
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="frame" />
        </div>
      </div>
    </div>
  );
};

export default FigmaBackground;
