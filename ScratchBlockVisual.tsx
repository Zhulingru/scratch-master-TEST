import React from 'react';
import { BlockCategory } from '../types';

interface ScratchBlockVisualProps {
  category: BlockCategory;
  className?: string;
}

const ScratchBlockVisual: React.FC<ScratchBlockVisualProps> = ({ category, className = '' }) => {
  const getColor = (cat: BlockCategory) => {
    switch (cat) {
      case BlockCategory.Motion: return '#4C97FF';
      case BlockCategory.Looks: return '#9966FF';
      case BlockCategory.Sound: return '#CF63CF';
      case BlockCategory.Events: return '#FFBF00';
      case BlockCategory.Control: return '#FFAB19';
      case BlockCategory.Sensing: return '#5CB1D6';
      case BlockCategory.Operators: return '#59C059';
      case BlockCategory.Variables: return '#FF8C1A';
      default: return '#999';
    }
  };

  const color = getColor(category);

  // SVG Paths for different block shapes
  const renderShape = () => {
    switch (category) {
      case BlockCategory.Events: // Hat block
        return (
          <path
            d="M 0 12 C 0 8 2 4 15 4 C 25 4 35 12 50 12 L 150 12 A 4 4 0 0 1 154 16 L 154 46 A 4 4 0 0 1 150 50 L 24 50 L 20 54 L 12 54 L 8 50 L 4 50 A 4 4 0 0 1 0 46 Z"
            fill={color}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="1"
          />
        );
      case BlockCategory.Control: // C-block (Loop)
        return (
          <path
            d="M 0 4 A 4 4 0 0 1 4 0 L 8 0 L 12 4 L 20 4 L 24 0 L 150 0 A 4 4 0 0 1 154 4 L 154 36 A 4 4 0 0 1 150 40 L 44 40 L 40 44 L 32 44 L 28 40 L 24 40 A 4 4 0 0 0 20 44 L 20 66 A 4 4 0 0 0 24 70 L 150 70 A 4 4 0 0 1 154 74 L 154 96 A 4 4 0 0 1 150 100 L 24 100 L 20 104 L 12 104 L 8 100 L 4 100 A 4 4 0 0 1 0 96 Z"
            fill={color}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="1"
          />
        );
      default: // Stack block (Motion, Looks, etc.)
        return (
          <path
            d="M 0 4 A 4 4 0 0 1 4 0 L 8 0 L 12 4 L 20 4 L 24 0 L 150 0 A 4 4 0 0 1 154 4 L 154 36 A 4 4 0 0 1 150 40 L 24 40 L 20 44 L 12 44 L 8 40 L 4 40 A 4 4 0 0 1 0 36 Z"
            fill={color}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="1"
          />
        );
    }
  };

  const getIcon = () => {
    switch (category) {
        case BlockCategory.Events:
            return <text x="20" y="32" fill="white" fontSize="14" fontWeight="bold">當...</text>;
        case BlockCategory.Control:
            return <text x="35" y="25" fill="white" fontSize="14" fontWeight="bold">重複...</text>;
        case BlockCategory.Motion:
            return <text x="35" y="25" fill="white" fontSize="14" fontWeight="bold">移動...</text>;
        case BlockCategory.Looks:
            return <text x="35" y="25" fill="white" fontSize="14" fontWeight="bold">說出...</text>;
        default:
            return <text x="35" y="25" fill="white" fontSize="14" fontWeight="bold">...</text>;
    }
  }

  return (
    <div className={`flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 ${className}`}>
        <svg width="160" height="110" viewBox="0 -5 160 115" className="drop-shadow-sm transform hover:scale-105 transition-transform duration-300">
        {renderShape()}
        {getIcon()}
        </svg>
    </div>
  );
};

export default ScratchBlockVisual;