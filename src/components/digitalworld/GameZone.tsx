
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SudokuGame from './games/SudokuGame';
import TicTacToeGame from './games/TicTacToeGame';
import MemoryMatchingGame from './games/MemoryMatchingGame';
import ClassicPuzzlesGame from './games/ClassicPuzzlesGame';
import RockPaperScissorsGame from './games/RockPaperScissorsGame';
import AshtachammaGame from './games/AshtachammaGame';
import DaddyGame from './games/DaddyGame';
import Navigation from '../Navigation';
import { AIPopup } from '@/pages/AIPopup';
type GameType = 'menu' | 'sudoku' | 'tictactoe' | 'memory' | 'puzzles' | 'rps' | 'ashtachamma' | 'daddy';

const GameZone = () => {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');

  const games = [
    {
      id: 'sudoku',
      title: '🎮 Sudoku',
      description: 'Challenge your logic with classic number puzzles',
      color: 'bg-blue-500'
    },
    {
      id: 'tictactoe',
      title: '❌⭕ Tic Tac Toe',
      description: 'Classic XOX game for two players',
      color: 'bg-red-500'
    },
    {
      id: 'memory',
      title: '🧠 Memory Matching',
      description: 'Test your memory with card matching',
      color: 'bg-green-500'
    },
    {
      id: 'puzzles',
      title: '🧩 Classic Puzzles',
      description: 'Solve traditional puzzles and brain teasers',
      color: 'bg-purple-500'
    },
    {
      id: 'rps',
      title: '✊✋✌️ Rock Paper Scissors',
      description: 'Play against the computer',
      color: 'bg-orange-500'
    },
    {
      id: 'ashtachamma',
      title: '🎲 Ashtachamma',
      description: 'Traditional Indian board game',
      color: 'bg-indigo-500'
    },
    {
      id: 'daddy',
      title: '👨‍👧‍👦 Daddy Game',
      description: 'Fun family game with custom rules',
      color: 'bg-pink-500'
    }
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'sudoku':
        return <SudokuGame onBack={() => setCurrentGame('menu')} />;
      case 'tictactoe':
        return <TicTacToeGame onBack={() => setCurrentGame('menu')} />;
      case 'memory':
        return <MemoryMatchingGame onBack={() => setCurrentGame('menu')} />;
      case 'puzzles':
        return <ClassicPuzzlesGame onBack={() => setCurrentGame('menu')} />;
      case 'rps':
        return <RockPaperScissorsGame onBack={() => setCurrentGame('menu')} />;
      case 'ashtachamma':
        return <AshtachammaGame onBack={() => setCurrentGame('menu')} />;
      case 'daddy':
        return <DaddyGame onBack={() => setCurrentGame('menu')} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className={`${game.color} text-white`}>
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <Button 
                    onClick={() => setCurrentGame(game.id as GameType)}
                    className="w-full"
                  >
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navigation />
      <AIPopup />
      
    <div className="max-w-6xl mx-auto">
      {currentGame === 'menu' && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Game Zone</h2>
          <p className="text-lg text-gray-600">Choose your adventure and have fun!</p>
        </div>
      )}
      
      {renderGame()}
    </div>
    </div>
  );
};

export default GameZone;
