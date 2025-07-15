import React, { useState } from 'react';
import { Calendar, Star, ExternalLink, User } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  scientist?: {
    name: string;
    image: string;
    contribution: string;
  };
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1543",
    title: "Heliocentric Model",
    description: "Publication of 'De revolutionibus orbium coelestium', proposing a heliocentric model of the solar system",
    scientist: {
      name: "Nicolaus Copernicus",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Nikolaus_Kopernikus_MOT.jpg/1200px-Nikolaus_Kopernikus_MOT.jpg",
      contribution: "Developed the heliocentric theory of the solar system"
    }
  },
  {
    year: "1576",
    title: "Astronomical Observations",
    description: "Establishment of Uraniborg observatory and systematic astronomical observations",
    scientist: {
      name: "Tycho Brahe",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Tycho_Brahe.JPG",
      contribution: "Made precise astronomical observations that later enabled Kepler's laws of planetary motion"
    }
  },
  {
    year: "1590",
    title: "Laws of Motion and Free Fall",
    description: "Discovery of the laws of motion and demonstration of free fall",
    scientist: {
      name: "Galileo Galilei",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Justus_Sustermans_-_Portrait_of_Galileo_Galilei%2C_1636.jpg",
      contribution: "Pioneered experimental scientific method and made groundbreaking discoveries in physics and astronomy"
    }
  },
  {
    year: "1609",
    title: "Laws of Planetary Motion",
    description: "Discovery of the three laws of planetary motion",
    scientist: {
      name: "Johannes Kepler",
      image: "https://images.fineartamerica.com/images-medium-large-5/johannes-kepler-royal-astronomical-societyscience-photo-library.jpg",
      contribution: "Formulated the laws of planetary motion"
    }
  },
  {
    year: "1687",
    title: "Newton's Principia",
    description: "Publication of Principia Mathematica, establishing the laws of motion and universal gravitation",
    scientist: {
      name: "Isaac Newton",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg",
      contribution: "Developed classical mechanics and the law of universal gravitation"
    }
  },
  {
    year: "1865",
    title: "Maxwell's Equations",
    description: "Unification of electricity and magnetism through Maxwell's equations",
    scientist: {
      name: "James Clerk Maxwell",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/57/James_Clerk_Maxwell.png",
      contribution: "Unified electricity and magnetism into electromagnetic theory"
    }
  },
  {
    year: "1898",
    title: "Discovery of Radium",
    description: "Isolation of radium and discovery of radioactivity",
    scientist: {
      name: "Marie Curie",
      image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcT6Ew_PgesXXnu5MTM1S0oP6xlIqGas2rrTf7Vu4SyePTfIrPkBlDCm2NjkE3Ymd1QnT3mmpulyQPzADDg",
      contribution: "Pioneered research on radioactivity and discovered radium and polonium"
    }
  },
  {
    year: "1905",
    title: "Special Relativity",
    description: "Publication of the special theory of relativity, revolutionizing our understanding of space and time",
    scientist: {
      name: "Albert Einstein",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg",
      contribution: "Developed the theories of special and general relativity"
    }
  },
  {
    year: "1925",
    title: "Quantum Mechanics",
    description: "Development of quantum mechanics and the uncertainty principle",
    scientist: {
      name: "Werner Heisenberg",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Bundesarchiv_Bild183-R57262%2C_Werner_Heisenberg.jpg",
      contribution: "Formulated the uncertainty principle and matrix mechanics"
    }
  },
  {
    year: "1927",
    title: "Wave Equation",
    description: "Development of the Schrödinger equation, describing quantum states",
    scientist: {
      name: "Erwin Schrödinger",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Erwin_Schr%C3%B6dinger_%281933%29.jpg",
      contribution: "Developed wave mechanics and the Schrödinger equation"
    }
  },
  {
    year: "1928",
    title: "Dirac Equation",
    description: "Formulation of the Dirac equation, predicting antimatter",
    scientist: {
      name: "Paul Dirac",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRz6-oWFt9y3ps0EKD8D1Faf7LyzkmgC9Ho9XvHfSB9P1O7707XkU15iWP6rJWHsR6Je6HP_EWyG7ehjvmdXMySHA",
      contribution: "Predicted the existence of antimatter and made fundamental contributions to quantum mechanics"
    }
  },
  {
    year: "1938",
    title: "Nuclear Fission",
    description: "Discovery of nuclear fission in uranium atoms",
    scientist: {
      name: "Lise Meitner",
      image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTQj_RUJaGRMWG5boWVBYOfEVL0xW9sagE5luD2HbNpSto8iBrPUL2hY_DPLyBMge1MQN1LoIC3qQoEAnc",
      contribution: "Provided the first theoretical explanation of nuclear fission and contributed to nuclear physics"
    }
  },
  {
    year: "1948",
    title: "Quantum Electrodynamics",
    description: "Development of quantum electrodynamics (QED)",
    scientist: {
      name: "Richard Feynman",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/RichardFeynman-PaineMansionWoods1984_copyrightTamikoThiel_bw.jpg",
      contribution: "Developed quantum electrodynamics and Feynman diagrams"
    }
  },
  {
    year: "1964",
    title: "Quark Theory",
    description: "Proposal of the quark model of particle physics",
    scientist: {
      name: "Murray Gell-Mann",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQAPhLfCSK-wTjn1tqw8TM9kKKEIL_Km1l3D2jWAbgE3pfsbFNGErbR-HN_kHI7LW8mvzJJzB-v_l3LwYGK0w3p1A",
      contribution: "Proposed the quark model and discovered the eightfold way"
    }
  },
  {
    year: "2012",
    title: "Higgs Boson",
    description: "Discovery of the Higgs boson at CERN's Large Hadron Collider",
    scientist: {
      name: "Peter Higgs",
      image: "https://www.nobelprize.org/images/higgs-15185-portrait-medium.jpg",
      contribution: "Predicted the existence of the Higgs boson"
    }
  }
];

