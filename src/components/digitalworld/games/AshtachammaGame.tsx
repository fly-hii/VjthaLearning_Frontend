
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Dice6 } from 'lucide-react';

interface AshtachammaGameProps {
  onBack: () => void;
}

interface Player {
  id: number;
  name: string;
  color: string;
  pieces: number[];
  finished: number;
}

const AshtachammaGame = ({ onBack }: AshtachammaGameProps) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', color: 'bg-red-500', pieces: [0, 0, 0, 0], finished: 0 },
    { id: 2, name: 'Player 2', color: 'bg-blue-500', pieces: [0, 0, 0, 0], finished: 0 }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<string>('Roll dice to start');

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    setGameStatus(`${players[currentPlayer].name} rolled ${value}`);
  };

  const movePiece = (pieceIndex: number) => {
    if (!diceValue) return;

    const newPlayers = [...players];
    const currentPlayerData = newPlayers[currentPlayer];
    
    // Simple movement logic
    const newPosition = currentPlayerData.pieces[pieceIndex] + diceValue;
    
    if (newPosition >= 57) {
      // Piece reaches home
      currentPlayerData.pieces[pieceIndex] = 57;
      currentPlayerData.finished++;
      setGameStatus(`${currentPlayerData.name} got a piece home!`);
    } else {
      currentPlayerData.pieces[pieceIndex] = newPosition;
    }

    setPlayers(newPlayers);
    
    // Check for winner
    if (currentPlayerData.finished === 4) {
      setGameStatus(`${currentPlayerData.name} wins!`);
      return;
    }

    // Switch player
    setCurrentPlayer((prev) => (prev + 1) % players.length);
    setDiceValue(null);
  };

  const resetGame = () => {
    setPlayers([
      { id: 1, name: 'Player 1', color: 'bg-red-500', pieces: [0, 0, 0, 0], finished: 0 },
      { id: 2, name: 'Player 2', color: 'bg-blue-500', pieces: [0, 0, 0, 0], finished: 0 }
    ]);
    setCurrentPlayer(0);
    setDiceValue(null);
    setGameStatus('Roll dice to start');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Ashtachamma</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Game Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <div className="grid grid-cols-8 gap-2 mb-4">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 border border-gray-400 flex items-center justify-center text-xs ${
                        i % 8 === 0 || i % 8 === 7 ? 'bg-green-200' : 'bg-white'
                      }`}
                    >
                      {/* Show pieces on board */}
                      {players.map((player, playerIndex) =>
                        player.pieces.map((position, pieceIndex) =>
                          position === i + 1 ? (
                            <div
                              key={`${playerIndex}-${pieceIndex}`}
                              className={`w-3 h-3 rounded-full ${player.color}`}
                            />
                          ) : null
                        )
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm text-gray-600">
                  Traditional Ashtachamma Board (Simplified)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Game Controls
                <Button onClick={resetGame} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="font-semibold mb-2">{players[currentPlayer].name}'s Turn</p>
                <div className={`w-8 h-8 rounded-full ${players[currentPlayer].color} mx-auto mb-4`} />
                
                <Button onClick={rollDice} disabled={!!diceValue} className="mb-4">
                  <Dice6 className="w-4 h-4 mr-2" />
                  Roll Dice
                </Button>
                
                {diceValue && (
                  <div className="text-2xl font-bold p-4 bg-gray-100 rounded-lg mb-4">
                    🎲 {diceValue}
                  </div>
                )}
                
                <p className="text-sm text-gray-600">{gameStatus}</p>
              </div>
            </CardContent>
          </Card>

          {/* Player Pieces */}
          {players.map((player, playerIndex) => (
            <Card key={player.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${player.color}`} />
                  <span>{player.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Finished: {player.finished}/4</p>
                  <div className="grid grid-cols-2 gap-2">
                    {player.pieces.map((position, pieceIndex) => (
                      <Button
                        key={pieceIndex}
                        onClick={() => movePiece(pieceIndex)}
                        disabled={!diceValue || currentPlayer !== playerIndex || position >= 57}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Piece {pieceIndex + 1}
                        <br />
                        Pos: {position}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AshtachammaGame;
