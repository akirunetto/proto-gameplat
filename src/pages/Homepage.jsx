import React from 'react';
import { Link } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import TerminalCard from '../components/TerminalCard';
import { Play } from 'lucide-react';

export default function Homepage() {
  const trendingGame = mockGames[0];
  const newReleases = mockGames.slice(1, 5);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative border border-terminal-white/50 bg-void p-1 overflow-hidden group">
        <div className="absolute inset-0 z-0">
          {/* Simulated Video Background */}
          <div className="w-full h-full relative cyber-image opacity-40">
            <img 
              src={trendingGame.thumbnail} 
              alt={trendingGame.title}
              className="w-full h-full object-cover blur-sm"
            />
          </div>
        </div>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-start min-h-[400px] justify-end bg-gradient-to-t from-void via-void/80 to-transparent">
          <div className="mb-4 inline-block px-2 py-1 border border-core-orange text-core-orange text-xs tracking-widest bg-core-orange/10">
            TRENDING_NODE
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 shadow-black drop-shadow-lg">
            {trendingGame.title}
          </h2>
          <p className="max-w-xl text-terminal-white/80 mb-8 tracking-wide text-sm md:text-base border-l-2 border-core-orange pl-4">
            {trendingGame.description}
          </p>
          
          <div className="flex space-x-4">
            <Link to={`/detail/${trendingGame.id}`} className="btn-cyber active flex items-center space-x-2">
              <Play size={16} />
              <span>INITIALIZE</span>
            </Link>
            <Link to={`/detail/${trendingGame.id}`} className="btn-cyber flex items-center">
              VIEW_DATA
            </Link>
          </div>
        </div>
      </section>

      {/* Horizontal Scrolling List */}
      <section>
        <div className="flex justify-between items-end mb-6 border-b border-terminal-white/30 pb-2">
          <h3 className="text-xl font-bold tracking-widest text-terminal-white">NEW_RELEASES</h3>
          <Link to="/catalog" className="text-xs text-core-orange hover:text-terminal-white transition-colors">
            VIEW_ALL &gt;
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-6 snap-x">
          {newReleases.map(game => (
            <div key={game.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <TerminalCard game={game} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
