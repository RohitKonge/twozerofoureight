import React, { useEffect } from 'react';
import Tile from './Tile';
import { TileType, Grid, SwapState, DeleteState, TeleportState } from '../types';
import { RefreshCw } from 'lucide-react';

interface BoardProps {
  grid: Grid;
  gameOver: boolean;
  won: boolean;
  score: number;
  resetGame: () => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  initializeTouchListeners: () => () => void;
  swapState: SwapState;
  deleteState: DeleteState;
  teleportState: TeleportState;
  handleTileClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ 
  grid, 
  gameOver, 
  won, 
  score, 
  resetGame, 
  handleKeyDown, 
  initializeTouchListeners,
  swapState,
  deleteState,
  teleportState,
  handleTileClick 
}) => {
  useEffect(() => {
    // Initialize touch listeners for mobile
    const cleanupTouchListeners = initializeTouchListeners();
    
    // Set up keyboard listeners
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cleanupTouchListeners();
    };
  }, [handleKeyDown, initializeTouchListeners]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Game board */}
      <div className="bg-gradient-to-br from-amber-200 to-amber-300 rounded-xl p-6 shadow-xl">
        <div className="relative grid grid-cols-4 gap-4">
          {/* Static background cells */}
          {Array(16).fill(null).map((_, index) => (
            <div 
              key={`cell-${index}`} 
              className={`bg-amber-100/50 rounded-lg aspect-square ${
                teleportState.isTeleportMode && teleportState.selectedTile && !grid[Math.floor(index / 4)][index % 4]
                  ? 'cursor-pointer hover:ring-4 hover:ring-amber-400 hover:ring-opacity-50'
                  : ''
              }`}
              onClick={() => {
                if (teleportState.isTeleportMode && teleportState.selectedTile) {
                  handleTileClick(Math.floor(index / 4), index % 4);
                }
              }}
            />
          ))}
          
          {/* Dynamic tiles */}
          {grid.flatMap((row, i) => 
            row.map((tile: TileType, j: number) => 
              tile ? (
                <Tile 
                  key={`tile-${tile.id}`} 
                  value={tile.value} 
                  row={i} 
                  col={j}
                  isSwapMode={swapState.isSwapMode}
                  isDeleteMode={deleteState.isDeleteMode}
                  isTeleportMode={teleportState.isTeleportMode}
                  isSelected={
                    (swapState.firstTile?.row === i && swapState.firstTile?.col === j) ||
                    (teleportState.selectedTile?.row === i && teleportState.selectedTile?.col === j)
                  }
                  onClick={handleTileClick}
                />
              ) : null
            )
          )}
        </div>
      </div>

      {/* Game over overlay */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 scale-100">
            <h2 className="text-3xl font-bold mb-4 text-amber-900">{won ? '🎉 You Won!' : '😔 Game Over!'}</h2>
            <p className="text-xl mb-6 text-amber-800">Final Score: {score}</p>
            <button 
              onClick={resetGame}
              className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center mx-auto"
            >
              <RefreshCw size={20} className="mr-2" />
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;