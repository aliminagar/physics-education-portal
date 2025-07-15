import React, { useState, useEffect } from 'react';
import { Atom, Activity, Calculator, Info } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface Isotope {
  name: string;
  halfLife: number;
  initialAmount: number;
  timeUnit: string;
  minTime: number;
  maxTime: number;
  timeScale: number; // Added timeScale for conversion
}

function DecayGraph({ isotope, time }: { isotope: Isotope; time: number }) {
  const points = Array.from({ length: 100 }).map((_, i) => {
    const t = (i / 99) * time;
    // Scale time by the timeScale factor for calculation
    const scaledTime = t * isotope.timeScale;
    const amount = isotope.initialAmount * Math.pow(0.5, scaledTime / isotope.halfLife);
    return { x: t, y: amount };
  });

  const maxY = Math.max(...points.map(p => p.y));
  const height = 200;
  const width = 400;

  return (
    <svg width={width} height={height} className="bg-gray-900 rounded-lg">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map(y => (
        <line
          key={`grid-y-${y}`}
          x1={0}
          y1={height * (1 - y)}
          x2={width}
          y2={height * (1 - y)}
          stroke="#444"
          strokeWidth="1"
          strokeDasharray="4"
        />
      ))}

      {/* Decay curve */}
      <path
        d={`M ${points.map(p => `${(p.x / time) * width},${height * (1 - p.y / isotope.initialAmount)}`).join(' L ')}`}
        stroke="#4169E1"
        strokeWidth="2"
        fill="none"
      />

      {/* Axes */}
      <line x1={0} y1={height} x2={width} y2={height} stroke="#666" strokeWidth="2" />
      <line x1={0} y1={height} x2={0} y2={0} stroke="#666" strokeWidth="2" />

      {/* Labels */}
      <text x={width / 2} y={height - 10} textAnchor="middle" fill="#fff" fontSize="12">
        Time ({isotope.timeUnit})
      </text>
      <text x={10} y={20} fill="#fff" fontSize="12">
        Amount
      </text>
    </svg>
  );
}

function ParticleAnimation() {
  const [particles, setParticles] = useState<{ x: number; y: number; vx: number; vy: number; type: 'alpha' | 'beta' | 'gamma' }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        x: 200,
        y: 200,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        type: ['alpha', 'beta', 'gamma'][Math.floor(Math.random() * 3)] as 'alpha' | 'beta' | 'gamma'
      };

      setParticles(prev => [...prev.slice(-20), newParticle]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="400" height="400" className="bg-gray-900 rounded-lg">
      {particles.map((particle, i) => (
        <circle
          key={i}
          cx={particle.x + particle.vx * i}
          cy={particle.y + particle.vy * i}
          r={particle.type === 'alpha' ? 6 : particle.type === 'beta' ? 4 : 2}
          fill={particle.type === 'alpha' ? '#FF6B6B' : particle.type === 'beta' ? '#4ECDC4' : '#FFD93D'}
          opacity={1 - i / 20}
        />
      ))}
      <circle cx={200} cy={200} r={20} fill="#666" />
    </svg>
  );
}

export default function NuclearPhysics() {
  const isotopes: Isotope[] = [
    {
      name: "Carbon-14",
      halfLife: 5730,
      initialAmount: 100,
      timeUnit: "years",
      minTime: 1000,
      maxTime: 20000,
      timeScale: 1
    },
    {
      name: "Uranium-238",
      halfLife: 4.47,
      initialAmount: 100,
      timeUnit: "billion years",
      minTime: 1,
      maxTime: 10,
      timeScale: 1e9 // Convert to billions of years
    },
    {
      name: "Iodine-131",
      halfLife: 8.02,
      initialAmount: 100,
      timeUnit: "days",
      minTime: 1,
      maxTime: 40,
      timeScale: 1
    }
  ];

  const [selectedIsotope, setSelectedIsotope] = useState<Isotope>(isotopes[0]);
  const [time, setTime] = useState(isotopes[0].minTime);

  // Update time when isotope changes
  useEffect(() => {
    setTime(selectedIsotope.minTime);
  }, [selectedIsotope]);

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <Atom className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Nuclear Physics</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold mb-4">Radioactive Decay</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Select Isotope</label>
                <select
                  className="w-full bg-gray-800 rounded-lg p-3 text-white"
                  onChange={(e) => setSelectedIsotope(isotopes[Number(e.target.value)])}
                >
                  {isotopes.map((isotope, index) => (
                    <option key={index} value={index}>{isotope.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Time Range: {time} {selectedIsotope.timeUnit}
                </label>
                <input
                  type="range"
                  min={selectedIsotope.minTime}
                  max={selectedIsotope.maxTime}
                  step={(selectedIsotope.maxTime - selectedIsotope.minTime) / 100}
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <DecayGraph isotope={selectedIsotope} time={time} />
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="text-blue-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Half-Life Calculator</h4>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <BlockMath>{`N(t) = N_0\\left(\\frac{1}{2}\\right)^{t/t_{1/2}}`}</BlockMath>
              <p className="text-gray-400 mt-2">
                Where:
                <ul className="list-disc list-inside mt-1">
                  <li><InlineMath>N(t)</InlineMath> = amount remaining</li>
                  <li><InlineMath>N_0</InlineMath> = initial amount</li>
                  <li><InlineMath>t</InlineMath> = time</li>
                  <li><InlineMath>t_{1/2}</InlineMath> = half-life</li>
                </ul>
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Half-Life Values:</h5>
              <ul className="space-y-2 text-gray-300">
                <li>Carbon-14: 5,730 years</li>
                <li>Uranium-238: 4.47 billion years</li>
                <li>Iodine-131: 8.02 days</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-blue-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Particle Interactions</h4>
            </div>
            <ParticleAnimation />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2" />
                <p className="text-sm">Alpha Particle</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="w-4 h-4 bg-teal-500 rounded-full mx-auto mb-2" />
                <p className="text-sm">Beta Particle</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2" />
                <p className="text-sm">Gamma Ray</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-blue-400 w-5 h-5" />
              <h4 className="text-lg font-semibold">Nuclear Processes</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">Nuclear Fission</h5>
                <p className="text-gray-300">
                  Heavy atomic nuclei split into lighter nuclei, releasing energy.
                  Example: Uranium-235 fission in nuclear reactors.
                </p>
                <BlockMath>{`{}^{235}_{92}\\text{U} + n \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3n + \\text{energy}`}</BlockMath>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">Nuclear Fusion</h5>
                <p className="text-gray-300">
                  Light atomic nuclei combine to form heavier nuclei, releasing energy.
                  Example: Hydrogen fusion in stars.
                </p>
                <BlockMath>{`{}^2_1\\text{H} + {}^3_1\\text{H} \\rightarrow {}^4_2\\text{He} + n + \\text{energy}`}</BlockMath>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}