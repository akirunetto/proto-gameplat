import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { mockGames } from '../data/mockGames';
import TerminalCard from '../components/TerminalCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [osFilter, setOsFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('DEFAULT');

  const categories = ['ALL', ...new Set(mockGames.map(g => g.category))];
  const osOptions = ['ALL', ...new Set(mockGames.flatMap(g => g.osSupport || []))];

  const filteredGames = useMemo(() => {
    let result = mockGames.filter(game => {
      const searchString = [
        game.title,
        game.creator,
        game.dateCreated,
        game.description,
        game.category,
        game.accessRights,
        game.resolution,
        game.duration,
        ...(game.keywords || []),
        ...(game.osSupport || [])
      ].join(' ').toLowerCase();

      const matchesQuery = !query || searchString.includes(query.toLowerCase());
      const matchesCategory = categoryFilter === 'ALL' || game.category === categoryFilter;
      const matchesOs = osFilter === 'ALL' || game.osSupport?.includes(osFilter);
      
      return matchesQuery && matchesCategory && matchesOs;
    });

    if (sortOrder === 'PRICE_ASC') {
      result.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    } else if (sortOrder === 'PRICE_DESC') {
      result.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    } else if (sortOrder === 'DATE_ASC') {
      result.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
    } else if (sortOrder === 'DATE_DESC') {
      result.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    }

    return result;
  }, [query, categoryFilter, osFilter, sortOrder]);

  return (
    <div className="space-y-8 flex flex-col md:flex-row md:space-x-8 md:space-y-0">
      
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-6">
        <div className="terminal-panel p-4">
          <div className="flex items-center space-x-2 border-b border-terminal-white/30 pb-2 mb-4">
            <Filter size={16} className="text-core-orange" />
            <span className="tracking-widest font-bold">FILTERS</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-terminal-white/60 mb-2">CATEGORY_PARAM</label>
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-void border border-terminal-white/50 text-terminal-white p-2 text-sm focus:border-core-orange outline-none focus:shadow-glow transition-all"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-terminal-white/60 mb-2">OS_PARAM</label>
              <select 
                value={osFilter}
                onChange={(e) => setOsFilter(e.target.value)}
                className="w-full bg-void border border-terminal-white/50 text-terminal-white p-2 text-sm focus:border-core-orange outline-none focus:shadow-glow transition-all mb-4"
              >
                {osOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-terminal-white/60 mb-2">SORT_BY</label>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-void border border-terminal-white/50 text-terminal-white p-2 text-sm focus:border-core-orange outline-none focus:shadow-glow transition-all"
              >
                <option value="DEFAULT">DEFAULT</option>
                <option value="PRICE_ASC">PRICE (LOW TO HIGH)</option>
                <option value="PRICE_DESC">PRICE (HIGH TO LOW)</option>
                <option value="DATE_DESC">DATE (NEWEST FIRST)</option>
                <option value="DATE_ASC">DATE (OLDEST FIRST)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search Area */}
      <div className="flex-grow space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon className="text-terminal-white/50 w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="ENTER QUERY (TITLE, CREATOR, TAGS, DATE)..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-void border-2 border-terminal-white/50 text-terminal-white pl-12 pr-10 py-4 font-mono text-lg focus:border-core-orange focus:shadow-glow transition-all outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-terminal-white/50 hover:text-core-orange"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-end border-b border-terminal-white/30 pb-2">
          <span className="text-xs tracking-widest text-terminal-white/60">
            RESULTS_FOUND: {filteredGames.length}
          </span>
          <span className="text-xs text-core-orange typing-cursor">
            QUERY_ACTIVE
          </span>
        </div>

        {/* Results Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map(game => (
              <TerminalCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="terminal-panel p-12 text-center border-dashed text-terminal-white/50">
            NO_MATCHING_RECORDS_FOUND
          </div>
        )}
      </div>

    </div>
  );
}
