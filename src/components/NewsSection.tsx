import React from 'react';
import { Newspaper, ExternalLink, Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  category: 'discovery' | 'research' | 'event';
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: "New Observations Challenge Dark Matter Theory",
    summary: "Recent observations of distant galaxies suggest unexpected distributions of dark matter, challenging current theoretical models.",
    date: "2025-03-15",
    source: "Physics Today",
    url: "https://physicstoday.scitation.org/topic/collections/dark-matter",
    category: 'discovery'
  },
  {
    id: '2',
    title: "Quantum Entanglement Achieved at Room Temperature",
    summary: "Scientists have successfully maintained quantum entanglement in a macroscopic system at room temperature, a breakthrough for quantum computing.",
    date: "2025-03-14",
    source: "Nature Physics",
    url: "https://www.nature.com/nphys/",
    category: 'research'
  },
  {
    id: '3',
    title: "International Physics Conference 2025",
    summary: "Leading physicists gather to discuss latest developments in quantum mechanics, cosmology, and particle physics.",
    date: "2025-04-01",
    source: "Physics Conference Board",
    url: "https://www.aps.org/meetings/",
    category: 'event'
  }
];

export default function NewsSection() {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Newspaper className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Latest in Physics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-gray-300 mb-4">{item.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{item.source}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  Read more
                  <ExternalLink className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}