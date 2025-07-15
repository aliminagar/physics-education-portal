import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import { Atom, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Atom {
  position: [number, number, number];
  element: string;
  color: string;
}

interface Bond {
  start: [number, number, number];
  end: [number, number, number];
}

interface Molecule {
  name: string;
  description: string;
  atoms: Atom[];
  bonds: Bond[];
}

const molecules: Molecule[] = [
  {
    name: 'Water (H₂O)',
    description: 'A water molecule consists of two hydrogen atoms covalently bonded to a single oxygen atom.',
    atoms: [
      { position: [0, 0, 0], element: 'O', color: '#ff0000' },
      { position: [-0.8, 0.6, 0], element: 'H', color: '#ffffff' },
      { position: [0.8, 0.6, 0], element: 'H', color: '#ffffff' },
    ],
    bonds: [
      { start: [0, 0, 0], end: [-0.8, 0.6, 0] },
      { start: [0, 0, 0], end: [0.8, 0.6, 0] },
    ],
  },
  {
    name: 'Carbon Dioxide (CO₂)',
    description: 'A linear molecule with a carbon atom bonded to two oxygen atoms.',
    atoms: [
      { position: [0, 0, 0], element: 'C', color: '#808080' },
      { position: [-1.2, 0, 0], element: 'O', color: '#ff0000' },
      { position: [1.2, 0, 0], element: 'O', color: '#ff0000' },
    ],
    bonds: [
      { start: [-1.2, 0, 0], end: [0, 0, 0] },
      { start: [0, 0, 0], end: [1.2, 0, 0] },
    ],
  },
  {
    name: 'Methane (CH₄)',
    description: 'A tetrahedral molecule with a carbon atom bonded to four hydrogen atoms.',
    atoms: [
      { position: [0, 0, 0], element: 'C', color: '#808080' },
      { position: [0.8, 0.8, 0.8], element: 'H', color: '#ffffff' },
      { position: [-0.8, -0.8, 0.8], element: 'H', color: '#ffffff' },
      { position: [0.8, -0.8, -0.8], element: 'H', color: '#ffffff' },
      { position: [-0.8, 0.8, -0.8], element: 'H', color: '#ffffff' },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0.8, 0.8, 0.8] },
      { start: [0, 0, 0], end: [-0.8, -0.8, 0.8] },
      { start: [0, 0, 0], end: [0.8, -0.8, -0.8] },
      { start: [0, 0, 0], end: [-0.8, 0.8, -0.8] },
    ],
  },
];

const MoleculeScene = ({ molecule, zoom }: { molecule: Molecule; zoom: number }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Atoms */}
      {molecule.atoms.map((atom, index) => (
        <group key={index} position={atom.position.map(p => p * zoom) as [number, number, number]}>
          <Sphere args={[0.3 * zoom, 32, 32]}>
            <meshStandardMaterial color={atom.color} />
          </Sphere>
          <Text
            position={[0, 0.4 * zoom, 0]}
            fontSize={0.3 * zoom}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {atom.element}
          </Text>
        </group>
      ))}

      {/* Bonds */}
      {molecule.bonds.map((bond, index) => (
        <Line
          key={index}
          points={[
            bond.start.map(p => p * zoom) as [number, number, number],
            bond.end.map(p => p * zoom) as [number, number, number],
          ]}
          color="white"
          lineWidth={2}
        />
      ))}
    </>
  );
};

export default function MoleculeViewer() {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(molecules[0]);
  const [zoom, setZoom] = useState(1);
  const controlsRef = useRef(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Atom className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">3D Molecule Viewer</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Molecule</label>
            <select
              className="w-full bg-gray-700 rounded-lg p-3 text-white"
              onChange={(e) => setSelectedMolecule(molecules[Number(e.target.value)])}
            >
              {molecules.map((molecule, index) => (
                <option key={index} value={index}>{molecule.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">{selectedMolecule.name}</h4>
            <p className="text-gray-300">{selectedMolecule.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleZoomIn}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center gap-2"
            >
              <ZoomIn className="w-4 h-4" />
              Zoom In
            </button>
            <button
              onClick={handleZoomOut}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center gap-2"
            >
              <ZoomOut className="w-4 h-4" />
              Zoom Out
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <MoleculeScene molecule={selectedMolecule} zoom={zoom} />
            <OrbitControls ref={controlsRef} />
          </Canvas>
        </div>
      </div>

      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">Instructions:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Click and drag to rotate the molecule</li>
          <li>Use the scroll wheel or pinch gesture to zoom</li>
          <li>Right-click and drag to pan</li>
          <li>Use the zoom buttons for precise control</li>
          <li>Click the reset button to return to the default view</li>
        </ul>
      </div>
    </div>
  );
}