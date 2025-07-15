import React, { useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Box, Sphere, Torus } from '@react-three/drei';
import { Cuboid as Cube3D, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

function CameraController({ zoom }: { zoom: number }) {
  const { camera } = useThree();
  
  React.useEffect(() => {
    camera.position.multiplyScalar(zoom);
  }, [zoom, camera]);
  
  return null;
}

function AtomModel() {
  return (
    <group>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#ff4444" />
      </Sphere>
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4444ff" />
      </Torus>
      <Torus args={[2, 0.1, 16, 100]} rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <meshStandardMaterial color="#4444ff" />
      </Torus>
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 4, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#4444ff" />
      </Torus>
    </group>
  );
}

function WaveModel() {
  const points = 50;
  const amplitude = 1;
  const frequency = 1;
  
  return (
    <group>
      {Array.from({ length: points }).map((_, i) => {
        const x = (i - points / 2) * 0.2;
        const y = amplitude * Math.sin(frequency * x);
        return (
          <Sphere key={i} args={[0.1, 16, 16]} position={[x, y, 0]}>
            <meshStandardMaterial color="#44ff44" />
          </Sphere>
        );
      })}
    </group>
  );
}

function QuantumBoxModel() {
  return (
    <group>
      <Box args={[3, 3, 3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4444ff" transparent opacity={0.3} />
      </Box>
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ff4444" />
      </Sphere>
    </group>
  );
}

const models = [
  {
    name: 'Atom Structure',
    component: AtomModel,
    description: 'Visualization of an atom with electron orbitals',
    camera: { position: [0, 2, 5] }
  },
  {
    name: 'Wave Function',
    component: WaveModel,
    description: 'Representation of a quantum mechanical wave function',
    camera: { position: [0, 0, 10] }
  },
  {
    name: 'Quantum Box',
    component: QuantumBoxModel,
    description: 'Particle in a 3D potential well',
    camera: { position: [4, 4, 4] }
  }
];

export default function ThreeDViewer() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [zoom, setZoom] = useState(1);
  const controlsRef = useRef<any>(null);

  const handleZoomIn = () => {
    setZoom(prev => {
      const newZoom = Math.min(prev + 0.2, 2);
      if (controlsRef.current) {
        controlsRef.current.object.position.multiplyScalar(newZoom / prev);
      }
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.2, 0.5);
      if (controlsRef.current) {
        controlsRef.current.object.position.multiplyScalar(newZoom / prev);
      }
      return newZoom;
    });
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.object.position.set(
        selectedModel.camera.position[0],
        selectedModel.camera.position[1],
        selectedModel.camera.position[2]
      );
    }
    setZoom(1);
  };

  const ModelComponent = selectedModel.component;

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Cube3D className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">3D Physics Visualizations</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Model</label>
            <select
              className="w-full bg-gray-700 rounded-lg p-3 text-white"
              onChange={(e) => {
                setSelectedModel(models[Number(e.target.value)]);
                handleReset();
              }}
            >
              {models.map((model, index) => (
                <option key={index} value={index}>{model.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">{selectedModel.name}</h4>
            <p className="text-gray-300">{selectedModel.description}</p>
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
          <Canvas camera={{ position: selectedModel.camera.position }}>
            <CameraController zoom={zoom} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ModelComponent />
            <OrbitControls 
              ref={controlsRef}
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={20}
            />
          </Canvas>
        </div>
      </div>

      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">Instructions:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Click and drag to rotate the model</li>
          <li>Use the scroll wheel or pinch gesture to zoom</li>
          <li>Right-click and drag to pan</li>
          <li>Use the zoom buttons for precise control</li>
          <li>Click the reset button to return to the default view</li>
        </ul>
      </div>
    </div>
  );
}