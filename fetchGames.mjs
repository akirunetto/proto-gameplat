import fs from 'fs';
import https from 'https';

const appIds = [
  730, // CS:GO (CS2)
  570, // Dota 2
  271590, // GTA V
  1086940, // Baldur's Gate 3
  1091500, // Cyberpunk 2077
  1172470, // Apex Legends
  440, // Team Fortress 2
  252490, // Rust
  105600, // Terraria
  413150, // Stardew Valley
  359550, // Rainbow Six Siege
  230410, // Warframe
  1245620, // Elden Ring
  292030, // Witcher 3
  400, // Portal
  620, // Portal 2
  892970, // Valheim
  394360, // Hearts of Iron IV
  281990, // Stellaris
  1085660, // Destiny 2
  1174180, // RDR2
  236390, // War Thunder
  381210, // Dead by Daylight
  252950, // Rocket League
  550, // Left 4 Dead 2
  814380, // Sekiro
  378120, // Fallout 4
  1151640, // Horizon Zero Dawn
  489830, // Skyrim SE
  1811260, // EA Sports FC 24
  236850, // EU4
  203160, // Tomb Raider
  1097150, // Fall Guys
  1240440, // Halo Infinite
  275850, // No Man's Sky
  1145360, // Hades
  1794680, // Vampire Survivors
  242760, // The Forest
  1326470, // Sons of the Forest
  289070, // Civ VI
  255710, // Cities Skylines
  1237320, // Hitman 3
  1172620, // Sea of Thieves
  8930, // Civ V
  4000, // Garry's Mod
  601150, // Devil May Cry 5
  990080, // Hogwarts Legacy
  1321440, // Elden Ring? wait, already have 1245620. Let's use 1817070 (Marvel's Spider-Man)
  2050650, // Resident Evil 4 Remake
  1286680 // Tiny Tina's Wonderlands
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchAppDetails = (appId) => {
  return new Promise((resolve, reject) => {
    https.get(`https://store.steampowered.com/api/appdetails?appids=${appId}&cc=id`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
};

const removeHtmlTags = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '');
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function run() {
  const games = [];
  
  for (let i = 0; i < appIds.length; i++) {
    const appId = appIds[i];
    console.log(`Fetching ${appId}... (${i+1}/${appIds.length})`);
    try {
      const response = await fetchAppDetails(appId);
      if (response && response[appId] && response[appId].success) {
        const data = response[appId].data;
        
        const osSupport = [];
        if (data.platforms?.windows) osSupport.push('Windows');
        if (data.platforms?.mac) osSupport.push('MacOS');
        if (data.platforms?.linux) osSupport.push('Linux');
        if (osSupport.length === 0) osSupport.push('Windows');

        games.push({
          id: `steam_${appId}`,
          title: data.name,
          creator: data.developers?.[0] || data.publishers?.[0] || 'Unknown',
          dateCreated: data.release_date?.date || 'Unknown',
          osSupport: osSupport,
          duration: `Trailer: 0${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 50) + 10}`,
          resolution: getRandom(['1080p', '1440p', '4K']),
          keywords: data.genres ? data.genres.map(g => g.description) : ['Game'],
          description: removeHtmlTags(data.short_description),
          category: data.genres?.[0]?.description || 'Game',
          accessRights: data.is_free ? 'Free-to-Play' : (data.price_overview?.final_formatted || 'Premium'),
          priceValue: data.is_free ? 0 : (data.price_overview?.final || 0),
          thumbnail: data.header_image,
          video: data.movies?.[0]?.hls_h264 || data.movies?.[0]?.mp4?.max || data.movies?.[0]?.webm?.max || 'https://www.w3schools.com/html/mov_bbb.mp4',
          screenshots: data.screenshots ? data.screenshots.map(s => s.path_full) : []
        });
      }
    } catch (e) {
      console.error(`Failed to fetch ${appId}:`, e);
    }
    
    // Sleep to avoid rate limits
    await sleep(1200);
  }

  const jsContent = `export const mockGames = ${JSON.stringify(games, null, 2)};\n`;
  fs.writeFileSync('./src/data/mockGames.js', jsContent);
  console.log('Saved to src/data/mockGames.js');
}

run();
