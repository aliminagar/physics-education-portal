import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, RefreshCw, Filter, Shuffle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'classical' | 'quantum' | 'thermodynamics' | 'electromagnetism' | 'relativity' | 'modern';
  difficulty: 'easy' | 'medium' | 'hard';
}

const questions: Question[] = [
  // Classical Mechanics
  {
    id: 1,
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Pascal", "Watt"],
    correctAnswer: 1,
    explanation: "The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kilogram of mass at 1 meter per second squared.",
    category: 'classical',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "In a perfectly elastic collision between two objects, what is conserved?",
    options: ["Only momentum", "Only kinetic energy", "Both momentum and kinetic energy", "Neither momentum nor kinetic energy"],
    correctAnswer: 2,
    explanation: "In a perfectly elastic collision, both linear momentum and kinetic energy are conserved. This is what distinguishes elastic from inelastic collisions.",
    category: 'classical',
    difficulty: 'medium'
  },
  {
    id: 3,
    question: "What is the period of a simple pendulum that is 2 meters long on Earth (g = 9.81 m/s²)?",
    options: ["1.42 seconds", "2.84 seconds", "4.26 seconds", "5.68 seconds"],
    correctAnswer: 1,
    explanation: "The period of a simple pendulum is T = 2π√(L/g). With L = 2m and g = 9.81 m/s², T = 2.84 seconds.",
    category: 'classical',
    difficulty: 'hard'
  },
  {
    id: 4,
    question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
    options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
    correctAnswer: 2,
    explanation: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force.",
    category: 'classical',
    difficulty: 'easy'
  },
  {
    id: 5,
    question: "What is angular momentum?",
    options: ["Mass times velocity", "Mass times acceleration", "Moment of inertia times angular velocity", "Force times radius"],
    correctAnswer: 2,
    explanation: "Angular momentum is defined as the moment of inertia (I) multiplied by the angular velocity (ω).",
    category: 'classical',
    difficulty: 'medium'
  },
  
  // Quantum Mechanics
  {
    id: 6,
    question: "What is the uncertainty principle?",
    options: [
      "You can't measure anything perfectly",
      "Position and momentum cannot be simultaneously known with arbitrary precision",
      "Energy is always uncertain",
      "Time is uncertain"
    ],
    correctAnswer: 1,
    explanation: "Heisenberg's uncertainty principle states that position and momentum of a particle cannot be simultaneously known with arbitrary precision.",
    category: 'quantum',
    difficulty: 'medium'
  },
  {
    id: 7,
    question: "What is the wave function (ψ) in quantum mechanics?",
    options: [
      "The actual path of a particle",
      "A mathematical description of the quantum state",
      "The energy of a particle",
      "The speed of a particle"
    ],
    correctAnswer: 1,
    explanation: "The wave function is a mathematical description of the quantum state of an isolated quantum system.",
    category: 'quantum',
    difficulty: 'hard'
  },
  {
    id: 8,
    question: "What is quantum entanglement?",
    options: [
      "When particles get stuck together",
      "When particles share the same energy",
      "When the quantum states of particles cannot be described independently",
      "When particles have the same wavelength"
    ],
    correctAnswer: 2,
    explanation: "Quantum entanglement occurs when particles become correlated in such a way that the quantum state of each particle cannot be described independently.",
    category: 'quantum',
    difficulty: 'hard'
  },
  
  // Thermodynamics
  {
    id: 9,
    question: "What is the zeroth law of thermodynamics about?",
    options: [
      "Energy conservation",
      "Entropy",
      "Thermal equilibrium",
      "Heat transfer"
    ],
    correctAnswer: 2,
    explanation: "The zeroth law of thermodynamics states that if two systems are in thermal equilibrium with a third system, they are in thermal equilibrium with each other.",
    category: 'thermodynamics',
    difficulty: 'medium'
  },
  {
    id: 10,
    question: "What happens to entropy in an isolated system?",
    options: [
      "It decreases",
      "It stays the same",
      "It increases",
      "It oscillates"
    ],
    correctAnswer: 2,
    explanation: "According to the second law of thermodynamics, the entropy of an isolated system always increases over time.",
    category: 'thermodynamics',
    difficulty: 'medium'
  },
  
  // Electromagnetism
  {
    id: 11,
    question: "What is Coulomb's law about?",
    options: [
      "Magnetic fields",
      "Electric current",
      "Electrostatic force between charges",
      "Electromagnetic induction"
    ],
    correctAnswer: 2,
    explanation: "Coulomb's law describes the electrostatic force between electrically charged particles.",
    category: 'electromagnetism',
    difficulty: 'medium'
  },
  {
    id: 12,
    question: "What is Faraday's law of induction?",
    options: [
      "Current induces magnetic field",
      "Changing magnetic field induces EMF",
      "Charges create electric fields",
      "Magnetic fields affect charges"
    ],
    correctAnswer: 1,
    explanation: "Faraday's law states that a changing magnetic field induces an electromotive force (EMF) in a conductor.",
    category: 'electromagnetism',
    difficulty: 'hard'
  },
  
  // Relativity
  {
    id: 13,
    question: "What is time dilation?",
    options: [
      "Time moving backwards",
      "Time moving faster",
      "Time moving slower for moving objects",
      "Time stopping completely"
    ],
    correctAnswer: 2,
    explanation: "Time dilation is the phenomenon where time passes slower for objects moving at high velocities relative to a stationary observer.",
    category: 'relativity',
    difficulty: 'hard'
  },
  {
    id: 14,
    question: "What is the famous equation E = mc²?",
    options: [
      "Energy equals mass times speed",
      "Energy equals mass times the speed of light squared",
      "Energy equals momentum times speed",
      "Energy equals mass times acceleration"
    ],
    correctAnswer: 1,
    explanation: "Einstein's famous equation E = mc² shows that mass and energy are equivalent and interchangeable.",
    category: 'relativity',
    difficulty: 'medium'
  },
  
  // Modern Physics
  {
    id: 15,
    question: "What is the Higgs boson?",
    options: [
      "A type of atom",
      "A particle that gives other particles mass",
      "A type of wave",
      "A form of energy"
    ],
    correctAnswer: 1,
    explanation: "The Higgs boson is a particle that gives mass to other fundamental particles through the Higgs mechanism.",
    category: 'modern',
    difficulty: 'hard'
  },
  {
    id: 16,
    question: "What is dark matter?",
    options: [
      "Matter in black holes",
      "Matter that doesn't emit light but has gravitational effects",
      "Anti-matter",
      "Matter in distant galaxies"
    ],
    correctAnswer: 1,
    explanation: "Dark matter is a hypothetical form of matter that doesn't interact with electromagnetic radiation but exerts gravitational effects.",
    category: 'modern',
    difficulty: 'hard'
  },
  {
    id: 17,
    question: "What is the principle of wave-particle duality?",
    options: [
      "Waves can become particles",
      "Particles can become waves",
      "Matter can exhibit both wave and particle properties",
      "Light can only be a wave"
    ],
    correctAnswer: 2,
    explanation: "Wave-particle duality states that all matter and radiation exhibits both wave and particle characteristics.",
    category: 'quantum',
    difficulty: 'medium'
  },
  {
    id: 18,
    question: "What is the first law of thermodynamics?",
    options: [
      "Energy cannot be created or destroyed",
      "Entropy always increases",
      "Heat flows from hot to cold",
      "Temperature is constant in equilibrium"
    ],
    correctAnswer: 0,
    explanation: "The first law of thermodynamics is a statement of conservation of energy.",
    category: 'thermodynamics',
    difficulty: 'medium'
  },
  {
    id: 19,
    question: "What is the strong nuclear force?",
    options: [
      "The force between electrons",
      "The force of gravity",
      "The force holding nuclei together",
      "The force between molecules"
    ],
    correctAnswer: 2,
    explanation: "The strong nuclear force is the force that holds quarks together to form protons and neutrons, and holds protons and neutrons together in atomic nuclei.",
    category: 'modern',
    difficulty: 'medium'
  },
  {
    id: 20,
    question: "What is the photoelectric effect?",
    options: [
      "Light creating shadows",
      "Light producing electricity",
      "Electrons emitting light",
      "Light bending around objects"
    ],
    correctAnswer: 1,
    explanation: "The photoelectric effect is the emission of electrons when light hits a material, demonstrating light's particle nature.",
    category: 'quantum',
    difficulty: 'medium'
  },
  {
    id: 21,
    question: "What is Ohm's law?",
    options: [
      "P = VI",
      "V = IR",
      "F = ma",
      "E = mc²"
    ],
    correctAnswer: 1,
    explanation: "Ohm's law states that the current through a conductor is directly proportional to the voltage and inversely proportional to the resistance (V = IR).",
    category: 'electromagnetism',
    difficulty: 'easy'
  },
  {
    id: 22,
    question: "What is the principle of conservation of momentum?",
    options: [
      "Energy is always conserved",
      "Mass is always conserved",
      "Total momentum remains constant in an isolated system",
      "Force is always conserved"
    ],
    correctAnswer: 2,
    explanation: "The principle of conservation of momentum states that the total momentum of an isolated system remains constant if no external forces act on it.",
    category: 'classical',
    difficulty: 'medium'
  },
  {
    id: 23,
    question: "What is the speed of sound in air at room temperature (approximately)?",
    options: [
      "343 m/s",
      "300,000 km/s",
      "100 m/s",
      "1000 m/s"
    ],
    correctAnswer: 0,
    explanation: "The speed of sound in air at room temperature (20°C) is approximately 343 meters per second.",
    category: 'classical',
    difficulty: 'easy'
  },
  {
    id: 24,
    question: "What is the Doppler effect?",
    options: [
      "Change in wave frequency due to relative motion",
      "Change in wave amplitude",
      "Change in wave speed",
      "Change in wave direction"
    ],
    correctAnswer: 0,
    explanation: "The Doppler effect is the change in frequency of a wave in relation to an observer moving relative to its source.",
    category: 'classical',
    difficulty: 'medium'
  },
  {
    id: 25,
    question: "What is the principle of superposition?",
    options: [
      "Waves cancel each other",
      "Waves combine additively",
      "Waves multiply together",
      "Waves divide each other"
    ],
    correctAnswer: 1,
    explanation: "The principle of superposition states that when two or more waves overlap, the resultant displacement at any point is the sum of the displacements of the individual waves.",
    category: 'classical',
    difficulty: 'medium'
  },
  {
    id: 26,
    question: "What is the law of universal gravitation?",
    options: [
      "Objects fall at the same rate",
      "Gravity is constant everywhere",
      "Force is proportional to mass product and inversely proportional to distance squared",
      "Gravity only affects heavy objects"
    ],
    correctAnswer: 2,
    explanation: "Newton's law of universal gravitation states that the gravitational force between two masses is proportional to their product and inversely proportional to the square of the distance between them.",
    category: 'classical',
    difficulty: 'medium'
  },
  {
    id: 27,
    question: "What is the principle of equivalence in general relativity?",
    options: [
      "Mass and energy are equivalent",
      "Gravitational and inertial mass are equivalent",
      "Space and time are equivalent",
      "Force and acceleration are equivalent"
    ],
    correctAnswer: 1,
    explanation: "The principle of equivalence states that gravitational and inertial mass are equivalent, and that the effects of gravity are indistinguishable from the effects of acceleration.",
    category: 'relativity',
    difficulty: 'hard'
  },
  {
    id: 28,
    question: "What is quantum tunneling?",
    options: [
      "Digging through matter",
      "Particles passing through classical barriers",
      "Creating wormholes",
      "Quantum teleportation"
    ],
    correctAnswer: 1,
    explanation: "Quantum tunneling is a quantum mechanical phenomenon where a particle passes through a potential barrier that it classically could not surmount.",
    category: 'quantum',
    difficulty: 'hard'
  },
  {
    id: 29,
    question: "What is the concept of entropy?",
    options: [
      "Total energy of a system",
      "Measure of disorder in a system",
      "Temperature of a system",
      "Pressure of a system"
    ],
    correctAnswer: 1,
    explanation: "Entropy is a measure of the disorder or randomness in a system, and it tends to increase over time in isolated systems.",
    category: 'thermodynamics',
    difficulty: 'hard'
  },
  {
    id: 30,
    question: "What is the relationship between electric and magnetic fields in electromagnetic waves?",
    options: [
      "They are parallel",
      "They are perpendicular",
      "They are opposite",
      "They are unrelated"
    ],
    correctAnswer: 1,
    explanation: "In electromagnetic waves, the electric and magnetic fields are perpendicular to each other and to the direction of wave propagation.",
    category: 'electromagnetism',
    difficulty: 'hard'
  }
];

