import React from 'react';
import Board from './components/Board';
import GameInstructions from './components/GameInstructions';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center">
      <header className="w-full max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800 text-center mb-2">2048</h1>
        <p className="text-amber-700 text-center mb-8">
          Join the tiles, get to <span className="font-bold">2048</span>!
        </p>
      </header>
      
      <main className="w-full max-w-md mx-auto px-4 pb-12">
        <Board />
        
        <div className="mt-8 text-sm text-amber-700 bg-amber-50 p-4 rounded-lg shadow">
          <p className="mb-2"><strong>HOW TO PLAY:</strong> Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!</p>
          <p>Try to reach the <strong>2048 tile</strong> to win, but keep playing for a higher score!</p>
        </div>
      </main>
      
      <footer className="mt-auto py-4 text-center text-amber-700 text-sm">
        <p>Created with ❤️ in 2025 | <a href="https://github.com/gabrielecirulli/2048" className="underline hover:text-amber-900" target="_blank" rel="noopener noreferrer">Original 2048</a> by Gabriele Cirulli</p>
      </footer>
      
      <GameInstructions />
    </div>
  );
}

export default App;