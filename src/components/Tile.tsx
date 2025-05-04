import React from 'react';

interface TileProps {
  value: number;
  row: number;
  col: number;
  isSwapMode?: boolean;
  isSelected?: boolean;
  onClick?: (row: number, col: number) => void;
}

const Tile: React.FC<TileProps> = ({ value, row, col, isSwapMode, isSelected, onClick }) => {
  // Calculate tile colors based on value
  const getTileColors = () => {
    const colorMap: Record<number, { bg: string, text: string }> = {
      2: { bg: 'bg-amber-50', text: 'text-amber-900' },
      4: { bg: 'bg-amber-100', text: 'text-amber-900' },
      8: { bg: 'bg-amber-200', text: 'text-amber-900' },
      16: { bg: 'bg-amber-300', text: 'text-amber-900' },
      32: { bg: 'bg-amber-400', text: 'text-amber-900' },
      64: { bg: 'bg-amber-500', text: 'text-white' },
      128: { bg: 'bg-amber-600', text: 'text-white' },
      256: { bg: 'bg-amber-700', text: 'text-white' },
      512: { bg: 'bg-amber-800', text: 'text-white' },
      1024: { bg: 'bg-amber-900', text: 'text-white' },
      2048: { bg: 'bg-yellow-500', text: 'text-white' },
    };
    
    return colorMap[value] || { bg: 'bg-gray-800', text: 'text-white' };
  };

  const { bg, text } = getTileColors();
  
  // Calculate font size based on value length
  const getFontSize = () => {
    if (value < 100) return 'text-5xl md:text-6xl';
    if (value < 1000) return 'text-4xl md:text-5xl';
    return 'text-3xl md:text-4xl';
  };

  return (
    <div 
      className={`absolute rounded-lg aspect-square flex items-center justify-center font-bold transition-all duration-200 animate-pop cursor-default
        ${bg} ${text} ${getFontSize()}
        ${isSwapMode ? 'cursor-pointer hover:ring-4 hover:ring-amber-400 hover:ring-opacity-50' : ''}
        ${isSelected ? 'ring-4 ring-amber-400' : ''}
      `}
      style={{
        top: `calc(${row} * (100% / 4))`,
        left: `calc(${col} * (100% / 4))`,
        width: 'calc(100% / 4 - 1rem)',
        height: 'calc(100% / 4 - 1rem)',
        transform: 'translate(1rem, 1rem)',
        zIndex: 10,
      }}
      onClick={() => onClick?.(row, col)}
    >
      {value}
    </div>
  );
};

export default Tile;