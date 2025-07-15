import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Atom, Box, Maximize2 } from 'lucide-react';

interface WaveFunction {
  n: number;
  calculate: (x: number) => number;
  probability: (x: number) => number;
  energy: number;
}

export default function QuantumMechanics() {
  const [quantumNumber, setQuantumNumber] = useState(1);
  const [boxWidth, setBoxWidth] = useState(1);
  const [showProbability, setShowProbability] = useState(false);

  const calculateWaveFunction = (n: number, L: number, x: number): number => {
    return Math.sqrt(2/L) * Math.sin(n * Math.PI * x / L);
  };

  const calculateProbability = (psi: number): number => {
    return psi * psi;
  };

  const calculateEnergy = (n: number, L: number): number => {
    const h = 6.62607015e-34; // Planck's constant
    const m = 9.1093837015e-31; // electron mass
    return (n * n * h * h) / (8 * m * L * L);
  };

  const generateData = () => {
    const points = 200;
    const xValues = Array.from({ length: points }, (_, i) => (i / points) * boxWidth);
    
    const waveFunction = xValues.map(x => 
      calculateWaveFunction(quantumNumber, boxWidth, x)
    );
    
    const probability = waveFunction.map(psi => calculateProbability(psi));

    return {
      labels: xValues,
      datasets: [
        {
          label: 'Wave Function',
          data: showProbability ? probability : waveFunction,
          borderColor: showProbability ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        }
      ]
    };
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: showProbability ? 'Probability Density' : 'Wave Function',
        color: 'white'
      },
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      y: {
        min: -2,
        max: 2,
        title: {
          display: true,
          text: showProbability ? '|ψ|²' : 'ψ(x)',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Position (x/L)',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Atom className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Quantum Mechanics Visualization</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">Particle in a Box</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Quantum Number (n): {quantumNumber}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={quantumNumber}
                  onChange={(e) => setQuantumNumber(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Box Width (L): {boxWidth.toFixed(1)} nm
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={boxWidth}
                  onChange={(e) => setBoxWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showProbability"
                  checked={showProbability}
                  onChange={(e) => setShowProbability(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="showProbability" className="text-sm">
                  Show Probability Density
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">Wave Function:</h4>
            <BlockMath>
              {`\\psi_${quantumNumber}(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{${quantumNumber}\\pi x}{L}\\right)`}
            </BlockMath>
            <h4 className="text-lg font-semibold mt-4 mb-2">Energy Level:</h4>
            <BlockMath>
              {`E_${quantumNumber} = \\frac{${quantumNumber}^2h^2}{8mL^2}`}
            </BlockMath>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <Line data={generateData()} options={options} />
        </div>
      </div>

      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">Key Concepts:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Wave functions represent the quantum state of a particle</li>
          <li>The probability of finding the particle at a position is |ψ|²</li>
          <li>Energy levels are quantized (discrete)</li>
          <li>Higher quantum numbers mean higher energy states</li>
        </ul>
      </div>
    </div>
  );
}