export default function PhysicsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Question['category'] | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Question['difficulty'] | 'all'>('all');
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const filterQuestions = () => {
    let filtered = [...questions];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    setFilteredQuestions(filtered);
    resetQuiz();
  };

  const shuffleQuestions = () => {
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    resetQuiz();
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === filteredQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="text-blue-400 w-6 h-6" />
          <h3 className="text-2xl font-bold">Physics Quiz Challenge</h3>
        </div>
        <div className="flex gap-4">
          <select
            className="bg-gray-700 rounded-lg px-3 py-1 text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Question['category'] | 'all')}
          >
            <option value="all">All Categories</option>
            <option value="classical">Classical Mechanics</option>
            <option value="quantum">Quantum Mechanics</option>
            <option value="thermodynamics">Thermodynamics</option>
            <option value="electromagnetism">Electromagnetism</option>
            <option value="relativity">Relativity</option>
            <option value="modern">Modern Physics</option>
          </select>
          <select
            className="bg-gray-700 rounded-lg px-3 py-1 text-sm"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as Question['difficulty'] | 'all')}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={filterQuestions}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={shuffleQuestions}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
        </div>
      </div>

      {!quizComplete ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </span>
            <span className="text-sm text-gray-400">
              Score: {score}/{filteredQuestions.length}
            </span>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-sm ${
                filteredQuestions[currentQuestion].difficulty === 'easy' ? 'bg-green-900 text-green-300' :
                filteredQuestions[currentQuestion].difficulty === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {filteredQuestions[currentQuestion].difficulty}
              </span>
              <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-sm">
                {filteredQuestions[currentQuestion].category}
              </span>
            </div>
            <h4 className="text-xl font-semibold mb-4">
              {filteredQuestions[currentQuestion].question}
            </h4>
            <div className="space-y-3">
              {filteredQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedAnswer === null
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : index === filteredQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-600'
                      : selectedAnswer === index
                      ? 'bg-red-600'
                      : 'bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === filteredQuestions[currentQuestion].correctAnswer ? (
                  <CheckCircle className="text-green-400 w-5 h-5" />
                ) : (
                  <XCircle className="text-red-400 w-5 h-5" />
                )}
                <h5 className="font-semibold">Explanation:</h5>
              </div>
              <p className="text-gray-300">
                {filteredQuestions[currentQuestion].explanation}
              </p>
              <button
                onClick={nextQuestion}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {currentQuestion < filteredQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-6 text-center">
          <h4 className="text-2xl font-bold mb-4">Quiz Complete!</h4>
          <p className="text-xl mb-6">
            Your score: {score} out of {filteredQuestions.length} ({((score / filteredQuestions.length) * 100).toFixed(1)}%)
          </p>
          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}