import React from 'react';
import { Line } from 'react-chartjs-2';

export default function WaveInterference() {
  const [amplitude1, setAmplitude1] = React.useState(1);
  const [amplitude2, setAmplitude2] = React.useState(1);
  const [frequency1, setFrequency1] = React.useState(1);
  const [frequency2, setFrequency2] = React.useState(1);
  const [phase1, setPhase1] = React.useState(0);
  const [phase2, setPhase2] = React.useState(0);

  const generateWaveData = () => {
    const points = 100;
    const xValues = Array.from({ length: points }, (_, i) => (i / points) * 2 * Math.PI);
    
    const wave1 = xValues.map(x => amplitude1 * Math.sin(frequency1 * x + phase1));
    const wave2 = xValues.map(x => amplitude2 * Math.sin(frequency2 * x + phase2));
    const resultant = wave1.map((v, i) => v + wave2[i]);

    return {
      labels: xValues.map(x => x.toFixed(2)),
      datasets: [
        {
          label: 'Wave 1',
          data: wave1,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Wave 2',
          data: wave2,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Resultant Wave',
          data: resultant,
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 3,
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
        text: 'Wave Interference Demonstration',
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
        min: -4,
        max: 4,
        title: {
          display: true,
          text: 'Amplitude',
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
          text: 'Position (radians)',
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
      <h3 className="text-2xl font-bold mb-6">Wave Interference</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">Wave 1 Parameters</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Amplitude: {amplitude1.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={amplitude1}
                  onChange={(e) => setAmplitude1(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Frequency: {frequency1.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={frequency1}
                  onChange={(e) => setFrequency1(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Phase: {phase1.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max={2 * Math.PI}
                  step="0.1"
                  value={phase1}
                  onChange={(e) => setPhase1(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Wave 2 Parameters</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Amplitude: {amplitude2.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={amplitude2}
                  onChange={(e) => setAmplitude2(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Frequency: {frequency2.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={frequency2}
                  onChange={(e) => setFrequency2(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Phase: {phase2.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max={2 * Math.PI}
                  step="0.1"
                  value={phase2}
                  onChange={(e) => setPhase2(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <Line data={generateWaveData()} options={options} />
        </div>
      </div>
    </div>
  );
}