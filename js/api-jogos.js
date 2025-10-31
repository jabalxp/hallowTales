// RAWG API Integration for Horror Games
// This file fetches games dynamically from RAWG API

// Cache for API results to avoid excessive requests
let gamesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch horror games from RAWG API
async function fetchHorrorGames() {
    // Check if API key is configured
    if (!API_CONFIG.RAWG.API_KEY || API_CONFIG.RAWG.API_KEY === 'YOUR_RAWG_API_KEY_HERE') {
        console.warn('RAWG API key not configured. Using fallback data.');
        return getFallbackGames();
    }

    // Check cache first
    if (gamesCache && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
        console.log('Returning games from cache');
        return gamesCache;
    }

    try {
        console.log('Fetching horror games from RAWG API...');
        
        // Fetch multiple pages of horror games
        const promises = [];
        const genres = '4'; // Horror genre ID in RAWG
        
        // Fetch 2 pages to get ~40 games
        for (let page = 1; page <= 2; page++) {
            const url = buildApiUrl(API_CONFIG.RAWG.BASE_URL, '/games', {
                key: API_CONFIG.RAWG.API_KEY,
                genres: genres,
                page: page,
                page_size: 20,
                ordering: '-rating,-metacritic',
                tags: 'horror,survival-horror,psychological-horror'
            });
            
            promises.push(apiFetch(url));
        }

        const results = await Promise.all(promises);
        
        // Combine and process results
        const allGames = results.flatMap(result => result.results || []);
        
        console.log(`Fetched ${allGames.length} games from RAWG`);
        
        // Map RAWG data to our format
        gamesCache = allGames.map((game, index) => {
            // Truncate long descriptions
            let sinopse = game.description_raw || 'No description available.';
            if (sinopse.length > 250) {
                sinopse = sinopse.substring(0, 247) + '...';
            }

            // Map RAWG genres to our categories
            let categoria = 'Horror';
            const genreNames = game.genres?.map(g => g.name.toLowerCase()) || [];
            const tagNames = game.tags?.map(t => t.name.toLowerCase()) || [];
            
            // Check tags and genres for category mapping
            if (tagNames.includes('survival horror') || tagNames.includes('survival')) {
                categoria = 'Survival Horror';
            } else if (tagNames.includes('psychological horror') || tagNames.includes('psychological')) {
                categoria = 'Psychological Horror';
            } else if (tagNames.includes('co-op') || tagNames.includes('multiplayer') || tagNames.includes('online co-op')) {
                categoria = 'Co-op Horror';
            } else if (genreNames.includes('indie')) {
                categoria = 'Indie Horror';
            } else if (genreNames.includes('action')) {
                categoria = 'Action Horror';
            } else if (genreNames.includes('adventure')) {
                categoria = 'Adventure Horror';
            }

            return {
                id: game.slug || `jogo-${index + 1}`,
                titulo: game.name,
                ano: game.released ? new Date(game.released).getFullYear() : 'N/A',
                desenvolvedor: game.developers?.length > 0 ? game.developers[0].name : 'Unknown',
                sinopse: sinopse,
                poster: game.background_image || 'https://via.placeholder.com/500x750/1a0033/00ff00?text=No+Image',
                plataformas: game.parent_platforms?.map(p => p.platform.name).join(', ') || 'PC',
                categoria: categoria,
                // RAWG rating is 0-5, convert to 0-10 scale
                nota: game.rating ? parseFloat((game.rating * 2).toFixed(1)) : (game.metacritic ? game.metacritic / 10 : 7.5),
                metacritic: game.metacritic || null,
                rawg_id: game.id,
                rawg_slug: game.slug,
                esrb_rating: game.esrb_rating?.name || 'Not Rated'
            };
        });

        cacheTimestamp = Date.now();
        console.log('Games cached successfully');
        return gamesCache;

    } catch (error) {
        console.error('Error fetching games from RAWG:', error);
        
        // Return fallback hardcoded data if API fails
        return getFallbackGames();
    }
}

