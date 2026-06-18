import React from 'react';
import { mockGames } from '../data/mockGames';
import TerminalCard from '../components/TerminalCard';
import { Database } from 'lucide-react';

export default function Catalog() {
  return (
    <div className="space-y-6">
      <div className="border-b border-terminal-white/30 pb-4 mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="text-core-orange" />
          <h2 className="text-2xl font-bold tracking-widest">THE_DATABASE</h2>
        </div>
        <div className="text-xs text-terminal-white/50 font-mono text-right">
          <div>ENTRIES: {mockGames.length}</div>
          <div>STATUS: <span className="text-green-500">OPTIMAL</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockGames.map(game => (
          <TerminalCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
