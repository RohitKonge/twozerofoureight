import React, { useState } from 'react';
import Board from './components/Board';
import GameInstructions from './components/GameInstructions';
import NewGameDialog from './components/NewGameDialog';
import useGameLogic from './hooks/useGameLogic';

function App() {
  const { resetGame, score, bestScore, grid, gameOver, won, handleKeyDown, initializeTouchListeners } = useGameLogic();
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);

  const handleNewGameClick = () => {
    setShowNewGameDialog(true);
  };

  const handleConfirmNewGame = () => {
    resetGame();
    setShowNewGameDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-start">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-800">2048</h1>
          <button 
            onClick={handleNewGameClick}
            className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center"
            aria-label="New Game"
          >
            <span className="text-lg">New Game</span>
          </button>
        </div>

        {/* Score display */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl py-2 px-4 shadow-lg flex-1 mr-4 max-w-[160px] flex flex-col items-center justify-center">
            <div className="text-2xl text-amber-800 font-bold uppercase tracking-wide">Score</div>
            <div className="text-3xl font-bold text-amber-900">{score}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl py-2 px-4 shadow-lg flex-1 max-w-[160px] flex flex-col items-center justify-center">
            <div className="text-2xl text-amber-800 font-bold uppercase tracking-wide">Best</div>
            <div className="text-3xl font-bold text-amber-900">{bestScore}</div>
          </div>
        </div>
        
        <div className="mt-4">
          <Board 
            grid={grid}
            gameOver={gameOver}
            won={won}
            score={score}
            resetGame={resetGame}
            handleKeyDown={handleKeyDown}
            initializeTouchListeners={initializeTouchListeners}
          />
          
          <div className="mt-8 text-base text-amber-700 bg-amber-50 p-6 rounded-lg shadow">
            <p className="mb-2"><strong>HOW TO PLAY:</strong> Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!</p>
            <p className="mb-4">Try to reach the <strong>2048 tile</strong> to win, but keep playing for a higher score!</p>
            
            <p className="text-amber-700">2048 is an easy and fun puzzle game. Even if you don't love numbers you will love this classic game. It is played on a 4x4 grid using the arrows or W, A, S, D keys alternatively. Every time you press a key - all tiles slide. Tiles with the same value that bump into one-another are merged. Although there might be an optimal strategy to play, there is always some level of chance. If you beat the game and would like to master it, try to finish with a smaller score. That would mean that you finished with less moves.</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-auto py-4 text-center text-amber-700 text-sm">
        <p>Play 2048 © 2002-2025 Adam Smith. All rights Reserved.</p>
      </footer>
      
      <GameInstructions />
      
      <NewGameDialog
        isOpen={showNewGameDialog}
        onConfirm={handleConfirmNewGame}
        onCancel={() => setShowNewGameDialog(false)}
      />
    </div>
  );
}

export default App;