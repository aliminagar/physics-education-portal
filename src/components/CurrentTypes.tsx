import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import { Zap, Waves, History, ArrowRight, Info, Lightbulb } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function DCVisualization() {
  const points = Array.from({ length: 100 }).map((_, i) => {
    const x = (i - 50) * 0.1;
    return [x, 1, 0]; // Constant voltage
  });

  return (
    <group>
      <Line
        points={points as [number, number, number][]}
        color="#4169E1"
        lineWidth={2}
      />
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Direct Current (DC)
      </Text>
    </group>
  );
}

function ACVisualization() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const points = Array.from({ length: 100 }).map((_, i) => {
    const x = (i - 50) * 0.1;
    const y = Math.sin(x * 2 + phase);
    return [x, y, 0];
  });

  return (
    <group>
      <Line
        points={points as [number, number, number][]}
        color="#FF6B6B"
        lineWidth={2}
      />
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Alternating Current (AC)
      </Text>
    </group>
  );
}

export default function CurrentTypes() {
  const [activeTab, setActiveTab] = useState<'dc' | 'ac' | 'comparison'>('dc');
  const [frequency, setFrequency] = useState(60); // Standard AC frequency

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="text-yellow-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">DC vs AC Current</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dc')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'dc' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              Direct Current
            </button>
            <button
              onClick={() => setActiveTab('ac')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'ac' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Waves className="w-4 h-4" />
              Alternating Current
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'comparison' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <History className="w-4 h-4" />
              Historical Battle
            </button>
          </div>

          {activeTab === 'dc' && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Direct Current (DC)</h4>
              <p className="text-gray-300 mb-4">
                Direct current flows in one direction and maintains constant polarity.
                It's commonly used in batteries, solar cells, and electronic devices.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <BlockMath>{`I_{DC} = \\frac{V}{R}`}</BlockMath>
                <p className="text-gray-400 mt-2">
                  Where:
                  <ul className="list-disc list-inside mt-1">
                    <li><InlineMath>I_{DC}</InlineMath> = current</li>
                    <li><InlineMath>V</InlineMath> = voltage</li>
                    <li><InlineMath>R</InlineMath> = resistance</li>
                  </ul>
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Lightbulb className="text-yellow-400 w-4 h-4" />
                  Constant voltage and current
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Lightbulb className="text-yellow-400 w-4 h-4" />
                  No frequency (steady flow)
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Lightbulb className="text-yellow-400 w-4 h-4" />
                  Used in low-voltage applications
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ac' && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Alternating Current (AC)</h4>
              <p className="text-gray-300 mb-4">
                Alternating current periodically reverses direction and is the standard
                for power distribution due to its efficiency over long distances.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <BlockMath>{`v(t) = V_{peak} \\sin(2\\pi ft)`}</BlockMath>
                <p className="text-gray-400 mt-2">
                  Where:
                  <ul className="list-disc list-inside mt-1">
                    <li><InlineMath>V_{peak}</InlineMath> = peak voltage</li>
                    <li><InlineMath>f</InlineMath> = frequency</li>
                    <li><InlineMath>t</InlineMath> = time</li>
                  </ul>
                </p>
              </div>
              <div>
                <label className="block text-sm mb-2">
                  AC Frequency: {frequency} Hz
                </label>
                <input
                  type="range"
                  min="50"
                  max="60"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">The Current War</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/800px-Thomas_Edison2.jpg"
                    alt="Thomas Edison"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h5 className="font-semibold text-center">Thomas Edison</h5>
                  <p className="text-sm text-gray-300 text-center">DC Advocate</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/800px-Tesla_circa_1890.jpeg"
                    alt="Nikola Tesla"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h5 className="font-semibold text-center">Nikola Tesla</h5>
                  <p className="text-sm text-gray-300 text-center">AC Pioneer</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {activeTab === 'dc' && <DCVisualization />}
              {activeTab === 'ac' && <ACVisualization />}
              {activeTab === 'comparison' && (
                <group>
                  <group position={[0, 1, 0]}>
                    <DCVisualization />
                  </group>
                  <group position={[0, -1, 0]}>
                    <ACVisualization />
                  </group>
                </group>
              )}
              <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
            </Canvas>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Comparison</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">DC Advantages</h5>
                <ul className="space-y-2 text-gray-300">
                  <li>• Simple and stable power delivery</li>
                  <li>• No power factor issues</li>
                  <li>• Better for electronic devices</li>
                  <li>• Essential for battery storage</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-red-400 mb-2">AC Advantages</h5>
                <ul className="space-y-2 text-gray-300">
                  <li>• Efficient long-distance transmission</li>
                  <li>• Easy voltage transformation</li>
                  <li>• Lower transmission losses</li>
                  <li>• More economical distribution</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Modern Applications</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="text-blue-400 w-4 h-4" />
                <span className="text-gray-300">DC: Solar panels, batteries, electronics</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="text-blue-400 w-4 h-4" />
                <span className="text-gray-300">AC: Power grid, household appliances</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="text-blue-400 w-4 h-4" />
                <span className="text-gray-300">Hybrid: Electric vehicles, renewable energy systems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}