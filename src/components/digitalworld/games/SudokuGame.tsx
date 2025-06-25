
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Lightbulb, Trophy } from 'lucide-react';

interface SudokuGameProps {
  onBack: () => void;
}

const SudokuGame = ({ onBack }: SudokuGameProps) => {
  const [board, setBoard] = useState<(number | null)[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [initialBoard, setInitialBoard] = useState<(number | null)[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [hints, setHints] = useState(3);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Enhanced sudoku puzzle with varying difficulty
  const generatePuzzle = () => {
    const puzzle = [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ];
    setBoard(puzzle);
    setInitialBoard(puzzle.map(row => [...row]));
    setScore(0);
    setGameComplete(false);
    setHints(3);
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  const isValidMove = (board: (number | null)[][], row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] === null && !gameComplete) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (num: number) => {
    if (selectedCell && !gameComplete) {
      const [row, col] = selectedCell;
      
      if (num === 0) {
        // Clear cell
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = null;
        setBoard(newBoard);
        return;
      }

      if (isValidMove(board, row, col, num)) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = num;
        setBoard(newBoard);
        setScore(prev => prev + 10);

        // Check if puzzle is complete
        if (isPuzzleComplete(newBoard)) {
          setGameComplete(true);
          setScore(prev => prev + 100);
        }
      } else {
        setScore(prev => Math.max(0, prev - 5));
      }
    }
  };

  const isPuzzleComplete = (board: (number | null)[][]): boolean => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === null) return false;
      }
    }
    return true;
  };

  const getHint = () => {
    if (hints > 0 && selectedCell && !gameComplete) {
      const [row, col] = selectedCell;
      
      // Find correct number for selected cell
      for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
          const newBoard = board.map(r => [...r]);
          newBoard[row][col] = num;
          setBoard(newBoard);
          setHints(prev => prev - 1);
          setScore(prev => prev + 5);
          
          if (isPuzzleComplete(newBoard)) {
            setGameComplete(true);
            setScore(prev => prev + 100);
          }
          break;
        }
      }
    }
  };

  const resetGame = () => {
    generatePuzzle();
    setSelectedCell(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sudoku Master
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center">
                  Sudoku Puzzle
                  {gameComplete && <Trophy className="w-6 h-6 ml-2 text-yellow-500" />}
                </span>
                <div className="flex space-x-2">
                  <Button onClick={getHint} disabled={hints === 0 || !selectedCell} variant="outline" size="sm">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Hint ({hints})
                  </Button>
                  <Button onClick={resetGame} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {gameComplete && (
                <div className="text-center mb-4 p-4 bg-green-100 rounded-lg border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 flex items-center justify-center">
                    <Trophy className="w-6 h-6 mr-2" />
                    Puzzle Completed!
                  </h3>
                  <p className="text-green-600">Final Score: {score} points!</p>
                </div>
              )}
              
              {/* Sudoku Grid */}
              <div className="grid grid-cols-9 gap-1 bg-gray-800 p-4 rounded-lg shadow-lg">
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        w-12 h-12 border border-gray-400 flex items-center justify-center cursor-pointer text-lg font-semibold
                        ${initialBoard[rowIndex][colIndex] !== null ? 'bg-gray-200 text-gray-800' : 'bg-white hover:bg-blue-50'}
                        ${selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex ? 'bg-blue-200 ring-2 ring-blue-500' : ''}
                        ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-4 border-b-gray-800' : ''}
                        ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-4 border-r-gray-800' : ''}
                        transition-all duration-200 hover:scale-105
                      `}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell && (
                        <span className={initialBoard[rowIndex][colIndex] !== null ? 'text-gray-800' : 'text-blue-600'}>
                          {cell}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle>Game Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{hints}</div>
                <div className="text-sm text-gray-600">Hints Left</div>
              </div>
            </CardContent>
          </Card>

          {/* Number Input */}
          <Card>
            <CardHeader>
              <CardTitle>Number Pad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleNumberInput(num)}
                    disabled={!selectedCell || gameComplete}
                    variant="outline"
                    className="h-12 text-lg font-bold hover:bg-blue-100 hover:scale-105 transition-all"
                  >
                    {num}
                  </Button>
                ))}
                <Button
                  onClick={() => handleNumberInput(0)}
                  disabled={!selectedCell || gameComplete}
                  variant="outline"
                  className="col-span-3 h-12 hover:bg-red-100"
                >
                  Clear Cell
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Play</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Fill each row, column, and 3×3 box with numbers 1-9</p>
              <p>• Each number can only appear once in each row, column, and box</p>
              <p>• Use hints wisely - you only get 3!</p>
              <p>• Correct moves: +10 points</p>
              <p>• Wrong moves: -5 points</p>
              <p>• Complete puzzle: +100 bonus!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SudokuGame;
