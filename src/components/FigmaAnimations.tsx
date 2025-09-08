import React from 'react';
import { motion } from 'framer-motion';
import './FigmaAnimations.css';

interface FigmaAnimationsProps {
  children: React.ReactNode;
  className?: string;
}

const FigmaAnimations: React.FC<FigmaAnimationsProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <motion.div
      className={`figma-animations ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            delay: index * 0.1
          }}
          className="figma-animation-item"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FigmaAnimations;
