import React from 'react';
import { Link } from 'react-router-dom';
import { PlaySquare } from 'lucide-react';

export default function TerminalCard({ game }) {
  return (
    <div className="terminal-panel p-4 group flex flex-col h-full transition-all duration-300 hover:border-core-orange hover:shadow-glow">
      {/* Header bar */}
      <div className="flex justify-between items-center mb-3 border-b border-terminal-white/30 pb-2">
        <span className="text-xs text-terminal-white/60 tracking-widest">{game.id}</span>
        <span className="text-xs font-bold text-core-orange border border-core-orange px-1 bg-core-orange/10">
          {game.category.toUpperCase()}
        </span>
      </div>

      {/* Thumbnail Container */}
      <div className="relative aspect-video mb-4 overflow-hidden border border-terminal-white/50 group-hover:border-core-orange transition-colors duration-300">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="cyber-image w-full h-full object-cover"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-void/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <PlaySquare className="text-core-orange w-12 h-12" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-bold tracking-widest mb-1 group-hover:text-core-orange transition-colors">
          {game.title}
        </h3>
        <p className="text-xs text-terminal-white/70 mb-3 truncate">
          BY: {game.creator.toUpperCase()}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {game.keywords.slice(0, 2).map((kw, i) => (
            <span key={i} className="text-[10px] border border-terminal-white/40 px-1 py-0.5 text-terminal-white/60">
              #{kw.toUpperCase()}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-4 border-t border-terminal-white/20 flex justify-between items-center">
          <span className="text-xs tracking-widest">{game.accessRights}</span>
          <Link 
            to={`/detail/${game.id}`}
            className="btn-cyber text-xs py-1 px-3"
          >
            ACCESS
          </Link>
        </div>
      </div>
    </div>
  );
}
