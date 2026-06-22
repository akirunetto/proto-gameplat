import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Catalog from './pages/Catalog';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Player from './pages/Player';
import Upload from './pages/Upload';
import Library from './pages/Library';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="search" element={<Search />} />
            <Route path="upload" element={<Upload />} />
            <Route path="library" element={<Library />} />
            <Route path="detail/:id" element={<Detail />} />
          </Route>
          {/* Player is outside Layout to be fullscreen */}
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;
