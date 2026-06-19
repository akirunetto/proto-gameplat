import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Database, Search, Disc, Play, UploadCloud } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'SYS.HOME', icon: Terminal },
    { path: '/catalog', label: 'DB.CATALOG', icon: Database },
    { path: '/search', label: 'QRY.SEARCH', icon: Search },
    { path: '/upload', label: 'DEV.UPLOAD', icon: UploadCloud },
  ];

  return (
    <div className="min-h-screen bg-void text-terminal-white font-mono relative flex flex-col">
      {/* Scanlines overlay */}
      <div className="scanlines pointer-events-none"></div>

      {/* Top Navigation Terminal Bar */}
      <header className="border-b border-terminal-white/50 bg-void/80 backdrop-blur z-40 sticky top-0">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-core-orange rounded-sm shadow-glow animate-pulse-glow"></div>
            <h1 className="text-xl font-bold tracking-widest text-terminal-white">
              NEXUS<span className="text-core-orange">.OS</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-1 border transition-all duration-300 ${
                    isActive
                      ? 'border-core-orange text-core-orange shadow-glow bg-core-orange/10'
                      : 'border-transparent text-terminal-white/70 hover:border-terminal-white/30 hover:text-terminal-white'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm tracking-wider uppercase">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-xs text-core-orange typing-cursor hidden sm:block">
              SYSTEM_ONLINE
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow z-10 relative">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-terminal-white/20 bg-void/90 py-4 z-40 mt-auto">
        <div className="container mx-auto px-4 flex justify-between text-xs text-terminal-white/50">
          <p>v2.1.4 // NEXUS_DISTRIBUTION_NODE</p>
          <p>ENCRYPTED CONNECTION ESTABLISHED</p>
        </div>
      </footer>
    </div>
  );
}
