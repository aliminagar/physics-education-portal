import React, { useState } from 'react';
import { Brain, Target, Award, BarChart } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  progress: number;
}

const topics: Topic[] = [
  {
    id: '1',
    title: "Classical Mechanics",
    description: "Learn about Newton's laws, motion, and forces",
    difficulty: 'beginner',
    prerequisites: [],
    progress: 75
  },
  {
    id: '2',
    title: "Quantum Mechanics",
    description: "Explore wave functions and quantum phenomena",
    difficulty: 'advanced',
    prerequisites: ['Classical Mechanics', 'Wave Physics'],
    progress: 30
  },
  {
    id: '3',
    title: "Electromagnetism",
    description: "Study electric and magnetic fields",
    difficulty: 'intermediate',
    prerequisites: ['Classical Mechanics'],
    progress: 50
  }
];

export default function PersonalizedLearning() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Your Learning Path</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTopic?.id === topic.id ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                <h4 className="font-semibold mb-2">{topic.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Target className="w-4 h-4" />
                  <span>{topic.difficulty}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{topic.progress}% complete</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedTopic ? (
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-4">{selectedTopic.title}</h4>
              <p className="text-gray-300 mb-6">{selectedTopic.description}</p>

              {selectedTopic.prerequisites.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-semibold mb-2">Prerequisites:</h5>
                  <ul className="list-disc list-inside text-gray-300">
                    {selectedTopic.prerequisites.map((prereq) => (
                      <li key={prereq}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-blue-400 w-5 h-5" />
                    <h5 className="font-semibold">Your Progress</h5>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">
                    {selectedTopic.progress}%
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart className="text-blue-400 w-5 h-5" />
                    <h5 className="font-semibold">Performance</h5>
                  </div>
                  <div className="text-3xl font-bold text-green-400">
                    Good
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-700 rounded-lg p-6 flex items-center justify-center">
              <p className="text-gray-400">Select a topic to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}