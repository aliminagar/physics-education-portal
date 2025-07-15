import React, { useState, useEffect } from 'react';
import { Book, Atom, Stars, Telescope, ChevronDown, Brain, Lightbulb, Award, Quote, Calculator, Microscope, Compass, Rocket, Beaker, Zap, Flame, Sparkles, Clock, Menu, X, ChevronUp } from 'lucide-react';
import InteractiveExperiments from './components/InteractiveExperiments';
import PhysicsTimeline from './components/PhysicsTimeline';
import QuantumMechanics from './components/QuantumMechanics';
import PhysicsProblems from './components/PhysicsProblems';
import NewsSection from './components/NewsSection';
import StudyResources from './components/StudyResources';
import CommunityForum from './components/CommunityForum';
import PersonalizedLearning from './components/PersonalizedLearning';
import PhysicsCalculator from './components/PhysicsCalculator';
import PhysicsQuiz from './components/PhysicsQuiz';
import MoleculeViewer from './components/MoleculeViewer';

function App() {
  const [activeTab, setActiveTab] = useState('classical');
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowFloatingNav(scrollPosition > 800);
      setShowScrollTop(scrollPosition > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'classical':
        return (
          <>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="text-blue-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Classical Mechanics</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Newton's Laws</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>1. Law of Inertia</li>
                      <li>2. F = ma</li>
                      <li>3. Action-Reaction</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Conservation Laws</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Energy Conservation</li>
                      <li>Momentum Conservation</li>
                      <li>Angular Momentum</li>
                    </ul>
                  </div>
                </div>
                <InteractiveExperiments />
                <PhysicsCalculator />
                <PhysicsQuiz />
              </div>
            </div>
          </>
        );
      case 'quantum':
        return (
          <>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Atom className="text-blue-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Quantum Physics</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Wave-Particle Duality</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Double-slit experiment</li>
                      <li>Wave functions</li>
                      <li>Probability distributions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Quantum States</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Superposition</li>
                      <li>Entanglement</li>
                      <li>Measurement</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Applications</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Quantum Computing</li>
                      <li>Quantum Cryptography</li>
                      <li>Quantum Sensors</li>
                    </ul>
                  </div>
                </div>
                <MoleculeViewer />
                <QuantumMechanics />
                <StudyResources />
              </div>
            </div>
          </>
        );
      case 'astronomy':
        return (
          <>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Telescope className="text-blue-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Astronomy & Astrophysics</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Solar System</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Planetary Motion</li>
                      <li>Kepler's Laws</li>
                      <li>Orbital Mechanics</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Stars</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Stellar Evolution</li>
                      <li>Nuclear Fusion</li>
                      <li>Spectroscopy</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Galaxies</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Galaxy Types</li>
                      <li>Dark Matter</li>
                      <li>Cosmic Structure</li>
                    </ul>
                  </div>
                </div>
                <NewsSection />
                <StudyResources />
              </div>
            </div>
          </>
        );
      case 'electromagnetism':
        return (
          <>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-blue-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Electromagnetism</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Maxwell's Equations</h4>
                    <div className="space-y-2 text-gray-300">
                      <p>∇ · E = ρ/ε₀</p>
                      <p>∇ · B = 0</p>
                      <p>∇ × E = -∂B/∂t</p>
                      <p>∇ × B = μ₀J + μ₀ε₀∂E/∂t</p>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Applications</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Electric Circuits</li>
                      <li>Electromagnetic Waves</li>
                      <li>Electromagnetic Induction</li>
                    </ul>
                  </div>
                </div>
                <InteractiveExperiments />
                <PhysicsProblems />
              </div>
            </div>
          </>
        );
      case 'thermodynamics':
        return (
          <>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="text-blue-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Thermodynamics</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Laws of Thermodynamics</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Zeroth Law: Thermal Equilibrium</li>
                      <li>First Law: Energy Conservation</li>
                      <li>Second Law: Entropy</li>
                      <li>Third Law: Absolute Zero</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Processes</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Isothermal</li>
                      <li>Adiabatic</li>
                      <li>Isobaric</li>
                      <li>Isochoric</li>
                    </ul>
                  </div>
                </div>
                <InteractiveExperiments />
                <StudyResources />
              </div>
            </div>
          </>
        );
      case 'relativity':
        return (
          <>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-blue-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Theory of Relativity</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Special Relativity</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Time Dilation</li>
                      <li>Length Contraction</li>
                      <li>Mass-Energy Equivalence</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">General Relativity</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Curved Spacetime</li>
                      <li>Gravitational Lensing</li>
                      <li>Black Holes</li>
                    </ul>
                  </div>
                </div>
                <StudyResources />
                <PhysicsProblems />
              </div>
            </div>
          </>
        );
      case 'modern':
        return (
          <>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Atom className="text-blue-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Modern Physics</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Particle Physics</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Standard Model</li>
                      <li>Quantum Field Theory</li>
                      <li>Higgs Boson</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">Cosmology</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Big Bang Theory</li>
                      <li>Dark Energy</li>
                      <li>Cosmic Inflation</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">String Theory</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>Extra Dimensions</li>
                      <li>M-Theory</li>
                      <li>Supersymmetry</li>
                    </ul>
                  </div>
                </div>
                <NewsSection />
                <StudyResources />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Physics Education Portal</h1>
          <p className="text-xl text-gray-300">Explore the fascinating world of physics</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex space-x-4 overflow-x-auto py-4">
            <button
              onClick={() => setActiveTab('classical')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'classical' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Classical Physics
            </button>
            <button
              onClick={() => setActiveTab('quantum')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'quantum' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Quantum Physics
            </button>
            <button
              onClick={() => setActiveTab('astronomy')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'astronomy' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Astronomy
            </button>
            <button
              onClick={() => setActiveTab('electromagnetism')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'electromagnetism' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Electromagnetism
            </button>
            <button
              onClick={() => setActiveTab('thermodynamics')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'thermodynamics' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Thermodynamics
            </button>
            <button
              onClick={() => setActiveTab('relativity')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'relativity' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Relativity
            </button>
            <button
              onClick={() => setActiveTab('modern')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'modern' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Modern Physics
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
        {renderContent()}
        <PhysicsTimeline />
      </main>

      {/* Floating Navigation */}
      {showFloatingNav && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={scrollToTop}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Physics Education Portal</h3>
              <p className="text-gray-300">Empowering students to explore and understand the universe through physics.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Book className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Atom className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Stars className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Physics Education Portal. All rights reserved.</p>
            <p className="mt-2 text-sm">Created by Alireza Minagar in March 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;