
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface RockPaperScissorsGameProps {
  onBack: () => void;
}

type Choice = 'rock' | 'paper' | 'scissors';

const RockPaperScissorsGame = ({ onBack }: RockPaperScissorsGameProps) => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const choices: { value: Choice; emoji: string; label: string }[] = [
    { value: 'rock', emoji: '✊', label: 'Rock' },
    { value: 'paper', emoji: '✋', label: 'Paper' },
    { value: 'scissors', emoji: '✌️', label: 'Scissors' }
  ];

  const getRandomChoice = (): Choice => {
    const choices = ['rock', 'paper', 'scissors'] as Choice[];
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) return 'tie';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const playGame = (choice: Choice) => {
    const compChoice = getRandomChoice();
    const winner = determineWinner(choice, compChoice);
    
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    
    if (winner === 'player') {
      setResult('You Win!');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (winner === 'computer') {
      setResult('Computer Wins!');
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    } else {
      setResult("It's a Tie!");
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Rock Paper Scissors</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex space-x-4">
              <span>You: {score.player}</span>
              <span>Computer: {score.computer}</span>
            </div>
            <Button onClick={resetGame} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Game Result */}
          {result && (
            <div className="text-center">
              <div className="flex justify-center items-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {playerChoice && choices.find(c => c.value === playerChoice)?.emoji}
                  </div>
                  <p className="font-semibold">You</p>
                </div>
                <div className="text-2xl font-bold">VS</div>
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {computerChoice && choices.find(c => c.value === computerChoice)?.emoji}
                  </div>
                  <p className="font-semibold">Computer</p>
                </div>
              </div>
              <div className={`text-2xl font-bold p-4 rounded-lg ${
                result.includes('You Win') ? 'bg-green-100 text-green-800' :
                result.includes('Computer') ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {result}
              </div>
            </div>
          )}

          {/* Choice Buttons */}
          <div className="text-center">
            <p className="text-lg mb-4">Choose your move:</p>
            <div className="flex justify-center space-x-4">
              {choices.map((choice) => (
                <Button
                  key={choice.value}
                  onClick={() => playGame(choice.value)}
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto"
                >
                  <div className="text-4xl mb-2">{choice.emoji}</div>
                  <span className="text-sm">{choice.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RockPaperScissorsGame;
