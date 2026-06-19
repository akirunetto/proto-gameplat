import React, { useState } from 'react';
import { Upload as UploadIcon, Image, Film, ShieldAlert, Package } from 'lucide-react';

export default function Upload() {
  const [status, setStatus] = useState('IDLE');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('UPLOADING');
    setTimeout(() => {
      setStatus('SUCCESS');
      e.target.reset();
      setTimeout(() => setStatus('IDLE'), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-core-orange pb-4 flex items-center space-x-3 text-core-orange">
        <UploadIcon size={24} />
        <h2 className="text-2xl font-bold tracking-widest">DEV.UPLOAD_NODE</h2>
      </div>

      <div className="terminal-panel p-8">
        <div className="mb-6 border-l-2 border-core-orange pl-4">
          <p className="text-terminal-white/80 text-sm">
            INITIALIZE UPLOAD SEQUENCE. PLEASE PROVIDE REQUIRED METADATA AND MEDIA ASSETS FOR INDEXING.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs tracking-widest text-terminal-white/60">GAME_TITLE</label>
              <input required type="text" className="w-full bg-void border border-terminal-white/50 text-terminal-white p-3 focus:border-core-orange focus:shadow-glow outline-none transition-all" placeholder="Enter Title..." />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs tracking-widest text-terminal-white/60">DEVELOPER_ID</label>
              <input required type="text" className="w-full bg-void border border-terminal-white/50 text-terminal-white p-3 focus:border-core-orange focus:shadow-glow outline-none transition-all" placeholder="Enter Creator Name..." />
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest text-terminal-white/60">PRICE_IDR</label>
              <input required type="number" min="0" className="w-full bg-void border border-terminal-white/50 text-terminal-white p-3 focus:border-core-orange focus:shadow-glow outline-none transition-all" placeholder="0 for Free to Play" />
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest text-terminal-white/60">CATEGORIES (COMMA_SEPARATED)</label>
              <input required type="text" className="w-full bg-void border border-terminal-white/50 text-terminal-white p-3 focus:border-core-orange focus:shadow-glow outline-none transition-all" placeholder="Action, RPG, etc." />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs tracking-widest text-terminal-white/60">SUPPORTED_OS</label>
              <div className="flex space-x-6 bg-void border border-terminal-white/50 p-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" value="Windows" className="accent-core-orange w-4 h-4" defaultChecked />
                  <span className="text-sm">Windows</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" value="MacOS" className="accent-core-orange w-4 h-4" />
                  <span className="text-sm">MacOS</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" value="Linux" className="accent-core-orange w-4 h-4" />
                  <span className="text-sm">Linux</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs tracking-widest text-terminal-white/60">DESCRIPTION</label>
            <textarea required rows="4" className="w-full bg-void border border-terminal-white/50 text-terminal-white p-3 focus:border-core-orange focus:shadow-glow outline-none transition-all" placeholder="Enter game description..."></textarea>
          </div>

          <div className="border-t border-terminal-white/20 pt-6 mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="border border-dashed border-terminal-white/30 p-4 flex flex-col items-center justify-center text-center hover:border-core-orange hover:text-core-orange transition-colors cursor-pointer relative group">
              <input type="file" required accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Image className="mb-2 text-terminal-white/50 group-hover:text-core-orange transition-colors" />
              <span className="text-xs tracking-widest">UPLOAD_THUMBNAIL</span>
            </div>

            <div className="border border-dashed border-terminal-white/30 p-4 flex flex-col items-center justify-center text-center hover:border-core-orange hover:text-core-orange transition-colors cursor-pointer relative group">
              <input type="file" required multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Image className="mb-2 text-terminal-white/50 group-hover:text-core-orange transition-colors" />
              <span className="text-xs tracking-widest">SCREENSHOTS (MULTI)</span>
            </div>

            <div className="border border-dashed border-terminal-white/30 p-4 flex flex-col items-center justify-center text-center hover:border-core-orange hover:text-core-orange transition-colors cursor-pointer relative group">
              <input type="file" required accept="video/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Film className="mb-2 text-terminal-white/50 group-hover:text-core-orange transition-colors" />
              <span className="text-xs tracking-widest">VIDEO_TRAILER</span>
            </div>

            <div className="border border-dashed border-terminal-white/30 p-4 flex flex-col items-center justify-center text-center hover:border-core-orange hover:text-core-orange transition-colors cursor-pointer relative group">
              <input type="file" required accept=".exe,.zip,.tar.gz,.dmg" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Package className="mb-2 text-terminal-white/50 group-hover:text-core-orange transition-colors" />
              <span className="text-xs tracking-widest">GAME_FILE</span>
            </div>

          </div>

          <button 
            type="submit" 
            disabled={status === 'UPLOADING'}
            className="w-full btn-cyber py-4 mt-6 flex justify-center items-center space-x-2 text-lg active disabled:opacity-50"
          >
            {status === 'IDLE' && <span>TRANSMIT_DATA_TO_MAINFRAME</span>}
            {status === 'UPLOADING' && <span className="typing-cursor">UPLOADING...</span>}
            {status === 'SUCCESS' && <span>TRANSMISSION_SUCCESSFUL</span>}
          </button>

          {status === 'SUCCESS' && (
            <div className="bg-green-500/20 border border-green-500 text-green-500 p-4 flex items-center space-x-3">
              <ShieldAlert />
              <span className="tracking-widest text-sm">DATA RECORDED. AWAITING SYSTEM INDEXING.</span>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
