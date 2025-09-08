import React from 'react';
import FigmaAnimationDemo from '../components/FigmaAnimationDemo';
import './AnimationShowcase.css';

const AnimationShowcase: React.FC = () => {
  return (
    <div className="animation-showcase">
      <div className="showcase-header">
        <h1>Figma Animation Showcase</h1>
        <p>All your custom animations from figma-examples.css in action</p>
      </div>
      
      <FigmaAnimationDemo />
      
      <div className="showcase-footer">
        <p>Animations are optimized for performance and accessibility</p>
        <small>Respects user's reduced-motion preferences</small>
      </div>
    </div>
  );
};

export default AnimationShowcase;