export default function PhysicsTimeline() {
  const [selectedScientist, setSelectedScientist] = useState<TimelineEvent['scientist'] | null>(null);

  // Sort scientists chronologically based on the timeline events
  const sortedScientists = timelineEvents
    .filter(event => event.scientist)
    .map(event => event.scientist!);

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Timeline of Physics Discoveries</h2>

      {/* Scientists Gallery */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-center">Famous Physicists</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sortedScientists.map((scientist, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-4 cursor-pointer transition-all hover:bg-gray-700"
              onClick={() => setSelectedScientist(scientist)}
            >
              <div className="aspect-w-1 relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={scientist.image}
                  alt={scientist.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-semibold text-center">{scientist.name}</h4>
            </div>
          ))}
        </div>

        {/* Scientist Details Modal */}
        {selectedScientist && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full">
              <div className="flex gap-6">
                <div className="w-1/3">
                  <div className="aspect-w-1 relative rounded-lg overflow-hidden">
                    <img
                      src={selectedScientist.image}
                      alt={selectedScientist.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-2/3">
                  <h3 className="text-2xl font-bold mb-4">{selectedScientist.name}</h3>
                  <p className="text-gray-300">{selectedScientist.contribution}</p>
                  <button
                    onClick={() => setSelectedScientist(null)}
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
        <div className="space-y-16">
          {timelineEvents.map((event, index) => (
            <div 
              key={event.year} 
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center`}
              >
                <Star className="w-4 h-4 text-white" />
              </div>
              <div className={`bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl ${
                index % 2 === 0 ? 'mr-[calc(50%+2rem)]' : 'ml-[calc(50%+2rem)]'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-blue-400 w-5 h-5" />
                  <span className="text-blue-400 font-semibold">{event.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-300 mb-4">{event.description}</p>
                
                {event.scientist && (
                  <div className="mt-4 bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div>
                        <h4 className="text-lg font-semibold mb-1">{event.scientist.name}</h4>
                        <p className="text-gray-300 text-sm">{event.scientist.contribution}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}