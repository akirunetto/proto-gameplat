import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import { Terminal, Download, Play, ShieldAlert } from 'lucide-react';

export default function Detail() {
  const { id } = useParams();
  const game = mockGames.find(g => g.id === id);

  if (!game) {
    return <div className="p-12 text-center text-core-orange">ERROR: RECORD_NOT_FOUND</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header bar */}
      <div className="border-b border-core-orange pb-4 flex items-center space-x-3 text-core-orange">
        <ShieldAlert size={24} className="animate-pulse" />
        <h2 className="text-2xl font-bold tracking-widest">SYSTEM_OVERRIDE // {game.id}</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster / Thumbnail */}
        <div className="w-full md:w-1/2">
          <div className="border border-terminal-white/50 relative group p-1 bg-void overflow-hidden">
            <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-void/80 border border-core-orange text-core-orange text-xs">
              {game.accessRights}
            </div>
            <img 
              src={game.thumbnail} 
              alt={game.title} 
              className="w-full h-auto cyber-image relative z-0"
            />
          </div>
          
          <div className="mt-6 flex flex-col space-y-4">
            <Link 
              to={`/player/${game.id}`} 
              className="btn-cyber flex items-center justify-center space-x-2 w-full py-4 text-lg active"
            >
              <Play size={20} />
              <span>LAUNCH_BROADCAST_NODE</span>
            </Link>
            
            <button className="btn-cyber flex items-center justify-center space-x-2 w-full py-4 text-lg">
              <Download size={20} />
              <span>INITIALIZE_DOWNLOAD</span>
            </button>
          </div>
        </div>

        {/* Metadata Table */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="terminal-panel p-6 flex-grow">
            <div className="flex items-center space-x-2 mb-6 text-terminal-white/50 border-b border-terminal-white/20 pb-2">
              <Terminal size={16} />
              <span className="tracking-widest text-sm">METADATA_EXTRACT</span>
            </div>
            
            <table className="w-full text-sm text-left border-collapse">
              <tbody>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal w-1/3">TITLE</th>
                  <td className="py-3 font-bold text-core-orange">{game.title}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">CREATOR</th>
                  <td className="py-3 text-terminal-white">{game.creator}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">DATE_CREATED</th>
                  <td className="py-3 text-terminal-white">{game.dateCreated}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">FORMAT</th>
                  <td className="py-3 text-terminal-white">{game.fileFormat}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">DURATION</th>
                  <td className="py-3 text-terminal-white">{game.duration}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">RESOLUTION</th>
                  <td className="py-3 text-terminal-white">{game.resolution}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">CATEGORY</th>
                  <td className="py-3 text-terminal-white">{game.category}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">ACCESS</th>
                  <td className="py-3 text-terminal-white">{game.accessRights}</td>
                </tr>
                <tr className="border-b border-terminal-white/10">
                  <th className="py-3 text-terminal-white/60 font-normal">KEYWORDS</th>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      {game.keywords.map(kw => (
                        <span key={kw} className="px-1 border border-terminal-white/30 text-xs">#{kw}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-8 border border-terminal-white/20 p-4 bg-terminal-white/5 relative">
              <span className="absolute -top-3 left-2 bg-void px-1 text-xs text-core-orange">DESCRIPTION</span>
              <p className="text-terminal-white/80 leading-relaxed text-sm">
                {game.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
