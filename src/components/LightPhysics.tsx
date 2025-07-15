import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import { Sun, Waves, Zap, Rainbow, Lightbulb, ArrowRight } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function WaveParticleVisualization({ showWave }: { showWave: boolean }) {
  // Generate wave points
  const wavePoints = Array.from({ length: 100 }).map((_, i) => {
    const x = (i - 50) * 0.1;
    const y = Math.sin(x * 2) * 0.5;
    return [x, y, 0];
  });

  // Generate photon points
  const photonPoints = Array.from({ length: 10 }).map((_, i) => ({
    position: [(i - 5) * 1, Math.sin(Date.now() * 0.001 + i) * 0.5, 0],
    size: 0.1
  }));

  return (
    <group>
      {showWave ? (
        <Line
          points={wavePoints as [number, number, number][]}
          color="#4169E1"
          lineWidth={2}
        />
      ) : (
        photonPoints.map((point, i) => (
          <mesh key={i} position={point.position}>
            <sphereGeometry args={[point.size, 16, 16]} />
            <meshStandardMaterial
              color="#FFA500"
              emissive="#FFA500"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))
      )}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {showWave ? 'Wave Nature' : 'Particle Nature'}
      </Text>
    </group>
  );
}

function SpectrumVisualization() {
  const colors = [
    '#FF0000', // Red
    '#FF7F00', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#4B0082', // Indigo
    '#9400D3'  // Violet
  ];

  return (
    <group>
      {colors.map((color, i) => (
        <mesh
          key={i}
          position={[(i - 3) * 0.5, 0, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <planeGeometry args={[0.4, 2]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function LightPhysics() {
  const [activeTab, setActiveTab] = useState<'wave-particle' | 'speed' | 'spectrum'>('wave-particle');
  const [showWave, setShowWave] = useState(true);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="text-yellow-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Physics of Light</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('wave-particle')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'wave-particle' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Waves className="w-4 h-4" />
              Wave-Particle Duality
            </button>
            <button
              onClick={() => setActiveTab('speed')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'speed' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Zap className="w-4 h-4" />
              Speed of Light
            </button>
            <button
              onClick={() => setActiveTab('spectrum')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'spectrum' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Rainbow className="w-4 h-4" />
              Spectrum Analysis
            </button>
          </div>

          {activeTab === 'wave-particle' && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Wave-Particle Duality</h4>
              <p className="text-gray-300 mb-4">
                Light exhibits both wave and particle properties, a phenomenon known as wave-particle duality.
                This was demonstrated by the famous double-slit experiment.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <BlockMath>{`E = hf = \\frac{hc}{\\lambda}`}</BlockMath>
                <p className="text-gray-400 mt-2">
                  Where:
                  <ul className="list-disc list-inside mt-1">
                    <li><InlineMath>E</InlineMath> = photon energy</li>
                    <li><InlineMath>h</InlineMath> = Planck's constant</li>
                    <li><InlineMath>f</InlineMath> = frequency</li>
                    <li><InlineMath>\\lambda</InlineMath> = wavelength</li>
                  </ul>
                </p>
              </div>
              <button
                onClick={() => setShowWave(!showWave)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Toggle Wave/Particle View
              </button>
            </div>
          )}

          {activeTab === 'speed' && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Speed of Light</h4>
              <p className="text-gray-300 mb-4">
                The speed of light in a vacuum is a universal physical constant that plays a crucial role in modern physics.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <BlockMath>{`c = 299,792,458 \\text{ m/s}`}</BlockMath>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Lightbulb className="text-yellow-400 w-4 h-4" />
                  Constant in all reference frames
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Lightbulb className="text-yellow-400 w-4 h-4" />
                  Maximum speed in the universe
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Lightbulb className="text-yellow-400 w-4 h-4" />
                  Key to Einstein's relativity
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spectrum' && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Electromagnetic Spectrum</h4>
              <p className="text-gray-300 mb-4">
                Light is part of the electromagnetic spectrum, ranging from radio waves to gamma rays.
                Visible light occupies only a small portion of this spectrum.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <BlockMath>{`f = \\frac{c}{\\lambda}`}</BlockMath>
                <p className="text-gray-400 mt-2">
                  Wavelength ranges for visible light:
                  <ul className="list-disc list-inside mt-1">
                    <li>Violet: 380-450 nm</li>
                    <li>Blue: 450-495 nm</li>
                    <li>Green: 495-570 nm</li>
                    <li>Yellow: 570-590 nm</li>
                    <li>Orange: 590-620 nm</li>
                    <li>Red: 620-750 nm</li>
                  </ul>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {activeTab === 'wave-particle' && <WaveParticleVisualization showWave={showWave} />}
            {activeTab === 'spectrum' && <SpectrumVisualization />}
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}