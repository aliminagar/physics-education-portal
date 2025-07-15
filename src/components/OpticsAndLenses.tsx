import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import { Glasses, ArrowRight, Focus, Maximize2, Minimize2, MoveHorizontal } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface Ray {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

interface LensProps {
  type: 'convex' | 'concave';
  focalLength: number;
  objectDistance: number;
  objectHeight: number;
}

function LensVisualization({ type, focalLength, objectDistance, objectHeight }: LensProps) {
  // Calculate image properties using lens formula
  const imageDistance = (focalLength * objectDistance) / (objectDistance - focalLength);
  const magnification = -imageDistance / objectDistance;
  const imageHeight = objectHeight * magnification;

  // Generate lens shape points
  const lensPoints: [number, number, number][] = [];
  const segments = 50;
  const lensThickness = type === 'convex' ? 0.3 : 0.1;
  const curvature = type === 'convex' ? 0.5 : -0.5;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI - Math.PI / 2;
    const x = Math.sin(t) * curvature;
    const y = (i / segments) * 2 - 1;
    lensPoints.push([x * lensThickness, y, 0]);
  }

  // Generate principal rays
  const rays: Ray[] = [
    // Ray parallel to optical axis
    {
      start: [-2, objectHeight, 0],
      end: [0, objectHeight, 0],
      color: '#FF6B6B'
    },
    // Ray through optical center
    {
      start: [-2, objectHeight, 0],
      end: [2, -imageHeight, 0],
      color: '#4ECDC4'
    },
    // Ray through focal point
    {
      start: [-2, objectHeight, 0],
      end: [0, focalLength, 0],
      color: '#FFD93D'
    }
  ];

  return (
    <group>
      {/* Optical axis */}
      <Line
        points={[[-3, 0, 0], [3, 0, 0]]}
        color="#666666"
        lineWidth={1}
        dashed
      />

      {/* Lens */}
      <Line
        points={lensPoints}
        color="#4169E1"
        lineWidth={2}
        transparent
        opacity={0.7}
      />

      {/* Focal points */}
      <group>
        <mesh position={[focalLength, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#FF6B6B" />
        </mesh>
        <mesh position={[-focalLength, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#FF6B6B" />
        </mesh>
        <Text
          position={[focalLength, -0.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          F
        </Text>
        <Text
          position={[-focalLength, -0.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          F
        </Text>
      </group>

      {/* Object */}
      <Line
        points={[[-objectDistance, 0, 0], [-objectDistance, objectHeight, 0]]}
        color="#4ECDC4"
        lineWidth={2}
      />
      <mesh position={[-objectDistance, objectHeight, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#4ECDC4" />
      </mesh>

      {/* Image */}
      <Line
        points={[[imageDistance, 0, 0], [imageDistance, imageHeight, 0]]}
        color="#FFD93D"
        lineWidth={2}
        dashed={type === 'concave'}
      />
      <mesh position={[imageDistance, imageHeight, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#FFD93D" />
      </mesh>

      {/* Principal rays */}
      {rays.map((ray, index) => (
        <Line
          key={index}
          points={[ray.start, ray.end]}
          color={ray.color}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function MirrorVisualization({ type, focalLength, objectDistance, objectHeight }: LensProps) {
  // Calculate image properties using mirror formula
  const imageDistance = (focalLength * objectDistance) / (objectDistance - focalLength);
  const magnification = -imageDistance / objectDistance;
  const imageHeight = objectHeight * magnification;

  // Generate mirror shape points
  const mirrorPoints: [number, number, number][] = [];
  const segments = 50;
  const curvature = type === 'convex' ? -0.5 : 0.5;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI - Math.PI / 2;
    const x = Math.sin(t) * curvature;
    const y = (i / segments) * 2 - 1;
    mirrorPoints.push([x, y, 0]);
  }

  return (
    <group>
      {/* Optical axis */}
      <Line
        points={[[-3, 0, 0], [3, 0, 0]]}
        color="#666666"
        lineWidth={1}
        dashed
      />

      {/* Mirror */}
      <Line
        points={mirrorPoints}
        color="#A0A0A0"
        lineWidth={2}
      />

      {/* Focal point */}
      <mesh position={[focalLength, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#FF6B6B" />
      </mesh>
      <Text
        position={[focalLength, -0.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        F
      </Text>

      {/* Object */}
      <Line
        points={[[-objectDistance, 0, 0], [-objectDistance, objectHeight, 0]]}
        color="#4ECDC4"
        lineWidth={2}
      />
      <mesh position={[-objectDistance, objectHeight, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#4ECDC4" />
      </mesh>

      {/* Image */}
      <Line
        points={[[imageDistance, 0, 0], [imageDistance, imageHeight, 0]]}
        color="#FFD93D"
        lineWidth={2}
        dashed={type === 'convex'}
      />
      <mesh position={[imageDistance, imageHeight, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#FFD93D" />
      </mesh>
    </group>
  );
}

export default function OpticsAndLenses() {
  const [activeTab, setActiveTab] = useState<'convex-lens' | 'concave-lens' | 'concave-mirror' | 'convex-mirror'>('convex-lens');
  const [focalLength, setFocalLength] = useState(1);
  const [objectDistance, setObjectDistance] = useState(2);
  const [objectHeight, setObjectHeight] = useState(1);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Glasses className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Optics and Lenses</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('convex-lens')}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'convex-lens' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Maximize2 className="w-4 h-4" />
              Convex Lens
            </button>
            <button
              onClick={() => setActiveTab('concave-lens')}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'concave-lens' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Minimize2 className="w-4 h-4" />
              Concave Lens
            </button>
            <button
              onClick={() => setActiveTab('concave-mirror')}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'concave-mirror' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Focus className="w-4 h-4" />
              Concave Mirror
            </button>
            <button
              onClick={() => setActiveTab('convex-mirror')}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                activeTab === 'convex-mirror' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <MoveHorizontal className="w-4 h-4" />
              Convex Mirror
            </button>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-xl font-bold mb-4">Ray Diagram Controls</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Focal Length: {focalLength.toFixed(1)} units
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={focalLength}
                  onChange={(e) => setFocalLength(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Object Distance: {objectDistance.toFixed(1)} units
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={objectDistance}
                  onChange={(e) => setObjectDistance(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Object Height: {objectHeight.toFixed(1)} units
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={objectHeight}
                  onChange={(e) => setObjectHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-xl font-bold mb-4">Optical Formulas</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Lens/Mirror Formula:</h5>
                <div className="bg-gray-800 rounded-lg p-4">
                  <BlockMath>{`\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}`}</BlockMath>
                </div>
                <p className="text-gray-400 mt-2">
                  Where:
                  <ul className="list-disc list-inside mt-1">
                    <li><InlineMath>f</InlineMath> = focal length</li>
                    <li><InlineMath>v</InlineMath> = image distance</li>
                    <li><InlineMath>u</InlineMath> = object distance</li>
                  </ul>
                </p>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Magnification:</h5>
                <div className="bg-gray-800 rounded-lg p-4">
                  <BlockMath>{`m = -\\frac{v}{u} = -\\frac{h_i}{h_o}`}</BlockMath>
                </div>
                <p className="text-gray-400 mt-2">
                  Where:
                  <ul className="list-disc list-inside mt-1">
                    <li><InlineMath>m</InlineMath> = magnification</li>
                    <li><InlineMath>h_i</InlineMath> = image height</li>
                    <li><InlineMath>h_o</InlineMath> = object height</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ height: '400px' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {(activeTab === 'convex-lens' || activeTab === 'concave-lens') && (
                <LensVisualization
                  type={activeTab === 'convex-lens' ? 'convex' : 'concave'}
                  focalLength={focalLength}
                  objectDistance={objectDistance}
                  objectHeight={objectHeight}
                />
              )}
              {(activeTab === 'concave-mirror' || activeTab === 'convex-mirror') && (
                <MirrorVisualization
                  type={activeTab === 'concave-mirror' ? 'concave' : 'convex'}
                  focalLength={focalLength}
                  objectDistance={objectDistance}
                  objectHeight={objectHeight}
                />
              )}
              <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
            </Canvas>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Properties and Applications</h4>
            {activeTab === 'convex-lens' && (
              <div className="space-y-3">
                <p className="text-gray-300">Convex lenses are thicker in the middle and converge light rays.</p>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Used in magnifying glasses</li>
                  <li>Forms real images when object is beyond focal point</li>
                  <li>Used in cameras and microscopes</li>
                  <li>Can correct farsightedness</li>
                </ul>
              </div>
            )}
            {activeTab === 'concave-lens' && (
              <div className="space-y-3">
                <p className="text-gray-300">Concave lenses are thinner in the middle and diverge light rays.</p>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Always forms virtual, diminished images</li>
                  <li>Used to correct nearsightedness</li>
                  <li>Used in some telescopes</li>
                  <li>Wider field of view than convex lenses</li>
                </ul>
              </div>
            )}
            {activeTab === 'concave-mirror' && (
              <div className="space-y-3">
                <p className="text-gray-300">Concave mirrors converge reflected light rays to a focal point.</p>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Used in telescopes and satellite dishes</li>
                  <li>Can form both real and virtual images</li>
                  <li>Used in car headlights and flashlights</li>
                  <li>Applications in solar energy collection</li>
                </ul>
              </div>
            )}
            {activeTab === 'convex-mirror' && (
              <div className="space-y-3">
                <p className="text-gray-300">Convex mirrors diverge reflected light rays and provide a wider field of view.</p>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Always forms virtual, diminished images</li>
                  <li>Used in vehicle side mirrors</li>
                  <li>Security mirrors in stores</li>
                  <li>Traffic safety at intersections</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}