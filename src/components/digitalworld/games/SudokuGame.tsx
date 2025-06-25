
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface SudokuGameProps {
  onBack: () => void;
}

const SudokuGame = ({ onBack }: SudokuGameProps) => {
  const [board, setBoard] = useState<(number | null)[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [initialBoard, setInitialBoard] = useState<(number | null)[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  // Simple sudoku puzzle generator (for demo)
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
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] === null) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (num: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = num;
      setBoard(newBoard);
    }
  };

  const resetGame = () => {
    generatePuzzle();
    setSelectedCell(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Sudoku</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Sudoku Puzzle
            <Button onClick={resetGame} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Sudoku Grid */}
          <div className="grid grid-cols-9 gap-1 mb-6 bg-gray-800 p-2 rounded">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-10 h-10 border border-gray-400 flex items-center justify-center cursor-pointer
                    ${initialBoard[rowIndex][colIndex] !== null ? 'bg-gray-200' : 'bg-white'}
                    ${selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex ? 'bg-blue-200' : ''}
                    ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-b-gray-800' : ''}
                    ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-r-gray-800' : ''}
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell && (
                    <span className={initialBoard[rowIndex][colIndex] !== null ? 'font-bold' : 'text-blue-600'}>
                      {cell}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Number Input */}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberInput(num)}
                disabled={!selectedCell}
                variant="outline"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => selectedCell && handleNumberInput(0)}
              disabled={!selectedCell}
              variant="outline"
              className="col-span-1"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SudokuGame;
