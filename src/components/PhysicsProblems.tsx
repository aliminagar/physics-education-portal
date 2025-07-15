import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { BookOpen, Check, ChevronRight, Brain, Star, Award, RotateCcw } from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  equation: string;
  steps: {
    explanation: string;
    equation?: string;
  }[];
  solution: {
    value: number;
    unit: string;
  };
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Projectile Motion",
    category: "Mechanics",
    difficulty: "Intermediate",
    question: "A ball is thrown from a height of 20m with an initial velocity of 15 m/s at an angle of 30° above the horizontal. Calculate the maximum height reached by the ball relative to the ground.",
    equation: "h_{max} = h_0 + \\frac{v_0^2\\sin^2\\theta}{2g}",
    steps: [
      {
        explanation: "First, identify the initial height (h₀) and velocity components",
        equation: "h_0 = 20\\text{ m}, v_0 = 15\\text{ m/s}, \\theta = 30°"
      },
      {
        explanation: "Calculate the vertical component of initial velocity",
        equation: "v_{0y} = v_0\\sin\\theta = 15\\sin(30°) = 7.5\\text{ m/s}"
      },
      {
        explanation: "Use the maximum height formula",
        equation: "h_{max} = 20 + \\frac{(7.5\\text{ m/s})^2}{2(9.81\\text{ m/s}^2)}"
      }
    ],
    solution: {
      value: 22.86,
      unit: "meters"
    }
  },
  {
    id: 2,
    title: "Simple Harmonic Motion",
    category: "Waves",
    difficulty: "Advanced",
    question: "A mass of 0.5 kg is attached to a spring with spring constant k = 200 N/m. If the mass is displaced 0.1 m from equilibrium and released, calculate its maximum velocity.",
    equation: "v_{max} = A\\omega = A\\sqrt{\\frac{k}{m}}",
    steps: [
      {
        explanation: "Identify the amplitude (A) and system parameters",
        equation: "A = 0.1\\text{ m}, k = 200\\text{ N/m}, m = 0.5\\text{ kg}"
      },
      {
        explanation: "Calculate the angular frequency ω",
        equation: "\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{200}{0.5}} = 20\\text{ rad/s}"
      },
      {
        explanation: "Calculate maximum velocity",
        equation: "v_{max} = (0.1\\text{ m})(20\\text{ rad/s})"
      }
    ],
    solution: {
      value: 2,
      unit: "m/s"
    }
  },
  {
    id: 3,
    title: "Electric Field",
    category: "Electromagnetism",
    difficulty: "Beginner",
    question: "Calculate the electric field strength at a distance of 0.3 meters from a point charge of 2μC.",
    equation: "E = \\frac{kq}{r^2}",
    steps: [
      {
        explanation: "Identify Coulomb's constant and convert units",
        equation: "k = 8.99 × 10^9\\text{ N⋅m²/C²}, q = 2 × 10^{-6}\\text{ C}"
      },
      {
        explanation: "Apply the electric field formula",
        equation: "E = \\frac{(8.99 × 10^9)(2 × 10^{-6})}{(0.3)^2}"
      }
    ],
    solution: {
      value: 199800,
      unit: "N/C"
    }
  }
];

export default function PhysicsProblems() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showSteps, setShowSteps] = useState<boolean[]>([]);
  const [completedProblems, setCompletedProblems] = useState<number[]>([]);

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setShowSolution(false);
    setShowSteps(new Array(problem.steps.length).fill(false));
  };

  const handleComplete = (problemId: number) => {
    if (!completedProblems.includes(problemId)) {
      setCompletedProblems([...completedProblems, problemId]);
    }
  };

  const resetProgress = () => {
    setCompletedProblems([]);
    setShowSolution(false);
    setShowSteps([]);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-400 w-6 h-6" />
          <h3 className="text-2xl font-bold">Advanced Physics Problems</h3>
        </div>
        <button
          onClick={resetProgress}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Progress
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problem List */}
        <div className="lg:col-span-1 space-y-4">
          {problems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => handleSelectProblem(problem)}
              className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
                selectedProblem?.id === problem.id ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{problem.title}</h4>
                {completedProblems.includes(problem.id) && (
                  <Check className="text-green-400 w-5 h-5" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Star className="w-4 h-4" />
                <span>{problem.difficulty}</span>
              </div>
              <div className="text-sm text-gray-300">{problem.category}</div>
            </div>
          ))}
        </div>

        {/* Problem Details */}
        <div className="lg:col-span-2">
          {selectedProblem ? (
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">{selectedProblem.title}</h4>
                <p className="text-gray-300 mb-4">{selectedProblem.question}</p>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <BlockMath>{selectedProblem.equation}</BlockMath>
                </div>
              </div>

              {/* Solution Steps */}
              <div className="space-y-4">
                {selectedProblem.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`bg-gray-700 rounded-lg p-4 transition-all ${
                      !showSteps[index] ? 'opacity-50' : ''
                    }`}
                  >
                    <button
                      onClick={() => {
                        const newSteps = [...showSteps];
                        newSteps[index] = true;
                        setShowSteps(newSteps);
                      }}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        showSteps[index] ? 'rotate-90' : ''
                      }`} />
                      Step {index + 1}
                    </button>
                    
                    {showSteps[index] && (
                      <div className="mt-2">
                        <p className="text-gray-300 mb-2">{step.explanation}</p>
                        {step.equation && (
                          <div className="bg-gray-800 rounded-lg p-3">
                            <BlockMath>{step.equation}</BlockMath>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Final Solution */}
              <div className="bg-gray-700 rounded-lg p-6">
                <button
                  onClick={() => {
                    setShowSolution(true);
                    handleComplete(selectedProblem.id);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  Show Solution
                </button>
                
                {showSolution && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-xl">
                      <span>Solution:</span>
                      <span className="font-bold text-blue-400">
                        {selectedProblem.solution.value} {selectedProblem.solution.unit}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-700 rounded-lg p-6 flex items-center justify-center">
              <p className="text-gray-400">Select a problem to begin</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Your Progress</h4>
          <div className="flex items-center gap-2">
            <Award className="text-blue-400 w-5 h-5" />
            <span>{completedProblems.length} of {problems.length} completed</span>
          </div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-400 h-2 rounded-full transition-all"
            style={{
              width: `${(completedProblems.length / problems.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}