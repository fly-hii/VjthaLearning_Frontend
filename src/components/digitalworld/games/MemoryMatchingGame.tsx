
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Brain, User, Bot } from 'lucide-react';

interface MemoryMatchingGameProps {
  onBack: () => void;
}

interface MemoryCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatchingGame = ({ onBack }: MemoryMatchingGameProps) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'computer'>('player');
  const [gameComplete, setGameComplete] = useState(false);
  const [computerMemory, setComputerMemory] = useState<Map<string, number[]>>(new Map());

  const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎵', '🎸'];

  const initializeGame = () => {
    const gameCards: MemoryCard[] = [];
    emojis.forEach((emoji, index) => {
      gameCards.push(
        { id: index * 2, value: emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, value: emoji, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setPlayerScore(0);
    setComputerScore(0);
    setCurrentTurn('player');
    setGameComplete(false);
    setComputerMemory(new Map());
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          
          if (currentTurn === 'player') {
            setPlayerScore(prev => prev + 1);
          } else {
            setComputerScore(prev => prev + 1);
          }
          
          setFlippedCards([]);
          
          // Check if game is complete
          const totalMatches = playerScore + computerScore + 1;
          if (totalMatches === emojis.length) {
            setGameComplete(true);
          } else if (currentTurn === 'computer') {
            setTimeout(() => setCurrentTurn('player'), 1000);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          setCurrentTurn(currentTurn === 'player' ? 'computer' : 'player');
        }, 1500);
      }
    }
  }, [flippedCards, cards, currentTurn, playerScore, computerScore]);

  useEffect(() => {
    if (currentTurn === 'computer' && !gameComplete && flippedCards.length === 0) {
      computerMove();
    }
  }, [currentTurn, gameComplete, flippedCards.length]);

  const handleCardClick = (cardId: number) => {
    if (currentTurn !== 'player' || gameComplete) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);

    // Update computer memory
    const newMemory = new Map(computerMemory);
    const positions = newMemory.get(card.value) || [];
    positions.push(cardId);
    newMemory.set(card.value, positions);
    setComputerMemory(newMemory);
  };

  const computerMove = () => {
    setTimeout(() => {
      const availableCards = cards.filter(card => !card.isFlipped && !card.isMatched);
      
      // Check if computer can make a match from memory
      for (const [value, positions] of computerMemory.entries()) {
        const availablePositions = positions.filter(pos => {
          const card = cards.find(c => c.id === pos);
          return card && !card.isFlipped && !card.isMatched;
        });
        
        if (availablePositions.length >= 2) {
          // Computer can make a match!
          const [first, second] = availablePositions.slice(0, 2);
          
          setCards(prev => prev.map(c => 
            c.id === first ? { ...c, isFlipped: true } : c
          ));
          setFlippedCards([first]);
          
          setTimeout(() => {
            setCards(prev => prev.map(c => 
              c.id === second ? { ...c, isFlipped: true } : c
            ));
            setFlippedCards([first, second]);
          }, 500);
          
          return;
        }
      }
      
      // Random move if no match available
      if (availableCards.length > 0) {
        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
        
        setCards(prev => prev.map(c => 
          c.id === randomCard.id ? { ...c, isFlipped: true } : c
        ));
        setFlippedCards([randomCard.id]);
        
        // Update computer memory
        const newMemory = new Map(computerMemory);
        const positions = newMemory.get(randomCard.value) || [];
        positions.push(randomCard.id);
        newMemory.set(randomCard.value, positions);
        setComputerMemory(newMemory);
        
        // Computer's second move
        setTimeout(() => {
          const stillAvailable = cards.filter(card => 
            !card.isFlipped && !card.isMatched && card.id !== randomCard.id
          );
          
          if (stillAvailable.length > 0) {
            const secondCard = stillAvailable[Math.floor(Math.random() * stillAvailable.length)];
            
            setCards(prev => prev.map(c => 
              c.id === secondCard.id ? { ...c, isFlipped: true } : c
            ));
            setFlippedCards([randomCard.id, secondCard.id]);
            
            // Update computer memory
            const newMemory2 = new Map(computerMemory);
            const positions2 = newMemory2.get(secondCard.value) || [];
            positions2.push(secondCard.id);
            newMemory2.set(secondCard.value, positions2);
            setComputerMemory(newMemory2);
          }
        }, 1000);
      }
    }, 1000);
  };

  const getWinner = () => {
    if (playerScore > computerScore) return 'You Win!';
    if (computerScore > playerScore) return 'Computer Wins!';
    return "It's a Tie!";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Memory Battle
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center">
                  <Brain className="w-6 h-6 mr-2" />
                  Memory Challenge
                </span>
                <Button onClick={initializeGame} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Game
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {gameComplete && (
                <div className="text-center mb-6 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border">
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">{getWinner()}</h3>
                  <p className="text-purple-600">
                    Final Score - You: {playerScore} | Computer: {computerScore}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                  <Button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    variant="outline"
                    className={`h-20 text-4xl transition-all duration-300 ${
                      card.isMatched ? 'bg-green-100 border-green-500 transform scale-95' : 
                      card.isFlipped ? 'bg-blue-100 transform scale-105' : 
                      'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-50 hover:to-purple-50 hover:scale-105'
                    } ${currentTurn === 'computer' ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={card.isFlipped || card.isMatched || currentTurn === 'computer'}
                  >
                    {card.isFlipped || card.isMatched ? card.value : '❓'}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Score Panel */}
        <div className="space-y-4">
          {/* Current Turn */}
          <Card className={`${currentTurn === 'player' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'} transition-all`}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold mb-2">Current Turn</div>
              <div className={`flex items-center justify-center text-xl font-bold ${
                currentTurn === 'player' ? 'text-blue-600' : 'text-red-600'
              }`}>
                {currentTurn === 'player' ? <User className="w-6 h-6 mr-2" /> : <Bot className="w-6 h-6 mr-2" />}
                {currentTurn === 'player' ? 'Your Turn' : 'Computer'}
              </div>
            </CardContent>
          </Card>

          {/* Player Score */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{playerScore}</div>
              <div className="text-sm text-blue-500">Your Matches</div>
            </CardContent>
          </Card>

          {/* Computer Score */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <Bot className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{computerScore}</div>
              <div className="text-sm text-red-500">Computer Matches</div>
            </CardContent>
          </Card>

          {/* Game Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Take turns with the computer</p>
              <p>• Find matching pairs of cards</p>
              <p>• The computer remembers what it sees!</p>
              <p>• Most matches wins!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemoryMatchingGame;
