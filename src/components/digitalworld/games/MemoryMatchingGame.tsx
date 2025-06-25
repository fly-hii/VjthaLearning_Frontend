
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw } from 'lucide-react';

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
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

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
    setMoves(0);
    setMatches(0);
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
          setMatches(prev => prev + 1);
          setFlippedCards([]);
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
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (cardId: number) => {
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  const isGameComplete = matches === emojis.length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Memory Matching</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex space-x-4">
              <span>Moves: {moves}</span>
              <span>Matches: {matches}/{emojis.length}</span>
            </div>
            <Button onClick={initializeGame} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isGameComplete && (
            <div className="text-center mb-4 p-4 bg-green-100 rounded-lg">
              <h3 className="text-xl font-bold text-green-800">Congratulations!</h3>
              <p className="text-green-600">You completed the game in {moves} moves!</p>
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <Button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                variant="outline"
                className={`h-20 text-3xl ${
                  card.isMatched ? 'bg-green-100 border-green-500' : 
                  card.isFlipped ? 'bg-blue-100' : 'bg-gray-100'
                }`}
                disabled={card.isFlipped || card.isMatched}
              >
                {card.isFlipped || card.isMatched ? card.value : '?'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryMatchingGame;
