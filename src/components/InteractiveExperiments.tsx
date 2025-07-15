import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import WaveInterference from './WaveInterference';
import OrbitalMechanics from './OrbitalMechanics';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PendulumSimulation = () => {
  const [amplitude, setAmplitude] = React.useState(1);
  const [length, setLength] = React.useState(1);
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const animationRef = React.useRef<number>();

  const period = 2 * Math.PI * Math.sqrt(length / 9.81);
  const dataPoints = 50;
  
  const generateData = () => {
    const timePoints = Array.from({ length: dataPoints }, (_, i) => i * (period / dataPoints));
    const displacement = timePoints.map(t => 
      amplitude * Math.cos((2 * Math.PI * t / period + currentTime) % (2 * Math.PI))
    );

    return {
      labels: timePoints.map(t => t.toFixed(2)),
      datasets: [
        {
          label: 'Pendulum Motion',
          data: displacement,
          borderColor: 'rgb(59, 130, 246)',
          tension: 0.4
        }
      ]
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Simple Pendulum Motion',
        color: 'white'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Displacement (m)',
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
          text: 'Time (s)',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    },
    animation: {
      duration: 0 // Disable animations for smoother updates
    }
  };

  React.useEffect(() => {
    let lastTime = 0;
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
      lastTime = timestamp;
      
      setCurrentTime(prevTime => (prevTime + deltaTime) % period);
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, period]);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-2xl font-bold mb-6">Simple Pendulum</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Amplitude (m): {amplitude.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Length (m): {length.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isRunning ? 'Stop' : 'Start'} Animation
          </button>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <Line data={generateData()} options={options} />
        </div>
      </div>
    </div>
  );
};

export default function InteractiveExperiments() {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">Interactive Physics Experiments</h2>
      <PendulumSimulation />
      <WaveInterference />
      <OrbitalMechanics />
    </div>
  );
}