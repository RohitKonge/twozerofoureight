import { useState, useCallback, useEffect } from 'react';
import { TileType, Grid, SwapState, TilePosition, DeleteState, TeleportState } from '../types';

// Generate a unique ID for each tile
let nextId = 1;

interface GameState {
  grid: Grid;
  score: number;
}

const useGameLogic = () => {
  const [grid, setGrid] = useState<Grid>(() => {
    // Initialize with a 4x4 grid of null values
    return Array(4).fill(null).map(() => Array(4).fill(null));
  });
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState<GameState[]>([]);
  const [swapState, setSwapState] = useState<SwapState>({
    isSwapMode: false,
    firstTile: null,
    secondTile: null,
  });
  const [deleteState, setDeleteState] = useState<DeleteState>({
    isDeleteMode: false,
    numberToDelete: null,
  });
  const [teleportState, setTeleportState] = useState<TeleportState>({
    isTeleportMode: false,
    selectedTile: null,
  });

  // Initialize game
  useEffect(() => {
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
    
    // Initialize grid
    resetGame();
  }, []);

  // Save best score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bestScore', bestScore.toString());
  }, [bestScore]);

  // Create a new tile with value 2 or 4
  const createTile = useCallback((row: number, col: number): TileType => {
    const value = Math.random() < 0.9 ? 2 : 4;
    return { id: nextId++, value, row, col };
  }, []);

  // Get empty cells in the grid
  const getEmptyCells = useCallback((currentGrid: Grid): [number, number][] => {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!currentGrid[i][j]) {
          emptyCells.push([i, j]);
        }
      }
    }
    return emptyCells;
  }, []);

  // Add a random tile to the grid
  const addRandomTile = useCallback((currentGrid: Grid): Grid => {
    const emptyCells = getEmptyCells(currentGrid);
    if (emptyCells.length === 0) return currentGrid;
    
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[row][col] = createTile(row, col);
    return newGrid;
  }, [getEmptyCells, createTile]);

  // Initialize a new grid
  const initializeGrid = useCallback((): Grid => {
    const newGrid: Grid = Array(4).fill(null).map(() => Array(4).fill(null));
    const gridWithOneTile = addRandomTile(newGrid);
    const gridWithTwoTiles = addRandomTile(gridWithOneTile);
    return gridWithTwoTiles;
  }, [addRandomTile]);

  // Reset the game
  const resetGame = useCallback(() => {
    setGrid(initializeGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setHistory([]);
  }, [initializeGrid]);

  // Check if there are any possible moves left
  const checkGameOver = useCallback((currentGrid: Grid): boolean => {
    if (getEmptyCells(currentGrid).length > 0) return false;
    
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const currentValue = currentGrid[i][j]?.value;
        if ((j < 3 && currentGrid[i][j + 1]?.value === currentValue) ||
            (i < 3 && currentGrid[i + 1][j]?.value === currentValue)) {
          return false;
        }
      }
    }
    return true;
  }, [getEmptyCells]);

  // Move and merge tiles in a single row or column
  const mergeLine = (line: (TileType | null)[]): [(TileType | null)[], number] => {
    // Remove null values
    const nonEmptyTiles = line.filter((tile): tile is TileType => tile !== null);
    let additionalScore = 0;
    
    // Merge adjacent tiles with same value
    for (let i = 0; i < nonEmptyTiles.length - 1; i++) {
      if (nonEmptyTiles[i] && nonEmptyTiles[i + 1]?.value === nonEmptyTiles[i].value) {
        nonEmptyTiles[i].value *= 2;
        additionalScore += nonEmptyTiles[i].value;
        if (nonEmptyTiles[i].value === 2048) setWon(true);
        nonEmptyTiles.splice(i + 1, 1);
      }
    }
    
    // Fill with nulls to maintain grid size
    const result: (TileType | null)[] = [...nonEmptyTiles];
    while (result.length < 4) {
      result.push(null);
    }
    
    return [result, additionalScore];
  };

  // Move tiles in the specified direction
  const moveTiles = useCallback((direction: 'up' | 'down' | 'left' | 'right'): void => {
    if (gameOver) return;

    let moved = false;
    let newScore = score;
    const newGrid = grid.map(row => row.map(tile => tile ? { ...tile } : null));

    const processTiles = (isReverse: boolean = false) => {
      for (let i = 0; i < 4; i++) {
        let line: (TileType | null)[] = [];
        
        // Extract line based on direction
        if (direction === 'left' || direction === 'right') {
          line = [...newGrid[i]];
        } else {
          line = newGrid.map(row => row[i]);
        }

        // Remove nulls and reverse if needed
        if (isReverse) line.reverse();
        
        // Merge tiles
        const [mergedLine, additionalScore] = mergeLine(line);
        if (isReverse) mergedLine.reverse();
        
        // Update grid with merged line
        if (direction === 'left' || direction === 'right') {
          if (JSON.stringify(newGrid[i]) !== JSON.stringify(mergedLine)) {
            moved = true;
            newGrid[i] = mergedLine;
          }
        } else {
          for (let j = 0; j < 4; j++) {
            if (newGrid[j][i] !== mergedLine[j]) {
              moved = true;
              newGrid[j][i] = mergedLine[j];
            }
          }
        }
        
        newScore += additionalScore;
      }
    };

    // Process tiles based on direction
    processTiles(direction === 'right' || direction === 'down');

    // Update tile positions
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (newGrid[i][j]) {
          newGrid[i][j]!.row = i;
          newGrid[i][j]!.col = j;
        }
      }
    }

    if (moved) {
      // Save current state to history before updating
      setHistory(prev => [...prev, { grid, score }]);
      
      const gridWithNewTile = addRandomTile(newGrid);
      setGrid(gridWithNewTile);
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      if (checkGameOver(gridWithNewTile)) setGameOver(true);
    }
  }, [grid, gameOver, score, bestScore, addRandomTile, checkGameOver]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (swapState.isSwapMode || deleteState.isDeleteMode || teleportState.isTeleportMode) return;
    
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowUp': moveTiles('up'); break;
        case 'ArrowDown': moveTiles('down'); break;
        case 'ArrowLeft': moveTiles('left'); break;
        case 'ArrowRight': moveTiles('right'); break;
      }
    }
  }, [moveTiles, swapState.isSwapMode, deleteState.isDeleteMode, teleportState.isTeleportMode]);

  // Initialize touch listeners for mobile
  const initializeTouchListeners = useCallback(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 20) {
          moveTiles(dx > 0 ? 'right' : 'left');
        }
      } else {
        if (Math.abs(dy) > 20) {
          moveTiles(dy > 0 ? 'down' : 'up');
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [moveTiles]);

  // Add undo functionality
  const canUndo = useCallback((): boolean => {
    return history.length > 0;
  }, [history]);

  const undo = useCallback(() => {
    if (!canUndo()) return;
    
    const previousState = history[history.length - 1];
    setGrid(previousState.grid.map(row => row.map(tile => 
      tile ? { ...tile } : null
    )));
    setScore(previousState.score);
    setHistory(prev => prev.slice(0, -1));
    setGameOver(false);
  }, [history, canUndo]);

  const startSwapMode = useCallback(() => {
    setSwapState({
      isSwapMode: true,
      firstTile: null,
      secondTile: null,
    });
  }, []);

  const cancelSwapMode = useCallback(() => {
    setSwapState({
      isSwapMode: false,
      firstTile: null,
      secondTile: null,
    });
  }, []);

  const startDeleteMode = useCallback((number: number) => {
    setDeleteState({
      isDeleteMode: true,
      numberToDelete: number,
    });
  }, []);

  const cancelDeleteMode = useCallback(() => {
    setDeleteState({
      isDeleteMode: false,
      numberToDelete: null,
    });
  }, []);

  const startTeleportMode = useCallback(() => {
    setTeleportState({
      isTeleportMode: true,
      selectedTile: null,
    });
  }, []);

  const cancelTeleportMode = useCallback(() => {
    setTeleportState({
      isTeleportMode: false,
      selectedTile: null,
    });
  }, []);

  const handleTileClick = useCallback((row: number, col: number) => {
    if (swapState.isSwapMode) {
      if (!swapState.firstTile) {
        setSwapState(prev => ({
          ...prev,
          firstTile: { row, col }
        }));
      } else if (!swapState.secondTile && (row !== swapState.firstTile.row || col !== swapState.firstTile.col)) {
        // Save current state to history before swapping
        setHistory(prev => [...prev, { grid, score }]);

        // Perform the swap
        const newGrid = grid.map(row => row.map(tile => tile ? { ...tile } : null));
        const temp = newGrid[row][col];
        newGrid[row][col] = newGrid[swapState.firstTile.row][swapState.firstTile.col];
        newGrid[swapState.firstTile.row][swapState.firstTile.col] = temp;

        // Update positions of swapped tiles
        if (newGrid[row][col]) {
          newGrid[row][col]!.row = row;
          newGrid[row][col]!.col = col;
        }
        if (newGrid[swapState.firstTile.row][swapState.firstTile.col]) {
          newGrid[swapState.firstTile.row][swapState.firstTile.col]!.row = swapState.firstTile.row;
          newGrid[swapState.firstTile.row][swapState.firstTile.col]!.col = swapState.firstTile.col;
        }

        setGrid(newGrid);
        setSwapState({
          isSwapMode: false,
          firstTile: null,
          secondTile: null,
        });
      }
    } else if (deleteState.isDeleteMode && deleteState.numberToDelete !== null) {
      const clickedTile = grid[row][col];
      if (clickedTile && clickedTile.value === deleteState.numberToDelete) {
        // Save current state to history before deleting
        setHistory(prev => [...prev, { grid, score }]);

        // Create new grid with the tile deleted
        const newGrid = grid.map(row => row.map(tile => tile ? { ...tile } : null));
        newGrid[row][col] = null;

        setGrid(newGrid);
        
        // Check if there are more tiles with the same number
        const hasMoreSameNumber = grid.some((row, i) => 
          row.some((tile, j) => 
            tile?.value === deleteState.numberToDelete && (i !== row || j !== col)
          )
        );

        if (!hasMoreSameNumber) {
          cancelDeleteMode();
        }
      }
    } else if (teleportState.isTeleportMode) {
      if (!teleportState.selectedTile) {
        // First click - select the tile to teleport
        if (grid[row][col]) {
          setTeleportState(prev => ({
            ...prev,
            selectedTile: { row, col }
          }));
        }
      } else {
        // Second click - teleport to empty cell
        if (!grid[row][col]) {
          // Save current state to history before teleporting
          setHistory(prev => [...prev, { grid, score }]);

          // Create new grid with the tile teleported
          const newGrid = grid.map(row => row.map(tile => tile ? { ...tile } : null));
          const teleportedTile = { ...newGrid[teleportState.selectedTile.row][teleportState.selectedTile.col]! };
          teleportedTile.row = row;
          teleportedTile.col = col;
          
          newGrid[teleportState.selectedTile.row][teleportState.selectedTile.col] = null;
          newGrid[row][col] = teleportedTile;

          setGrid(newGrid);
          setTeleportState({
            isTeleportMode: false,
            selectedTile: null,
          });
        }
      }
    }
  }, [swapState, deleteState, teleportState, grid, score]);

  return {
    grid,
    score,
    bestScore,
    gameOver,
    won,
    handleKeyDown,
    resetGame,
    initializeTouchListeners,
    canUndo,
    undo,
    swapState,
    startSwapMode,
    cancelSwapMode,
    deleteState,
    startDeleteMode,
    cancelDeleteMode,
    teleportState,
    startTeleportMode,
    cancelTeleportMode,
    handleTileClick,
  };
};

export default useGameLogic;