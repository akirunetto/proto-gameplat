<div align="center">

# 🌌 NEXUS.IO
**Cosmic Game Distribution Platform**

*A high-fidelity, cybercore-styled Multimedia Indexing and Retrieval System acting as a modern Game Distribution Platform.*

<br />

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

</div>

---

## 🚀 Overview

**NEXUS.IO** is a robust, static frontend prototype built to emulate complex digital storefronts like Steam or itch.io. It was designed from the ground up with a **"Cybercore / Retro-Futuristic"** terminal aesthetic—utilizing a cohesive void black (`#050505`), core orange (`#FF5722`), and pure white (`#FFFFFF`) color palette, alongside immersive scanline overlays and glowing UI components.

Beyond the visuals, the platform is heavily data-driven. It scrapes real-world data from the official **Steam API** via a custom Node.js script, indexing the Top 50 most famous Steam games. This includes high-resolution screenshots, comprehensive metadata, and real-time HLS (`.m3u8`) streaming of game trailers.

---

## ✨ Core Features

- 📡 **Real-World Data Indexing:** Integrated custom Node.js ETL script (`fetchGames.mjs`) to pull live Steam API data (prices in IDR, genres, OS support, gallery images).
- 🎥 **Advanced Media Playback (Broadcast Node):** Fullscreen immersive video player powered by `hls.js` capable of decoding and streaming Steam's raw HTTP Live Streaming (`.m3u8`) trailer formats.
- ⏱️ **Multimedia Synchronization (Event-Based UI):** Implements dynamic, timestamp-driven UI rendering. While watching a trailer, an interactive "ADD TO WISHLIST" overlay perfectly synchronizes to appear only between the 3rd and 10th seconds of playback.
- 💾 **Global State Management:** Employs React Context API (`WishlistContext`) to act as a temporary memory-based storage system for wishlisted games (accessible via the `USR.LIBRARY` page).
- 🔍 **Advanced Querying & Filtering:** A lightning-fast search engine that cross-references all indexed metadata (Title, Creator, Keywords, Description, Release Date). Includes price/date sorting and OS/Category dropdown filters.
- 📤 **Developer Upload Simulation:** A `DEV.UPLOAD_NODE` form allowing simulated ingestion of new games, featuring styled dropzones for thumbnails, multi-screenshots, and primary `.exe/.zip` game files.

---

## 🛠️ Technology Stack

- **Frontend Core:** React 18, Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS v3, Custom CSS Animations (Scanlines, Glitches, Pulses)
- **Icons:** Lucide React
- **Video Streaming:** Hls.js
- **Data Scripting:** Node.js (Native `https` & `fs` modules)

---

## 💻 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd proto-gameplat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **(Optional) Re-fetch the Latest Steam Data**
   The repository comes with a pre-populated `mockGames.js` file. If you wish to pull the absolute newest data directly from Steam, run the ETL script (takes ~60 seconds to respect rate limits):
   ```bash
   node fetchGames.mjs
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Mainframe**
   Open your browser and navigate to `http://localhost:5173`

---

## 📂 Project Structure

```text
├── fetchGames.mjs         # Node.js script to scrape the Steam API
├── index.html             # Entry HTML
├── src/
│   ├── components/        # Reusable UI (Layout, TerminalCard)
│   ├── context/           # Global Context Providers (WishlistContext)
│   ├── data/              # Indexed Data (mockGames.js)
│   ├── pages/             # Application Views (Homepage, Search, Detail, Player, Upload, Library)
│   ├── index.css          # Core visual styling & animations
│   └── App.jsx            # Routing Configuration
└── tailwind.config.js     # Custom design tokens
```

---

<div align="center">
  <p className="text-xs">v2.1.4 // NEXUS_DISTRIBUTION_NODE // ENCRYPTED CONNECTION ESTABLISHED</p>
</div>
