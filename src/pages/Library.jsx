import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { mockGames } from '../data/mockGames';
import TerminalCard from '../components/TerminalCard';
import { Library as LibraryIcon } from 'lucide-react';

export default function Library() {
  const { wishlist } = useWishlist();
  
  const wishlistedGames = mockGames.filter(game => wishlist.includes(game.id));

  return (
    <div className="space-y-8">
      <div className="border-b border-core-orange pb-4 flex items-center space-x-3 text-core-orange">
        <LibraryIcon size={24} />
        <h2 className="text-2xl font-bold tracking-widest">USR.LIBRARY_WISHLIST</h2>
      </div>

      <div className="flex justify-between items-end border-b border-terminal-white/30 pb-2">
        <span className="text-xs tracking-widest text-terminal-white/60">
          SAVED_RECORDS: {wishlistedGames.length}
        </span>
        <span className="text-xs text-core-orange typing-cursor">
          TEMPORARY_STORAGE_ACTIVE
        </span>
      </div>

      {wishlistedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedGames.map(game => (
            <TerminalCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="terminal-panel p-16 text-center border-dashed text-terminal-white/50 flex flex-col items-center justify-center space-y-4">
          <LibraryIcon size={48} className="opacity-50" />
          <p className="tracking-widest">NO_RECORDS_IN_WISHLIST</p>
          <p className="text-xs opacity-60">ADD GAMES TO WISHLIST TO SEE THEM STORED HERE TEMPORARILY.</p>
        </div>
      )}
    </div>
  );
}
