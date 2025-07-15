import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import { Lightbulb, Zap, Scale, Calculator } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function EnergyVisualization({ mass, speed }: { mass: number; speed: number }) {
  const energyScale = mass * Math.pow(speed, 2) / 100;
  const sphereSize = 0.5 + (mass * 0.2);
  const glowIntensity = 0.2 + (energyScale * 0.1);
  
  return (
    <group>
      {/* Central mass */}
      <Sphere args={[sphereSize, 32, 32]}>
        <meshStandardMaterial 
          color="#4169E1"
          emissive="#4169E1"
          emissiveIntensity={glowIntensity}
        />
      </Sphere>

      {/* Energy waves */}
      {[...Array(5)].map((_, i) => (
        <group key={i} rotation={[0, (Math.PI * 2 * i) / 5, 0]}>
          <Sphere 
            args={[0.1, 16, 16]} 
            position={[
              Math.cos(Date.now() * 0.001 + i) * (1.5 + energyScale),
              Math.sin(Date.now() * 0.001 + i) * (1.5 + energyScale),
              0
            ]}
          >
            <meshStandardMaterial
              color="#FFA500"
              emissive="#FFA500"
              emissiveIntensity={0.5}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

export default function EinsteinEquation() {
  const [mass, setMass] = useState(1);
  const [result, setResult] = useState(0);
  const c = 299792458; // Speed of light in m/s

  useEffect(() => {
    // Calculate E = mc²
    const energy = mass * Math.pow(c, 2);
    setResult(energy);
  }, [mass]);

  const formatEnergy = (joules: number) => {
    if (joules >= 1e18) {
      return `${(joules / 1e18).toFixed(2)} EJ`;
    } else if (joules >= 1e15) {
      return `${(joules / 1e15).toFixed(2)} PJ`;
    } else if (joules >= 1e12) {
      return `${(joules / 1e12).toFixed(2)} TJ`;
    }
    return `${joules.toExponential(2)} J`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="text-yellow-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Einstein's Mass-Energy Equivalence</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-xl font-bold mb-4">The Famous Equation</h4>
            <div className="bg-gray-800 rounded-lg p-6 mb-4">
              <BlockMath>{`E = mc^2`}</BlockMath>
            </div>
            <p className="text-gray-300">
              This elegant equation shows that mass and energy are equivalent and interchangeable.
              A small amount of mass can be converted into an enormous amount of energy.
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="text-blue-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Energy Calculator</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Mass (kg): {mass} kg
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Speed of light (c):</span>
                  <span className="text-blue-400">299,792,458 m/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Energy (E):</span>
                  <span className="text-green-400">{formatEnergy(result)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-yellow-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Key Insights</h4>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Mass and energy are different forms of the same thing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                The speed of light squared (c²) is the conversion factor
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Even a tiny mass contains enormous energy
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                This principle powers nuclear reactions
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <EnergyVisualization mass={mass} speed={c} />
              <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
            </Canvas>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Practical Applications</h4>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">Nuclear Power</h5>
                <p className="text-gray-300">
                  Nuclear reactors convert a tiny amount of mass into enormous energy through fission reactions.
                  Just 1 kg of uranium can produce energy equivalent to 2-3 million kg of coal.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">Solar Energy</h5>
                <p className="text-gray-300">
                  The Sun converts about 4.3 million tons of mass into energy every second,
                  powering life on Earth through this equation.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">Particle Physics</h5>
                <p className="text-gray-300">
                  In particle accelerators, this equation helps predict and explain
                  the creation of new particles from pure energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}