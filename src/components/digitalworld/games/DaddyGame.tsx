
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RotateCcw, Heart, Star } from 'lucide-react';

interface DaddyGameProps {
  onBack: () => void;
}

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  points: number;
  tasks: string[];
}

const DaddyGame = ({ onBack }: DaddyGameProps) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: 1, name: 'Dad', role: 'Daddy', points: 0, tasks: [] },
    { id: 2, name: 'Mom', role: 'Mommy', points: 0, tasks: [] },
    { id: 3, name: 'Child 1', role: 'Kid', points: 0, tasks: [] },
    { id: 4, name: 'Child 2', role: 'Kid', points: 0, tasks: [] }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState<'tasks' | 'love' | 'trivia'>('tasks');

  const familyTasks = [
    'Help with dishes', 'Clean your room', 'Do homework', 'Walk the dog',
    'Water plants', 'Set the table', 'Take out trash', 'Make bed',
    'Help with laundry', 'Be kind to siblings'
  ];

  const familyTrivia = [
    { question: "What's Dad's favorite food?", type: 'open' },
    { question: "When is Mom's birthday?", type: 'open' },
    { question: "What's our family motto?", type: 'open' },
    { question: "Where did we go on our last vacation?", type: 'open' }
  ];

  const addTask = (memberId: number, task: string) => {
    setFamilyMembers(prev => prev.map(member =>
      member.id === memberId
        ? { ...member, tasks: [...member.tasks, task] }
        : member
    ));
  };

  const completeTask = (memberId: number, taskIndex: number) => {
    setFamilyMembers(prev => prev.map(member =>
      member.id === memberId
        ? {
            ...member,
            tasks: member.tasks.filter((_, index) => index !== taskIndex),
            points: member.points + 10
          }
        : member
    ));
  };

  const giveLove = (memberId: number) => {
    setFamilyMembers(prev => prev.map(member =>
      member.id === memberId
        ? { ...member, points: member.points + 5 }
        : member
    ));
  };

  const resetGame = () => {
    setFamilyMembers(prev => prev.map(member => ({
      ...member,
      points: 0,
      tasks: []
    })));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Daddy's Family Fun Game</h2>
      </div>

      {/* Game Mode Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Game Modes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={() => setGameMode('tasks')}
              variant={gameMode === 'tasks' ? 'default' : 'outline'}
            >
              📝 Family Tasks
            </Button>
            <Button
              onClick={() => setGameMode('love')}
              variant={gameMode === 'love' ? 'default' : 'outline'}
            >
              ❤️ Love Points
            </Button>
            <Button
              onClick={() => setGameMode('trivia')}
              variant={gameMode === 'trivia' ? 'default' : 'outline'}
            >
              🧠 Family Trivia
            </Button>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Family Members */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Family Members</h3>
          {familyMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span>{member.name}</span>
                    <span className="text-sm text-gray-500">({member.role})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold">{member.points}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {gameMode === 'tasks' && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Tasks ({member.tasks.length})</h4>
                    {member.tasks.map((task, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{task}</span>
                        <Button
                          onClick={() => completeTask(member.id, index)}
                          size="sm"
                          variant="outline"
                        >
                          ✓ Done
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => setSelectedMember(member.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Add Task
                    </Button>
                  </div>
                )}

                {gameMode === 'love' && (
                  <div className="text-center">
                    <Button
                      onClick={() => giveLove(member.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      Give Love (+5 points)
                    </Button>
                  </div>
                )}

                {gameMode === 'trivia' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Answer family questions to earn points!
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Trivia
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Game Activities */}
        <div className="space-y-4">
          {gameMode === 'tasks' && (
            <Card>
              <CardHeader>
                <CardTitle>Family Task Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMember && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">
                      Add task for {familyMembers.find(m => m.id === selectedMember)?.name}
                    </h4>
                    <div className="flex space-x-2">
                      <Input
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        placeholder="Enter custom task"
                      />
                      <Button
                        onClick={() => {
                          if (newTaskText.trim()) {
                            addTask(selectedMember, newTaskText);
                            setNewTaskText('');
                            setSelectedMember(null);
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Quick Tasks</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {familyTasks.map((task, index) => (
                      <Button
                        key={index}
                        onClick={() => selectedMember && addTask(selectedMember, task)}
                        disabled={!selectedMember}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {task}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {gameMode === 'love' && (
            <Card>
              <CardHeader>
                <CardTitle>Family Love Counter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-lg">Spread love in the family!</p>
                  <p className="text-sm text-gray-600">
                    Click "Give Love" to any family member to show appreciation.
                    Each love gives 5 points!
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold">Love Leader</h4>
                      <p className="text-2xl">
                        {familyMembers.reduce((max, member) => 
                          member.points > max.points ? member : max
                        ).name}
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold">Total Love</h4>
                      <p className="text-2xl">
                        {familyMembers.reduce((sum, member) => sum + member.points, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {gameMode === 'trivia' && (
            <Card>
              <CardHeader>
                <CardTitle>Family Trivia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyTrivia.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <p className="font-semibold mb-2">{question.question}</p>
                    <Input placeholder="Your answer..." className="mb-2" />
                    <Button size="sm" variant="outline">
                      Submit (+15 points)
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaddyGame;
