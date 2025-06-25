
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Shuffle } from 'lucide-react';

interface ClassicPuzzlesGameProps {
  onBack: () => void;
}

const ClassicPuzzlesGame = ({ onBack }: ClassicPuzzlesGameProps) => {
  const [board, setBoard] = useState<(number | null)[]>(Array.from({ length: 15 }, (_, i) => i + 1).concat(null));
  const [moves, setMoves] = useState(0);

  const shuffle = () => {
    const newBoard = [...board];
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = newBoard.indexOf(null);
      const neighbors = getNeighbors(emptyIndex);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      [newBoard[emptyIndex], newBoard[randomNeighbor]] = [newBoard[randomNeighbor], newBoard[emptyIndex]];
    }
    setBoard(newBoard);
    setMoves(0);
  };

  const getNeighbors = (index: number) => {
    const neighbors = [];
    const row = Math.floor(index / 4);
    const col = index % 4;
    
    if (row > 0) neighbors.push(index - 4); // up
    if (row < 3) neighbors.push(index + 4); // down
    if (col > 0) neighbors.push(index - 1); // left
    if (col < 3) neighbors.push(index + 1); // right
    
    return neighbors;
  };

  const handleTileClick = (index: number) => {
    const emptyIndex = board.indexOf(null);
    const neighbors = getNeighbors(emptyIndex);
    
    if (neighbors.includes(index)) {
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[index]] = [newBoard[index], newBoard[emptyIndex]];
      setBoard(newBoard);
      setMoves(prev => prev + 1);
    }
  };

  const isSolved = () => {
    for (let i = 0; i < 15; i++) {
      if (board[i] !== i + 1) return false;
    }
    return board[15] === null;
  };

  const resetGame = () => {
    setBoard(Array.from({ length: 15 }, (_, i) => i + 1).concat(null));
    setMoves(0);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">15-Puzzle</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Moves: {moves}</span>
            <div className="flex space-x-2">
              <Button onClick={shuffle} variant="outline" size="sm">
                <Shuffle className="w-4 h-4 mr-2" />
                Shuffle
              </Button>
              <Button onClick={resetGame} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSolved() && (
            <div className="text-center mb-4 p-4 bg-green-100 rounded-lg">
              <h3 className="text-xl font-bold text-green-800">Puzzle Solved!</h3>
              <p className="text-green-600">Completed in {moves} moves!</p>
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-2 bg-gray-200 p-4 rounded-lg">
            {board.map((tile, index) => (
              <div
                key={index}
                onClick={() => tile && handleTileClick(index)}
                className={`
                  h-16 flex items-center justify-center rounded cursor-pointer font-bold text-lg
                  ${tile ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent'}
                `}
              >
                {tile}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassicPuzzlesGame;
