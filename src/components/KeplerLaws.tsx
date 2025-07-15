import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import { Sun, Rocket, Settings, Info } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface OrbitPoint {
  position: [number, number, number];
  time: number;
}

function calculateEllipticalOrbit(
  semiMajorAxis: number,
  eccentricity: number,
  numPoints: number = 100
): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const r = (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(angle));
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
}

function Simulation({
  semiMajorAxis,
  eccentricity,
  speed,
  isRunning
}: {
  semiMajorAxis: number;
  eccentricity: number;
  speed: number;
  isRunning: boolean;
}) {
  const [time, setTime] = useState(0);
  const orbitPointsRef = useRef<OrbitPoint[]>([]);
  const MAX_TRAIL_POINTS = 50;

  useFrame((_, delta) => {
    if (isRunning) {
      setTime(prev => prev + delta);
    }
  });

  const angle = time * speed;
  const r = (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(angle));
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);

  useEffect(() => {
    orbitPointsRef.current = [];
  }, [semiMajorAxis, eccentricity]);

  // Update orbit trail
  if (orbitPointsRef.current.length >= MAX_TRAIL_POINTS) {
    orbitPointsRef.current.shift();
  }
  orbitPointsRef.current.push({
    position: [x, y, 0],
    time: time
  });

  return (
    <group>
      {/* Sun */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.5} />
      </Sphere>

      {/* Orbit path */}
      <Line
        points={calculateEllipticalOrbit(semiMajorAxis, eccentricity).map(([x, y]) => [x, y, 0])}
        color="#666666"
        lineWidth={1}
        opacity={0.5}
        transparent
      />

      {/* Planet */}
      <Sphere args={[0.3, 32, 32]} position={[x, y, 0]}>
        <meshStandardMaterial color="#4169E1" />
      </Sphere>

      {/* Orbit trail */}
      <Line
        points={orbitPointsRef.current.map(p => p.position)}
        color="#4169E1"
        lineWidth={1}
        opacity={0.5}
        transparent
      />

      {/* Radius vector line */}
      <Line
        points={[[0, 0, 0], [x, y, 0]]}
        color="#ffffff"
        lineWidth={1}
        opacity={0.3}
        transparent
      />
    </group>
  );
}

export default function KeplerLaws() {
  const [semiMajorAxis, setSemiMajorAxis] = useState(5);
  const [eccentricity, setEccentricity] = useState(0.5);
  const [speed, setSpeed] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedLaw, setSelectedLaw] = useState(1);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Kepler's Laws of Planetary Motion</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="text-blue-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Orbit Controls</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Semi-major Axis: {semiMajorAxis.toFixed(1)} AU
                </label>
                <input
                  type="range"
                  min="3"
                  max="8"
                  step="0.1"
                  value={semiMajorAxis}
                  onChange={(e) => setSemiMajorAxis(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Eccentricity: {eccentricity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.9"
                  step="0.01"
                  value={eccentricity}
                  onChange={(e) => setEccentricity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Orbital Speed: {speed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
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

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-blue-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Kepler's Laws</h4>
            </div>

            <div className="space-y-2">
              {[1, 2, 3].map(law => (
                <button
                  key={law}
                  onClick={() => setSelectedLaw(law)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedLaw === law
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  Law {law}: {
                    law === 1 ? "The Law of Orbits" :
                    law === 2 ? "The Law of Equal Areas" :
                    "The Law of Periods"
                  }
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
            <Canvas camera={{ position: [0, 0, 15] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[0, 0, 0]} intensity={1} />
              <Simulation
                semiMajorAxis={semiMajorAxis}
                eccentricity={eccentricity}
                speed={speed}
                isRunning={isRunning}
              />
              <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
            </Canvas>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            {selectedLaw === 1 && (
              <div>
                <h5 className="text-lg font-semibold mb-2">First Law: The Law of Orbits</h5>
                <p className="text-gray-300 mb-3">
                  Planets orbit the Sun in elliptical paths, with the Sun at one focus of the ellipse.
                  The mathematical equation of this elliptical orbit in polar coordinates is:
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <BlockMath>
                    {`r = \\frac{a(1-e^2)}{1 + e\\cos\\theta}`}
                  </BlockMath>
                </div>
                <p className="text-gray-400 mt-2">
                  Where:
                  <ul className="list-disc list-inside mt-1">
                    <li><InlineMath>r</InlineMath> = distance from Sun to planet</li>
                    <li><InlineMath>a</InlineMath> = semi-major axis</li>
                    <li><InlineMath>e</InlineMath> = eccentricity</li>
                    <li><InlineMath>\\theta</InlineMath> = angle from perihelion</li>
                  </ul>
                </p>
              </div>
            )}

            {selectedLaw === 2 && (
              <div>
                <h5 className="text-lg font-semibold mb-2">Second Law: The Law of Equal Areas</h5>
                <p className="text-gray-300 mb-3">
                  A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time.
                  This is mathematically expressed as:
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <BlockMath>
                    {`\\frac{dA}{dt} = \\frac{1}{2}r^2\\frac{d\\theta}{dt} = \\text{constant}`}
                  </BlockMath>
                </div>
                <p className="text-gray-400 mt-2">
                  This law is a consequence of the conservation of angular momentum.
                </p>
              </div>
            )}

            {selectedLaw === 3 && (
              <div>
                <h5 className="text-lg font-semibold mb-2">Third Law: The Law of Periods</h5>
                <p className="text-gray-300 mb-3">
                  The square of the orbital period of a planet is directly proportional to the cube of the semi-major axis of its orbit.
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <BlockMath>
                    {`\\frac{T^2}{a^3} = \\frac{4\\pi^2}{GM}`}
                  </BlockMath>
                </div>
                <p className="text-gray-400 mt-2">
                  Where:
                  <ul className="list-disc list-inside mt-1">
                    <li><InlineMath>T</InlineMath> = orbital period</li>
                    <li><InlineMath>a</InlineMath> = semi-major axis</li>
                    <li><InlineMath>G</InlineMath> = gravitational constant</li>
                    <li><InlineMath>M</InlineMath> = mass of the Sun</li>
                  </ul>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}