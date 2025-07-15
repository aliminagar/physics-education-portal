import React, { useState } from 'react';
import { MessageSquare, Users, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}

const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: "Understanding Wave-Particle Duality",
    content: "Can someone explain the double-slit experiment in simple terms? I'm having trouble grasping the concept.",
    author: "PhysicsStudent",
    date: "2025-03-15",
    likes: 24,
    comments: 12,
    tags: ['quantum-mechanics', 'waves', 'particles']
  },
  {
    id: '2',
    title: "Help with Special Relativity Problem",
    content: "Working on time dilation calculations. How do you handle relative velocity in this scenario?",
    author: "RelativityLearner",
    date: "2025-03-14",
    likes: 15,
    comments: 8,
    tags: ['relativity', 'time-dilation', 'homework']
  }
];

export default function CommunityForum() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-blue-400 w-6 h-6" />
          <h3 className="text-2xl font-bold">Community Forum</h3>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Users className="w-4 h-4" />
          Join Discussion
        </button>
      </div>

      <div className="space-y-6">
        {forumPosts.map((post) => (
          <div key={post.id} className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
            <p className="text-gray-300 mb-4">{post.content}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    tag === selectedTag
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}