// Fallback hardcoded games in case API fails or no API key
function getFallbackGames() {
    console.log('Using fallback game data');
    return [
        {
            id: 'resident-evil-4-remake',
            titulo: 'Resident Evil 4 Remake',
            ano: 2023,
            desenvolvedor: 'Capcom',
            sinopse: 'Remake do clássico jogo de terror com Leon S. Kennedy em uma missão de resgate na Europa rural.',
            poster: 'https://media.rawg.io/media/games/b5a/b5a1f6e41be4a8a0c8eea22f7dd2198d.jpg',
            plataformas: 'PC, PlayStation 5, Xbox Series X',
            categoria: 'Action, Shooter',
            nota: 9.2
        },
        {
            id: 'dead-space-remake',
            titulo: 'Dead Space Remake',
            ano: 2023,
            desenvolvedor: 'Motive Studio',
            sinopse: 'Remake do clássico de terror espacial, onde Isaac Clarke enfrenta horrores necromorphs a bordo da USG Ishimura.',
            poster: 'https://media.rawg.io/media/games/24e/24e3e962ae8d21e7e90a734a482ae2d7.jpg',
            plataformas: 'PC, PlayStation 5, Xbox Series X',
            categoria: 'Action, Shooter',
            nota: 8.9
        },
        {
            id: 'silent-hill-2',
            titulo: 'Silent Hill 2',
            ano: 2001,
            desenvolvedor: 'Konami',
            sinopse: 'James Sunderland recebe uma carta de sua falecida esposa e viaja para Silent Hill em busca de respostas.',
            poster: 'https://media.rawg.io/media/screenshots/0f6/0f64fe58b9b061b935d893ab8056953b.jpg',
            plataformas: 'PlayStation 2, PC, Xbox',
            categoria: 'Action, Adventure',
            nota: 9.5
        },
        {
            id: 'outlast',
            titulo: 'Outlast',
            ano: 2013,
            desenvolvedor: 'Red Barrels',
            sinopse: 'Jornalista investiga um asilo abandonado com apenas uma câmera de vídeo, sem poder se defender.',
            poster: 'https://media.rawg.io/media/games/9dd/9ddabb34840ea9227556670606cf8ea3.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Action, Adventure',
            nota: 8.5
        },
        {
            id: 'amnesia-the-dark-descent',
            titulo: 'Amnesia: The Dark Descent',
            ano: 2010,
            desenvolvedor: 'Frictional Games',
            sinopse: 'Daniel explora um castelo sombrio enquanto foge de criaturas horríveis e tenta recuperar sua memória.',
            poster: 'https://media.rawg.io/media/games/b54/b54598d1d5cc31899f4f0a7e3122a7b0.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Action, Adventure',
            nota: 8.8
        },
        {
            id: 'phasmophobia',
            titulo: 'Phasmophobia',
            ano: 2020,
            desenvolvedor: 'Kinetic Games',
            sinopse: 'Jogo cooperativo de terror paranormal onde você investiga locais assombrados como caçador de fantasmas.',
            poster: 'https://media.rawg.io/media/games/b54/b54c84c769f5be79e0103e469fef4fef.jpg',
            plataformas: 'PC',
            categoria: 'Action, Adventure',
            nota: 8.6
        },
        {
            id: 'alien-isolation',
            titulo: 'Alien: Isolation',
            ano: 2014,
            desenvolvedor: 'Creative Assembly',
            sinopse: 'Amanda Ripley enfrenta o Xenomorph em uma estação espacial abandonada, 15 anos após os eventos do filme.',
            poster: 'https://media.rawg.io/media/games/c6b/c6bfece1daf8d06bc0a60632ac78e5bf.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Action, Adventure',
            nota: 9.0
        },
        {
            id: 'layers-of-fear',
            titulo: 'Layers of Fear',
            ano: 2016,
            desenvolvedor: 'Bloober Team',
            sinopse: 'Um pintor psicologicamente perturbado tenta completar sua obra-prima enquanto navega por uma mansão em constante mutação.',
            poster: 'https://media.rawg.io/media/games/83f/83f6f70a7c1b86cd2637b029d8b42caa.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Adventure',
            nota: 8.3
        },
        {
            id: 'the-evil-within',
            titulo: 'The Evil Within',
            ano: 2014,
            desenvolvedor: 'Tango Gameworks',
            sinopse: 'Do criador de Resident Evil, um detetive enfrenta pesadelos surreais em um mundo distorcido.',
            poster: 'https://media.rawg.io/media/games/471/4712c9ac591f556f553556b864a7e92b.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One',
            categoria: 'Action, Shooter',
            nota: 8.4
        },
        {
            id: 'until-dawn',
            titulo: 'Until Dawn',
            ano: 2015,
            desenvolvedor: 'Supermassive Games',
            sinopse: 'Drama interativo onde suas escolhas determinam quem sobrevive em uma cabana nas montanhas.',
            poster: 'https://media.rawg.io/media/games/cee/cee740ae4e2bb7a7d8687280a8f91f63.jpg',
            plataformas: 'PlayStation 4, PC',
            categoria: 'Adventure',
            nota: 8.7
        },
        {
            id: 'little-nightmares',
            titulo: 'Little Nightmares',
            ano: 2017,
            desenvolvedor: 'Tarsier Studios',
            sinopse: 'Uma menina tenta escapar de um navio sinistro chamado The Maw, repleto de criaturas grotescas.',
            poster: 'https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Adventure, Platformer',
            nota: 8.5
        },
        {
            id: 'visage',
            titulo: 'Visage',
            ano: 2020,
            desenvolvedor: 'SadSquare Studio',
            sinopse: 'Horror psicológico em primeira pessoa inspirado em P.T., explorando uma casa com histórico sombrio.',
            poster: 'https://media.rawg.io/media/games/7f0/7f021d4a3577ac9d591a628a431e4e65.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One',
            categoria: 'Adventure',
            nota: 8.6
        },
        {
            id: 'soma',
            titulo: 'SOMA',
            ano: 2015,
            desenvolvedor: 'Frictional Games',
            sinopse: 'Terror sci-fi que explora consciência e identidade em uma instalação de pesquisa submarina.',
            poster: 'https://media.rawg.io/media/games/cfe/cfef9c9540e25660ebd6e2d8f9d52f76.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One',
            categoria: 'Adventure',
            nota: 8.9
        },
        {
            id: 'fatal-frame-ii',
            titulo: 'Fatal Frame II',
            ano: 2003,
            desenvolvedor: 'Tecmo',
            sinopse: 'Gêmeas exploram uma vila amaldiçoada usando apenas uma câmera para capturar espíritos.',
            poster: 'https://media.rawg.io/media/screenshots/7dd/7dd630bae8e6e3a0bb73c4853e5bb37c.jpg',
            plataformas: 'PlayStation 2, Xbox',
            categoria: 'Action, Adventure',
            nota: 9.1
        },
        {
            id: 'the-quarry',
            titulo: 'The Quarry',
            ano: 2022,
            desenvolvedor: 'Supermassive Games',
            sinopse: 'Drama de terror interativo onde conselheiros de acampamento enfrentam uma noite de horror.',
            poster: 'https://media.rawg.io/media/games/7f5/7f5ce97f008c4a6e4c386a6b4c7b7e45.jpg',
            plataformas: 'PC, PlayStation 5, Xbox Series X',
            categoria: 'Adventure',
            nota: 8.4
        },
        {
            id: 'dying-light',
            titulo: 'Dying Light',
            ano: 2015,
            desenvolvedor: 'Techland',
            sinopse: 'Apocalipse zumbi com parkour durante o dia e terror intenso durante a noite.',
            poster: 'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One',
            categoria: 'Action, RPG',
            nota: 8.8
        },
        {
            id: 'observer',
            titulo: 'Observer',
            ano: 2017,
            desenvolvedor: 'Bloober Team',
            sinopse: 'Detetive cyberpunk pode invadir mentes de suspeitos em uma Polônia distópica de 2084.',
            poster: 'https://media.rawg.io/media/games/9d7/9d7a26c6e164439e7592e4d89a9be3e5.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Adventure',
            nota: 8.2
        },
        {
            id: 'condemned',
            titulo: 'Condemned: Criminal Origins',
            ano: 2005,
            desenvolvedor: 'Monolith Productions',
            sinopse: 'Agente do FBI investiga serial killers em combate corpo a corpo brutal.',
            poster: 'https://media.rawg.io/media/screenshots/be5/be5d2a389c48dd2ddd5be6f5b1f4b6a3.jpg',
            plataformas: 'Xbox 360, PC',
            categoria: 'Action',
            nota: 8.5
        },
        {
            id: 'blair-witch',
            titulo: 'Blair Witch',
            ano: 2019,
            desenvolvedor: 'Bloober Team',
            sinopse: 'Baseado no filme, você procura um menino desaparecido na floresta de Black Hills com seu cão.',
            poster: 'https://media.rawg.io/media/games/da8/da840d7a2f9dd05f4b6f0969c32f0b7b.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Adventure',
            nota: 7.8
        },
        {
            id: 'metro-last-light',
            titulo: 'Metro: Last Light',
            ano: 2013,
            desenvolvedor: '4A Games',
            sinopse: 'Sobreviva nos túneis de metrô pós-apocalípticos de Moscou cheios de mutantes e facções hostis.',
            poster: 'https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg',
            plataformas: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
            categoria: 'Action, Shooter',
            nota: 8.9
        }
    ];
}

// Initialize games data
let jogosData = [];

// Load games on page load
async function initializeGames() {
    try {
        jogosData = await fetchHorrorGames();
        console.log('Games initialized:', jogosData.length);
    } catch (error) {
        console.error('Error initializing games:', error);
        jogosData = getFallbackGames();
    }
}
