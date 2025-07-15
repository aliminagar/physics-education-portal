import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Text } from '@react-three/drei';
import { History, Atom, Info, ArrowRight, ArrowLeft } from 'lucide-react';

interface AtomicModel {
  id: string;
  name: string;
  year: string;
  scientist: string;
  description: string;
  component: React.ComponentType;
  key_points: string[];
}

// Ancient Greek Model
function DemocritusModel() {
  return (
    <group>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} metalness={0.5} roughness={0.2} />
      </Sphere>
    </group>
  );
}

// Dalton's Model
function DaltonModel() {
  return (
    <group>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#D2691E" emissive="#D2691E" emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
      </Sphere>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Solid Sphere
      </Text>
    </group>
  );
}

// Thomson's Plum Pudding Model
function ThomsonModel() {
  return (
    <group>
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial color="#A0A0A0" emissive="#A0A0A0" emissiveIntensity={0.1} metalness={0.7} roughness={0.2} transparent opacity={0.8} />
      </Sphere>
      {[...Array(8)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.1, 16, 16]}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 0.8,
            Math.sin((i / 8) * Math.PI * 2) * 0.8,
            0
          ]}
        >
          <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
        </Sphere>
      ))}
    </group>
  );
}

// Rutherford's Nuclear Model
function RutherfordModel() {
  return (
    <group>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
      </Sphere>
      {[...Array(3)].map((_, i) => (
        <Torus
          key={i}
          args={[1.5, 0.02, 16, 100]}
          rotation={[Math.PI / 3 * i, Math.PI / 4, 0]}
        >
          <meshStandardMaterial color="#4D9EFF" emissive="#4D9EFF" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
        </Torus>
      ))}
      {[...Array(6)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.1, 16, 16]}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 1.5,
            Math.sin((i / 6) * Math.PI * 2) * 1.5,
            0
          ]}
        >
          <meshStandardMaterial color="#4D9EFF" emissive="#4D9EFF" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
        </Sphere>
      ))}
    </group>
  );
}

// Bohr's Model
function BohrModel() {
  return (
    <group>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
      </Sphere>
      {[...Array(3)].map((_, i) => {
        const radius = (i + 1) * 0.8;
        return (
          <group key={i}>
            <Torus args={[radius, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#4D9EFF" emissive="#4D9EFF" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
            </Torus>
            <Sphere
              args={[0.1, 16, 16]}
              position={[radius, 0, 0]}
            >
              <meshStandardMaterial color="#4D9EFF" emissive="#4D9EFF" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
}

// Quantum Mechanical Model
function QuantumModel() {
  return (
    <group>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
      </Sphere>
      {[...Array(50)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.05, 8, 8]}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          ]}
        >
          <meshStandardMaterial
            color="#4D9EFF"
            emissive="#4D9EFF"
            emissiveIntensity={0.5}
            metalness={0.5}
            roughness={0.2}
            transparent
            opacity={0.3 + Math.random() * 0.7}
          />
        </Sphere>
      ))}
    </group>
  );
}

const atomicModels: AtomicModel[] = [
  {
    id: 'ancient',
    name: 'Ancient Greek Model',
    year: '460-370 BCE',
    scientist: 'Democritus',
    description: 'Proposed that all matter is made up of indivisible particles called "atomos".',
    component: DemocritusModel,
    key_points: [
      'Matter is composed of indivisible particles',
      'Atoms are eternal and indestructible',
      'Different arrangements create different materials',
      'First philosophical concept of atoms'
    ]
  },
  {
    id: 'dalton',
    name: "Dalton\u2019s Atomic Theory",
    year: '1808',
    scientist: 'John Dalton',
    description: 'Proposed that atoms are solid spheres and each element has its own unique type of atom.',
    component: DaltonModel,
    key_points: [
      'Atoms are indivisible and indestructible',
      'All atoms of an element are identical',
      'Different elements have different types of atoms',
      'Chemical reactions involve rearrangement of atoms'
    ]
  },
  {
    id: 'thomson',
    name: 'Plum Pudding Model',
    year: '1904',
    scientist: 'J.J. Thomson',
    description: 'Proposed that atoms were made of positive matter with negative electrons embedded throughout.',
    component: ThomsonModel,
    key_points: [
      'Atoms have a positive charge throughout',
      'Electrons are embedded like plums in pudding',
      'First model to include subatomic particles',
      'Discovered the electron'
    ]
  },
  {
    id: 'rutherford',
    name: 'Nuclear Model',
    year: '1911',
    scientist: 'Ernest Rutherford',
    description: 'Discovered that atoms have a dense, positively charged nucleus with electrons orbiting around it.',
    component: RutherfordModel,
    key_points: [
      'Dense, positive nucleus at center',
      'Electrons orbit like planets',
      'Mostly empty space',
      'Based on gold foil experiment'
    ]
  },
  {
    id: 'bohr',
    name: 'Bohr Model',
    year: '1913',
    scientist: 'Niels Bohr',
    description: 'Proposed that electrons orbit the nucleus in fixed energy levels or shells.',
    component: BohrModel,
    key_points: [
      'Electrons in fixed energy levels',
      'Quantum jumps between levels',
      'Explains atomic spectra',
      'Introduced quantum concepts'
    ]
  },
  {
    id: 'quantum',
    name: 'Quantum Mechanical Model',
    year: '1926',
    scientist: 'Erwin Schrödinger',
    description: 'Describes electrons as standing waves or probability clouds around the nucleus.',
    component: QuantumModel,
    key_points: [
      'Electron clouds instead of orbits',
      'Based on probability',
      'Explains chemical bonding',
      'Most accurate model to date'
    ]
  }
];

export default function AtomicModelsTimeline() {
  const [currentModel, setCurrentModel] = useState(0);
  const model = atomicModels[currentModel];

  const handlePrevious = () => {
    setCurrentModel(prev => (prev > 0 ? prev - 1 : atomicModels.length - 1));
  };

  const handleNext = () => {
    setCurrentModel(prev => (prev < atomicModels.length - 1 ? prev + 1 : 0));
  };

  const ModelComponent = model.component;

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <History className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Evolution of Atomic Theory</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-2xl font-bold">{model.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-blue-400">{model.year}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{model.scientist}</span>
                </div>
              </div>
              <Atom className="text-blue-400 w-8 h-8" />
            </div>
            <p className="text-gray-300 mt-4">{model.description}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-blue-400 w-5 h-5" />
              <h5 className="text-lg font-semibold">Key Points</h5>
            </div>
            <ul className="space-y-3">
              {model.key_points.map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous Model
            </button>
            <button
              onClick={handleNext}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Next Model
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.8} /> {/* Increased ambient light intensity */}
            <pointLight position={[10, 10, 10]} intensity={1.5} /> {/* Increased point light intensity */}
            <ModelComponent />
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          </Canvas>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4">
        {atomicModels.map((m, index) => (
          <button
            key={m.id}
            onClick={() => setCurrentModel(index)}
            className={`p-3 rounded-lg text-center transition-colors ${
              currentModel === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <div className="text-sm font-medium">{m.year}</div>
            <div className="text-xs mt-1 opacity-75">{m.scientist}</div>
          </button>
        ))}
      </div>
    </div>
  );
}