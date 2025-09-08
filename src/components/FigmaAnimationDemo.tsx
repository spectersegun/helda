import React from 'react';
import '../styles/figma-animations.css';

interface FigmaAnimationDemoProps {
  className?: string;
}

const FigmaAnimationDemo: React.FC<FigmaAnimationDemoProps> = ({ className = '' }) => {
  return (
    <div className={`figma-animation-demo ${className}`}>
      {/* Complex animated background */}
      <div className="figma-complex-background" style={{ padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '1rem' }}>
          Animated Background from Figma
        </h3>
        
        {/* Animated logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div className="figma-example-logo">
            <span style={{ color: 'white', fontSize: '2rem' }}>H</span>
          </div>
        </div>
        
        {/* Animated text */}
        <div className="figma-example-text" style={{ marginBottom: '2rem' }}>
          HELDA V2 - Powered by Figma Animations
        </div>
        
        {/* Animated button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="figma-button-example">
            Experience the Magic
          </button>
        </div>
      </div>
      
      {/* Additional animation examples */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        
        {/* Pulse animation */}
        <div className="figma-pulse" style={{ 
          padding: '1rem', 
          background: 'rgba(102, 126, 234, 0.1)', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4>Pulse Animation</h4>
          <p>Gentle breathing effect</p>
        </div>
        
        {/* Slide up animation */}
        <div className="figma-slide-up" style={{ 
          padding: '1rem', 
          background: 'rgba(118, 75, 162, 0.1)', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4>Slide Up</h4>
          <p>Smooth entrance animation</p>
        </div>
        
        {/* Fade scale animation */}
        <div className="figma-fade-scale" style={{ 
          padding: '1rem', 
          background: 'rgba(102, 126, 234, 0.1)', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4>Fade & Scale</h4>
          <p>Elegant appearance effect</p>
        </div>
        
        {/* Shimmer loading */}
        <div className="figma-shimmer" style={{ 
          padding: '1rem', 
          background: '#f0f0f0', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4>Shimmer Loading</h4>
          <p>Perfect for loading states</p>
        </div>
        
        {/* Bounce animation */}
        <div className="figma-bounce" style={{ 
          padding: '1rem', 
          background: 'rgba(118, 75, 162, 0.1)', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4>Bounce Effect</h4>
          <p>Playful interaction feedback</p>
        </div>
        
        {/* Rotation animation */}
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(102, 126, 234, 0.1)', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div className="figma-rotate" style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            ↻
          </div>
          <h4>Rotation</h4>
          <p>Continuous spinning</p>
        </div>
      </div>
      
      {/* Usage instructions */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#f8fafc', 
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h4 style={{ marginTop: 0, color: '#334155' }}>Animation Classes Available:</h4>
        <ul style={{ color: '#64748b', lineHeight: '1.6' }}>
          <li><code>.figma-complex-background</code> - Multi-layer animated background</li>
          <li><code>.figma-example-logo</code> - Glowing, floating logo animation</li>
          <li><code>.figma-example-text</code> - Text with glow effects</li>
          <li><code>.figma-button-example</code> - Interactive button with shimmer</li>
          <li><code>.figma-pulse</code> - Gentle pulse animation</li>
          <li><code>.figma-slide-up</code> - Slide up entrance</li>
          <li><code>.figma-fade-scale</code> - Fade in with scale</li>
          <li><code>.figma-shimmer</code> - Loading shimmer effect</li>
          <li><code>.figma-bounce</code> - Bounce animation</li>
          <li><code>.figma-rotate</code> - Continuous rotation</li>
        </ul>
      </div>
    </div>
  );
};

export default FigmaAnimationDemo;
