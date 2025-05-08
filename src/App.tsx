import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Board from './components/Board';
import GameInstructions from './components/GameInstructions';
import NewGameDialog from './components/NewGameDialog';
import DeleteNumberDialog from './components/DeleteNumberDialog';
import { Undo, ArrowLeftRight, Trash2, MoveUp } from 'lucide-react';
import useGameLogic from './hooks/useGameLogic';
import About from './components/About';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import BlogTemplate from './components/BlogTemplate';
import Contact from './components/Contact';

function HomeGame() {
  const { 
    resetGame, score, bestScore, grid, gameOver, won, 
    handleKeyDown, initializeTouchListeners, canUndo, undo,
    swapState, startSwapMode, cancelSwapMode, handleTileClick,
    deleteState, startDeleteMode, cancelDeleteMode,
    teleportState, startTeleportMode, cancelTeleportMode
  } = useGameLogic();
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Get available numbers for deletion
  const availableNumbers = useMemo(() => {
    const numbers = new Set<number>();
    grid.forEach(row => {
      row.forEach(tile => {
        if (tile) numbers.add(tile.value);
      });
    });
    return Array.from(numbers).sort((a, b) => a - b);
  }, [grid]);

  const handleNewGameClick = () => {
    setShowNewGameDialog(true);
  };

  const handleConfirmNewGame = () => {
    resetGame();
    setShowNewGameDialog(false);
  };

  const handleSwapClick = () => {
    if (swapState.isSwapMode) {
      cancelSwapMode();
    } else {
      startSwapMode();
    }
  };

  const handleDeleteClick = () => {
    if (deleteState.isDeleteMode) {
      cancelDeleteMode();
    } else {
      setShowDeleteDialog(true);
    }
  };

  const handleSelectNumberToDelete = (number: number) => {
    setShowDeleteDialog(false);
    startDeleteMode(number);
  };

  const handleTeleportClick = () => {
    if (teleportState.isTeleportMode) {
      cancelTeleportMode();
    } else {
      startTeleportMode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto py-8 px-4">
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

        <div className="flex justify-center items-center gap-4 mt-6 mb-8">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl py-2 px-4 shadow-lg flex-1 mr-4 max-w-[160px] flex flex-col items-center justify-center">
            <div className="text-sm text-amber-800 font-bold uppercase tracking-wide">Score</div>
            <div className="text-3xl font-bold text-amber-900">{score}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl py-2 px-4 shadow-lg flex-1 max-w-[160px] flex flex-col items-center justify-center">
            <div className="text-sm text-amber-800 font-bold uppercase tracking-wide">Best</div>
            <div className="text-3xl font-bold text-amber-900">{bestScore}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleTeleportClick}
              className={`${
                teleportState.isTeleportMode 
                  ? 'bg-amber-700 hover:bg-amber-800' 
                  : 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              } text-white font-bold p-3 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center`}
              aria-label="Teleport Tile"
            >
              <MoveUp size={24} />
            </button>
            <button
              onClick={handleDeleteClick}
              className={`${
                deleteState.isDeleteMode 
                  ? 'bg-amber-700 hover:bg-amber-800' 
                  : 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              } text-white font-bold p-3 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center`}
              aria-label="Delete Tiles"
            >
              <Trash2 size={24} />
            </button>
            <button
              onClick={handleSwapClick}
              className={`${
                swapState.isSwapMode 
                  ? 'bg-amber-700 hover:bg-amber-800' 
                  : 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              } text-white font-bold p-3 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center`}
              aria-label="Swap Tiles"
            >
              <ArrowLeftRight size={24} />
            </button>
            <button
              onClick={undo}
              disabled={!canUndo()}
              className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold p-3 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center"
              aria-label="Undo Move"
            >
              <Undo size={24} />
            </button>
          </div>
        </div>
        
        {/* Mode instructions */}
        {(deleteState.isDeleteMode || swapState.isSwapMode || teleportState.isTeleportMode) && (
          <div className="text-center mb-4 text-amber-800 bg-amber-100/80 p-3 rounded-lg">
            {deleteState.isDeleteMode 
              ? `Click on ${deleteState.numberToDelete} tiles to delete them`
              : teleportState.isTeleportMode
                ? !teleportState.selectedTile
                  ? "Select a tile to teleport"
                  : "Select an empty cell to teleport the tile to"
                : !swapState.firstTile 
                  ? "Select first tile to swap" 
                  : "Select second tile to swap"}
          </div>
        )}
      </header>

      <main className="w-full max-w-4xl mx-auto px-4">
        <article className="game-container">
          <Board 
            grid={grid}
            gameOver={gameOver}
            won={won}
            score={score}
            resetGame={resetGame}
            handleKeyDown={handleKeyDown}
            initializeTouchListeners={initializeTouchListeners}
            swapState={swapState}
            deleteState={deleteState}
            teleportState={teleportState}
            handleTileClick={handleTileClick}
          />
          
          <section className="mt-8 text-base text-amber-700 bg-amber-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">How to Play 2048</h2>
            <p className="mb-2">Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one! Try to reach the <strong>2048 tile</strong> to win, but keep playing for a higher score!</p>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold text-amber-800 mb-3">Game Rules and Strategy</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Combine matching numbers by moving tiles in any direction (up, down, left, right)</li>
                <li>Plan your moves carefully to create larger numbers</li>
                <li>Keep your highest numbers in a corner for better control</li>
                <li>Try to maintain a clear path to merge tiles effectively</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-amber-800 mb-3">Why Play 2048?</h3>
              <p className="mb-4">2048 is more than just a game - it's a fun way to improve your strategic thinking and planning skills. Perfect for quick breaks or longer gaming sessions, this addictive puzzle game challenges your mind while being incredibly entertaining.</p>
              
              <div className="bg-amber-100 p-4 rounded-lg">
                <h4 className="font-bold text-amber-900 mb-2">Benefits of Playing 2048:</h4>
                <ul className="space-y-1 list-disc pl-5">
                  <li>Enhances strategic thinking</li>
                  <li>Improves pattern recognition</li>
                  <li>Develops planning skills</li>
                  <li>Perfect for all ages</li>
                  <li>Free to play, no ads</li>
                </ul>
              </div>
            </div>
          </section>
        </article>
      </main>
      
      <footer className="w-full mt-auto py-6 bg-amber-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-700 text-sm mb-2">Play 2048 © 2002-2025 Adam Smith. All rights Reserved.</p>
          <p className="text-amber-600 text-sm">The most popular free online puzzle game - Play 2048 now at play2048.live!</p>
        </div>
      </footer>
      
      <GameInstructions />
      
      <NewGameDialog
        isOpen={showNewGameDialog}
        onConfirm={handleConfirmNewGame}
        onCancel={() => setShowNewGameDialog(false)}
      />

      <DeleteNumberDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onSelectNumber={handleSelectNumberToDelete}
        availableNumbers={availableNumbers}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center">
        <nav className="w-full bg-amber-200 py-3 shadow mb-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
            <Link to="/" className="text-amber-800 font-bold hover:underline">Home</Link>
            <Link to="/about" className="text-amber-800 font-bold hover:underline">About</Link>
            <Link to="/faq" className="text-amber-800 font-bold hover:underline">FAQ</Link>
            <Link to="/blog" className="text-amber-800 font-bold hover:underline">Blog</Link>
            <Link to="/contact" className="text-amber-800 font-bold hover:underline">Contact</Link>
            <Link to="/privacy-policy" className="text-amber-800 font-bold hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-amber-800 font-bold hover:underline">Terms</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomeGame />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/blog" element={<BlogTemplate title='How to Master 2048: Tips, Strategies & High Score Secrets' description='Discover expert strategies to win at 2048. Learn how to plan moves, avoid common mistakes, and reach the elusive 2048 tile!'>
            <h2 className="text-2xl font-bold mt-6 mb-2">What is 2048?</h2>
            <p>2048 is a popular sliding tile puzzle game where you combine numbers to reach the 2048 tile.</p>
            <h2 className="text-2xl font-bold mt-6 mb-2">Top Strategies to Win</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Corner your highest tile</li>
              <li>Plan ahead and avoid random moves</li>
              <li>Keep your board balanced</li>
              <li>Don’t chase big tiles in the middle</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-2">Common Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Filling up the board too quickly</li>
              <li>Ignoring the corners</li>
              <li>Not planning for merges</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-2">FAQ</h2>
            <p>See our <Link to="/faq" className="text-amber-700 underline">FAQ page</Link> for more tips!</p>
          </BlogTemplate>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;