import React, { useState } from 'react';
import { BookOpen, Video, FileText, BrainCircuit, Info, X } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'notes' | 'practice';
  description: string;
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  preview: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}

const resources: Resource[] = [
  {
    id: '1',
    title: "Introduction to Quantum Mechanics",
    type: 'pdf',
    description: "Comprehensive lecture notes covering quantum mechanics fundamentals",
    url: "#",
    difficulty: 'intermediate',
    preview: {
      beginner: "Start with basic concepts like wave-particle duality and the double-slit experiment. Focus on understanding the fundamental principles before diving deeper.",
      intermediate: "Explore Schrödinger's equation, quantum states, and probability distributions. Practice solving simple quantum mechanical systems.",
      advanced: "Delve into advanced topics like quantum entanglement, density matrices, and perturbation theory."
    }
  },
  {
    id: '2',
    title: "Special Relativity Video Series",
    type: 'video',
    description: "Visual explanations of Einstein's special relativity theory",
    url: "#",
    difficulty: 'beginner',
    preview: {
      beginner: "Learn about time dilation and length contraction through simple thought experiments and real-world examples.",
      intermediate: "Study Lorentz transformations and relativistic momentum/energy relationships.",
      advanced: "Explore spacetime diagrams, four-vectors, and advanced relativistic phenomena."
    }
  },
  {
    id: '3',
    title: "Advanced Electromagnetism Problems",
    type: 'practice',
    description: "Collection of challenging problems with detailed solutions",
    url: "#",
    difficulty: 'advanced',
    preview: {
      beginner: "Review fundamental concepts of electric and magnetic fields, and Coulomb's law.",
      intermediate: "Work through problems involving Maxwell's equations and electromagnetic waves.",
      advanced: "Tackle complex boundary value problems and electromagnetic radiation calculations."
    }
  }
];

const getIcon = (type: Resource['type']) => {
  switch (type) {
    case 'pdf':
      return FileText;
    case 'video':
      return Video;
    case 'notes':
      return BookOpen;
    case 'practice':
      return BrainCircuit;
    default:
      return FileText;
  }
};

export default function StudyResources() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Study Resources</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const Icon = getIcon(resource.type);
          return (
            <div key={resource.id} className="bg-gray-700 rounded-lg p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="text-blue-400 w-5 h-5" />
                <h4 className="text-lg font-semibold">{resource.title}</h4>
              </div>
              <p className="text-gray-300 flex-grow">{resource.description}</p>
              <div className="flex items-center justify-between mt-4 h-8">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  resource.difficulty === 'beginner' ? 'bg-green-900 text-green-300' :
                  resource.difficulty === 'intermediate' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {resource.difficulty}
                </span>
                <button
                  onClick={() => setSelectedResource(resource)}
                  className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Info className="w-4 h-4" />
                  Preview Content
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold">{selectedResource.title}</h4>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-lg font-semibold mb-2 text-blue-400">Recommended Learning Path</h5>
                <p className="text-gray-300">
                  {selectedResource.preview[selectedResource.difficulty]}
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="font-semibold mb-2">Learning Tips:</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Start with the fundamentals before advancing</li>
                  <li>Practice regularly with example problems</li>
                  <li>Connect concepts to real-world applications</li>
                  <li>Join study groups for collaborative learning</li>
                </ul>
              </div>

              <button
                onClick={() => setSelectedResource(null)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}