import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function OrbitalMechanics() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const renderRef = useRef<Matter.Render>();
  const satelliteRef = useRef<Matter.Body>();
  const [orbitRadius, setOrbitRadius] = React.useState(100);
  const [satelliteSpeed, setSatelliteSpeed] = React.useState(5);
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentAngle, setCurrentAngle] = React.useState(0);
  const animationFrameRef = useRef<number>();

  const calculateEllipticalPosition = (angle: number) => {
    const a = orbitRadius * 0.8; // semi-major axis
    const b = orbitRadius * 0.6; // semi-minor axis
    return {
      x: 300 + a * Math.cos(angle),
      y: 200 + b * Math.sin(angle)
    };
  };

  useEffect(() => {
    if (!sceneRef.current) return;

    // Setup Matter.js
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 }
    });
    engineRef.current = engine;
    
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: '#1f2937',
      }
    });
    renderRef.current = render;

    // Create sun (central body)
    const sun = Matter.Bodies.circle(300, 200, 30, {
      isStatic: true,
      render: {
        fillStyle: '#fbbf24',
        strokeStyle: '#f59e0b',
        lineWidth: 3
      }
    });

    // Create satellite at initial position
    const initialPos = calculateEllipticalPosition(0);
    const satellite = Matter.Bodies.circle(initialPos.x, initialPos.y, 6, {
      render: {
        fillStyle: '#ef4444',
        strokeStyle: '#dc2626',
        lineWidth: 1
      },
      isStatic: true
    });
    satelliteRef.current = satellite;

    Matter.World.add(engine.world, [sun, satellite]);

    // Start the engine and renderer
    Matter.Runner.run(engine);
    Matter.Render.run(render);

    // Draw function for orbital path and animations
    const draw = () => {
      if (!render.context || !satellite) return;

      const ctx = render.context;
      
      // Clear the canvas
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(0, 0, 600, 400);
      
      // Draw sun glow
      const gradient = ctx.createRadialGradient(300, 200, 30, 300, 200, 60);
      gradient.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
      gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(300, 200, 60, 0, Math.PI * 2);
      ctx.fill();

      // Draw sun
      ctx.beginPath();
      ctx.arc(300, 200, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.fill();
      ctx.stroke();

      // Draw elliptical orbit path
      const a = orbitRadius * 0.8; // semi-major axis
      const b = orbitRadius * 0.6; // semi-minor axis
      ctx.beginPath();
      ctx.ellipse(300, 200, a, b, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Calculate current position
      const pos = calculateEllipticalPosition(currentAngle);

      // Update satellite position
      if (satellite) {
        Matter.Body.setPosition(satellite, pos);
      }

      // Draw satellite
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();

      // Update angle if simulation is running
      if (isRunning) {
        setCurrentAngle(prev => (prev + 0.02 * satelliteSpeed) % (Math.PI * 2));
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      Matter.Render.stop(render);
      Matter.Runner.stop(engine);
      Matter.Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, [currentAngle, isRunning, orbitRadius, satelliteSpeed]);

  const startSimulation = () => {
    setIsRunning(true);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  const resetSimulation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsRunning(false);
    setCurrentAngle(0);
    
    if (satelliteRef.current) {
      const initialPos = calculateEllipticalPosition(0);
      Matter.Body.setPosition(satelliteRef.current, initialPos);
      Matter.Body.setVelocity(satelliteRef.current, { x: 0, y: 0 });
    }

    // Restart animation loop
    if (renderRef.current?.context) {
      const draw = () => {
        if (!renderRef.current?.context || !satelliteRef.current) return;

        const ctx = renderRef.current.context;
        
        // Clear the canvas
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(0, 0, 600, 400);
        
        // Draw sun glow
        const gradient = ctx.createRadialGradient(300, 200, 30, 300, 200, 60);
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(300, 200, 60, 0, Math.PI * 2);
        ctx.fill();

        // Draw sun
        ctx.beginPath();
        ctx.arc(300, 200, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Draw elliptical orbit path
        const a = orbitRadius * 0.8;
        const b = orbitRadius * 0.6;
        ctx.beginPath();
        ctx.ellipse(300, 200, a, b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw satellite at initial position
        const initialPos = calculateEllipticalPosition(0);
        ctx.beginPath();
        ctx.arc(initialPos.x, initialPos.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        animationFrameRef.current = requestAnimationFrame(draw);
      };

      animationFrameRef.current = requestAnimationFrame(draw);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-2xl font-bold mb-6">Solar System Orbital Simulation</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Orbit Size: {orbitRadius} units</label>
            <input
              type="range"
              min="60"
              max="150"
              value={orbitRadius}
              onChange={(e) => {
                setOrbitRadius(Number(e.target.value));
                resetSimulation();
              }}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Orbital Speed: {satelliteSpeed} units/s</label>
            <input
              type="range"
              min="1"
              max="10"
              value={satelliteSpeed}
              onChange={(e) => setSatelliteSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={isRunning ? stopSimulation : startSimulation}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex-1"
            >
              {isRunning ? 'Stop' : 'Start'} Simulation
            </button>
            <button
              onClick={resetSimulation}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Simulation Canvas */}
        <div ref={sceneRef} className="bg-gray-900 rounded-xl overflow-hidden" />
      </div>

      {/* Mathematical Explanation */}
      <div className="mt-8 space-y-6">
        <div className="bg-gray-700 rounded-xl p-6">
          <h4 className="text-xl font-bold mb-4">Kepler's Laws of Planetary Motion</h4>
          
          <div className="space-y-6">
            {/* First Law */}
            <div>
              <h5 className="text-lg font-semibold mb-2 text-blue-400">First Law: The Law of Orbits</h5>
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
                  <li><InlineMath>r</InlineMath> = distance from the Sun to the planet</li>
                  <li><InlineMath>a</InlineMath> = semi-major axis</li>
                  <li><InlineMath>e</InlineMath> = eccentricity of the orbit</li>
                  <li><InlineMath>\\theta</InlineMath> = angle from perihelion</li>
                </ul>
              </p>
            </div>

            {/* Second Law */}
            <div>
              <h5 className="text-lg font-semibold mb-2 text-blue-400">Second Law: The Law of Equal Areas</h5>
              <p className="text-gray-300 mb-3">
                A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time.
                This is mathematically expressed as the conservation of angular momentum:
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <BlockMath>
                  {`\\frac{dA}{dt} = \\frac{1}{2}r^2\\frac{d\\theta}{dt} = \\text{constant}`}
                </BlockMath>
              </div>
              <p className="text-gray-400 mt-2">
                Where:
                <ul className="list-disc list-inside mt-1">
                  <li><InlineMath>A</InlineMath> = area swept</li>
                  <li><InlineMath>t</InlineMath> = time</li>
                  <li><InlineMath>r</InlineMath> = orbital radius</li>
                  <li><InlineMath>\\theta</InlineMath> = angular position</li>
                </ul>
              </p>
            </div>

            {/* Third Law */}
            <div>
              <h5 className="text-lg font-semibold mb-2 text-blue-400">Third Law: The Law of Periods</h5>
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
                  <li><InlineMath>M</InlineMath> = mass of the central body</li>
                </ul>
              </p>
            </div>

            {/* Orbital Velocity */}
            <div>
              <h5 className="text-lg font-semibold mb-2 text-blue-400">Orbital Velocity</h5>
              <p className="text-gray-300 mb-3">
                The velocity of an orbiting body at any point in its orbit is given by the vis-viva equation:
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <BlockMath>
                  {`v = \\sqrt{GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)}`}
                </BlockMath>
              </div>
              <p className="text-gray-400 mt-2">
                This equation shows that the orbital velocity varies with distance from the central body,
                being greatest at perihelion (closest approach) and least at aphelion (farthest point).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}