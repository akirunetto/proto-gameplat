import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Catalog from './pages/Catalog';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Player from './pages/Player';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="search" element={<Search />} />
          <Route path="detail/:id" element={<Detail />} />
        </Route>
        {/* Player is outside Layout to be fullscreen */}
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
