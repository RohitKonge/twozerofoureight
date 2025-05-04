import React from 'react';
import Board from './components/Board';
import GameInstructions from './components/GameInstructions';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-800 text-center mb-3">2048</h1>
        <p className="text-lg text-amber-700 text-center mb-8">
          Join the tiles, get to <span className="font-bold">2048</span>!
        </p>
      </header>
      
      <main className="w-full max-w-lg mx-auto px-4 pb-1">
        <Board />
        
        <div className="mt-8 text-base text-amber-700 bg-amber-50 p-6 rounded-lg shadow">
          <p className="mb-2"><strong>HOW TO PLAY:</strong> Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!</p>
          <p>Try to reach the <strong>2048 tile</strong> to win, but keep playing for a higher score!</p>
        </div>
      </main>
      
      <footer className="mt-auto py-4 text-center text-amber-700 text-sm">
        <p>Play 2048 © 2002-2025 Adam Smith. All rights Reserved.</p>
      </footer>
      
      <GameInstructions />
    </div>
  );
}

export default App;