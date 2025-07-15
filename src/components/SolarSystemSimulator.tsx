import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { Sun, Settings, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface CelestialBody {
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitalPeriod: number;
  hasRings?: boolean;
}

function Planet({ body, time }: { body: CelestialBody; time: number }) {
  const angle = (time / body.orbitalPeriod) * Math.PI * 2;
  const x = Math.cos(angle) * body.distance;
  const z = Math.sin(angle) * body.distance;

  return (
    <group position={[x, 0, z]}>
      <Sphere args={[body.radius, 32, 32]}>
        <meshStandardMaterial color={body.color} />
      </Sphere>
      {body.hasRings && (
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <ringGeometry args={[body.radius * 1.5, body.radius * 2.2, 64]} />
            <meshStandardMaterial color={body.color} transparent opacity={0.5} />
          </mesh>
        </group>
      )}
      <Text
        position={[0, body.radius + 0.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {body.name}
      </Text>
    </group>
  );
}

function OrbitPath({ distance }: { distance: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.05, distance + 0.05, 64]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
    </mesh>
  );
}

function CameraController({ controlsRef }: { controlsRef: React.MutableRefObject<any> }) {
  const { camera } = useThree();
  
  const handleZoom = (zoomIn: boolean) => {
    const zoomSpeed = 1.2;
    const newPosition = camera.position.clone();
    if (zoomIn) {
      newPosition.multiplyScalar(1 / zoomSpeed);
    } else {
      newPosition.multiplyScalar(zoomSpeed);
    }
    camera.position.copy(newPosition);
    camera.updateProjectionMatrix();
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  };

  // Attach zoom methods to the ref
  React.useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.zoomIn = () => handleZoom(true);
      controlsRef.current.zoomOut = () => handleZoom(false);
    }
  }, [controlsRef]);

  return null;
}

function SolarSystem() {
  const [time, setTime] = useState(0);
  
  useFrame((_, delta) => {
    setTime(prev => prev + delta);
  });

  const planets: CelestialBody[] = [
    { name: "Mercury", radius: 0.4, distance: 5, color: "#A0522D", orbitalPeriod: 8 },
    { name: "Venus", radius: 0.6, distance: 7, color: "#DEB887", orbitalPeriod: 12 },
    { name: "Earth", radius: 0.6, distance: 9, color: "#4169E1", orbitalPeriod: 16 },
    { name: "Mars", radius: 0.5, distance: 11, color: "#CD5C5C", orbitalPeriod: 20 },
    { name: "Jupiter", radius: 1.2, distance: 14, color: "#DAA520", orbitalPeriod: 24 },
    { name: "Saturn", radius: 1.0, distance: 17, color: "#F4A460", orbitalPeriod: 28, hasRings: true },
    { name: "Uranus", radius: 0.8, distance: 20, color: "#87CEEB", orbitalPeriod: 32 },
    { name: "Neptune", radius: 0.8, distance: 23, color: "#1E90FF", orbitalPeriod: 36 }
  ];

  return (
    <group>
      {/* Sun */}
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.6} />
      </Sphere>

      {/* Orbit paths */}
      {planets.map((planet) => (
        <OrbitPath key={planet.name} distance={planet.distance} />
      ))}

      {/* Planets */}
      {planets.map((planet) => (
        <Planet key={planet.name} body={planet} time={time} />
      ))}
    </group>
  );
}

export default function SolarSystemSimulator() {
  const [speed, setSpeed] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const controlsRef = useRef<any>(null);
  const initialCameraPosition = [0, 20, 30];

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.object.position.set(...initialCameraPosition);
      controlsRef.current.update();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Solar System Simulator</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="text-blue-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Simulation Controls</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Orbital Speed: {speed.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                {isRunning ? 'Pause' : 'Resume'} Simulation
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => controlsRef.current?.zoomIn()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center gap-2"
            >
              <ZoomIn className="w-4 h-4" />
              Zoom In
            </button>
            <button
              onClick={() => controlsRef.current?.zoomOut()}
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

        <div className="lg:col-span-2 bg-gray-900 rounded-xl overflow-hidden" style={{ height: '500px' }}>
          <Canvas camera={{ position: initialCameraPosition, fov: 60 }}>
            <CameraController controlsRef={controlsRef} />
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={1.5} />
            <SolarSystem />
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={10}
              maxDistance={50}
            />
          </Canvas>
        </div>
      </div>

      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">About the Simulation</h4>
        <p className="text-gray-300">
          This is a simplified model of our solar system showing the relative positions and orbits of the planets.
          While not to exact scale, it demonstrates the basic orbital mechanics and relative positions of the planets.
          Use the controls to adjust the simulation speed and explore different views of the solar system.
        </p>
      </div>
    </div>
  );
}