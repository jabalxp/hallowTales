// TMDB API Integration for Horror TV Series
// This file fetches series dynamically from TMDB API

// Cache for API results
let seriesCache = null;
let seriesCacheTimestamp = null;
const SERIES_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Streaming provider IDs for TMDB API
const STREAMING_PROVIDERS = {
    NETFLIX: 8,
    DISNEY_PLUS: 337,
    PARAMOUNT_PLUS: 531,
    APPLE_TV: 350,
    PRIME_VIDEO: 119,
    HBO_MAX: 384
};

// Fetch series from a specific streaming provider
async function fetchSeriesByProvider(providerId, providerName, maxResults = 10) {
    try {
        const url = buildApiUrl(API_CONFIG.TMDB.BASE_URL, '/discover/tv', {
            api_key: API_CONFIG.TMDB.API_KEY,
            with_genres: '10765,9648', // Sci-Fi & Fantasy, Mystery
            with_keywords: '9663|4458|9951|180547', // horror, supernatural, gore, survival horror
            with_watch_providers: providerId,
            watch_region: 'US', // Can be changed to BR for Brazil
            sort_by: 'popularity.desc',
            'vote_count.gte': 50,
            page: 1,
            language: 'pt-BR'
        });
        
        const result = await apiFetch(url);
        const series = result.results || [];
        
        console.log(`Fetched ${series.length} series from ${providerName}`);
        
        return series.slice(0, maxResults).map(s => ({
            ...s,
            streaming_provider: providerName
        }));
    } catch (error) {
        console.error(`Error fetching series from ${providerName}:`, error);
        return [];
    }
}

// Fetch horror series from TMDB API with specific streaming providers
async function fetchHorrorSeries() {
    // Check if API key is configured
    if (!API_CONFIG.TMDB.API_KEY || API_CONFIG.TMDB.API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
        console.warn('TMDB API key not configured. Using fallback data.');
        return getFallbackSeries();
    }

    // Check cache first
    if (seriesCache && seriesCacheTimestamp && (Date.now() - seriesCacheTimestamp) < SERIES_CACHE_DURATION) {
        console.log('Returning series from cache');
        return seriesCache;
    }

    try {
        console.log('Fetching horror series from TMDB API...');
        
        // Fetch series from each streaming provider in parallel
        const providerPromises = [
            fetchSeriesByProvider(STREAMING_PROVIDERS.NETFLIX, 'Netflix', 8),
            fetchSeriesByProvider(STREAMING_PROVIDERS.DISNEY_PLUS, 'Disney+', 5),
            fetchSeriesByProvider(STREAMING_PROVIDERS.PARAMOUNT_PLUS, 'Paramount+', 5),
            fetchSeriesByProvider(STREAMING_PROVIDERS.APPLE_TV, 'Apple TV+', 5),
            fetchSeriesByProvider(STREAMING_PROVIDERS.PRIME_VIDEO, 'Prime Video', 5),
            fetchSeriesByProvider(STREAMING_PROVIDERS.HBO_MAX, 'HBO Max', 5)
        ];

        const providerResults = await Promise.all(providerPromises);
        
        // Combine all series from different providers
        const allSeries = providerResults.flat();
        
        // Remove duplicates by TMDB ID
        const uniqueSeries = [];
        const seenIds = new Set();
        
        for (const series of allSeries) {
            if (!seenIds.has(series.id)) {
                seenIds.add(series.id);
                uniqueSeries.push(series);
            }
        }
        
        console.log(`Fetched ${uniqueSeries.length} unique series from TMDB`);
        
        // Map TMDB data to our format
        seriesCache = uniqueSeries.map((series) => {
            const ano = series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A';
            
            // Use the provider information from the fetch
            let streaming = series.streaming_provider || 'Vários';

            return {
                id: `serie-${series.id}`,
                titulo: series.name,
                ano: ano,
                criador: 'Various',
                sinopse: series.overview || 'Sem sinopse disponível.',
                poster: getTMDBImageUrl(series.poster_path, 'poster'),
                backdrop: getTMDBImageUrl(series.backdrop_path, 'backdrop'),
                temporadas: series.number_of_seasons || 'N/A',
                streaming: streaming,
                genero: 'Horror/Mystery',
                nota: series.vote_average ? parseFloat(series.vote_average.toFixed(1)) : 7.0,
                votos: series.vote_count,
                tmdb_id: series.id,
                popularidade: series.popularity
            };
        });

        // Add fallback series to ensure we have good content
        const fallbackSeries = getFallbackSeries();
        
        // Merge API series with fallback, avoiding duplicates by title
        const allSeriesMap = new Map();
        
        // Add API series first
        seriesCache.forEach(s => allSeriesMap.set(s.titulo.toLowerCase(), s));
        
        // Add fallback series that aren't already present
        fallbackSeries.forEach(s => {
            if (!allSeriesMap.has(s.titulo.toLowerCase())) {
                allSeriesMap.set(s.titulo.toLowerCase(), s);
            }
        });
        
        seriesCache = Array.from(allSeriesMap.values());

        seriesCacheTimestamp = Date.now();
        console.log(`Total series after merge: ${seriesCache.length}`);
        return seriesCache;

    } catch (error) {
        console.error('Error fetching series from TMDB:', error);
        return getFallbackSeries();
    }
}

// Fallback hardcoded series in case API fails
function getFallbackSeries() {
    console.log('Using fallback series data');
    return [
        {
            id: 'serie1',
            titulo: 'The Walking Dead',
            ano: 2010,
            criador: 'Frank Darabont',
            sinopse: 'Sobreviventes lutam em mundo pós-apocalíptico dominado por zumbis.',
            poster: 'https://image.tmdb.org/t/p/w500/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg',
            temporadas: 11,
            streaming: 'Netflix, Prime Video',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie2',
            titulo: 'Stranger Things',
            ano: 2016,
            criador: 'Irmãos Duffer',
            sinopse: 'Crianças enfrentam criaturas sobrenaturais em cidade dos anos 80.',
            poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
            temporadas: 4,
            streaming: 'Netflix',
            genero: 'Horror, Sci-Fi'
        },
        {
            id: 'serie3',
            titulo: 'American Horror Story',
            ano: 2011,
            criador: 'Ryan Murphy, Brad Falchuk',
            sinopse: 'Antologia com diferentes histórias de terror a cada temporada.',
            poster: 'https://image.tmdb.org/t/p/w500/qRbGYQI4CFSUX2M8CzYzPb9cOCi.jpg',
            temporadas: 12,
            streaming: 'Disney+',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie4',
            titulo: 'The Haunting of Hill House',
            ano: 2018,
            criador: 'Mike Flanagan',
            sinopse: 'Família confronta trauma de casa assombrada que habitaram na infância.',
            poster: 'https://image.tmdb.org/t/p/w500/6TXZ7DRxyXRmYFc14rIHWZSMKfO.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie5',
            titulo: 'Bates Motel',
            ano: 2013,
            criador: 'Carlton Cuse, Kerry Ehrin',
            sinopse: 'Prequel de Psicose mostrando juventude de Norman Bates.',
            poster: 'https://image.tmdb.org/t/p/w500/1dLyLTl4Ea5PFZnmSpEAqQYMqk7.jpg',
            temporadas: 5,
            streaming: 'Netflix, Prime Video',
            genero: 'Horror, Thriller'
        },
        {
            id: 'serie6',
            titulo: 'The Terror',
            ano: 2018,
            criador: 'David Kajganich',
            sinopse: 'Antologia sobre expedições históricas que encontraram o horror.',
            poster: 'https://image.tmdb.org/t/p/w500/7w0EtEh4aMfN2pNd4jNnP4lsFrO.jpg',
            temporadas: 2,
            streaming: 'Prime Video',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie7',
            titulo: 'Penny Dreadful',
            ano: 2014,
            criador: 'John Logan',
            sinopse: 'Personagens literários de terror se unem em Londres vitoriana.',
            poster: 'https://image.tmdb.org/t/p/w500/eWj5GBhsrCgJxNAeQPQj7DK3yHc.jpg',
            temporadas: 3,
            streaming: 'Paramount+',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie8',
            titulo: 'The Midnight Club',
            ano: 2022,
            criador: 'Mike Flanagan',
            sinopse: 'Jovens terminais contam histórias de terror em hospice à meia-noite.',
            poster: 'https://image.tmdb.org/t/p/w500/3NQSWMCM4LKZqcwqvuSXqMdmIqE.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie9',
            titulo: 'Marianne',
            ano: 2019,
            criador: 'Samuel Bodin',
            sinopse: 'Escritora de terror descobre que bruxa de seus livros é real.',
            poster: 'https://image.tmdb.org/t/p/w500/n4S0PJwvQPMU1cY0zEZhNzAXGA8.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror'
        },
        {
            id: 'serie10',
            titulo: 'Channel Zero',
            ano: 2016,
            criador: 'Nick Antosca',
            sinopse: 'Antologia baseada em creepypastas da internet.',
            poster: 'https://image.tmdb.org/t/p/w500/qzFmDq8KqL8FpTa6JBBR54a8hUC.jpg',
            temporadas: 4,
            streaming: 'Shudder',
            genero: 'Horror'
        },
        {
            id: 'serie11',
            titulo: 'Evil',
            ano: 2019,
            criador: 'Robert e Michelle King',
            sinopse: 'Psicóloga e padre investigam fenômenos inexplicáveis.',
            poster: 'https://image.tmdb.org/t/p/w500/wPvVyFp6BZwf0FyFCfGPiYWjDrg.jpg',
            temporadas: 4,
            streaming: 'Paramount+',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie12',
            titulo: 'Yellowjackets',
            ano: 2021,
            criador: 'Ashley Lyle, Bart Nickerson',
            sinopse: 'Time de futebol feminino sobrevive a acidente e seus segredos sombrios.',
            poster: 'https://image.tmdb.org/t/p/w500/kS0JkVrYuaKeOJrMNLtYJHCq07I.jpg',
            temporadas: 2,
            streaming: 'Paramount+',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie13',
            titulo: 'Chapelwaite',
            ano: 2021,
            criador: 'Peter e Jason Filardi',
            sinopse: 'Baseado em Stephen King, família enfrenta maldição ancestral.',
            poster: 'https://image.tmdb.org/t/p/w500/aKmRXqyLNRmTqF07w9JTxcEZPVz.jpg',
            temporadas: 1,
            streaming: 'Prime Video',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie14',
            titulo: 'From',
            ano: 2022,
            criador: 'John Griffin',
            sinopse: 'Cidade misteriosa prende visitantes e criaturas noturnas os caçam.',
            poster: 'https://image.tmdb.org/t/p/w500/cjXLrg4f4Fb29plorfCeTSWHmyn.jpg',
            temporadas: 3,
            streaming: 'Prime Video',
            genero: 'Horror, Mystery'
        },
        {
            id: 'serie15',
            titulo: 'The Outsider',
            ano: 2020,
            criador: 'Richard Price',
            sinopse: 'Investigação de assassinato revela forças sobrenaturais.',
            poster: 'https://image.tmdb.org/t/p/w500/eMTa6CWvUdzZDhwQJOcYPOG93yd.jpg',
            temporadas: 1,
            streaming: 'HBO Max',
            genero: 'Horror, Mystery'
        },
        {
            id: 'serie16',
            titulo: 'Archive 81',
            ano: 2022,
            criador: 'Rebecca Sonnenshine',
            sinopse: 'Arquivista descobre mistério sinistro ao restaurar fitas VHS.',
            poster: 'https://image.tmdb.org/t/p/w500/2NXADK6fDhxwQBPYPEZoiHJv0cJ.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Mystery'
        },
        {
            id: 'serie17',
            titulo: 'Servant',
            ano: 2019,
            criador: 'Tony Basgallop',
            sinopse: 'Casal contrata babá misteriosa após tragédia familiar.',
            poster: 'https://image.tmdb.org/t/p/w500/n4uZeYZtY1UWv3AEHTCB2R1YQIx.jpg',
            temporadas: 4,
            streaming: 'Apple TV+',
            genero: 'Horror, Thriller'
        },
        {
            id: 'serie18',
            titulo: 'Lovecraft Country',
            ano: 2020,
            criador: 'Misha Green',
            sinopse: 'Homem negro enfrenta racismo e terror lovecraftiano nos anos 50.',
            poster: 'https://image.tmdb.org/t/p/w500/6mIKHERADILbBBXbYg53lDwE1CQ.jpg',
            temporadas: 1,
            streaming: 'HBO Max',
            genero: 'Horror, Drama'
        },
        {
            id: 'serie19',
            titulo: 'Brand New Cherry Flavor',
            ano: 2021,
            criador: 'Nick Antosca, Lenore Zion',
            sinopse: 'Cineasta busca vingança com magia negra na Hollywood dos anos 90.',
            poster: 'https://image.tmdb.org/t/p/w500/qWzQQvHwnJBjT43NiKfqaXKnU68.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror'
        },
        {
            id: 'serie20',
            titulo: 'The Fall of the House of Usher',
            ano: 2023,
            criador: 'Mike Flanagan',
            sinopse: 'Família poderosa enfrenta consequências de pacto sombrio.',
            poster: 'https://image.tmdb.org/t/p/w500/2rl04pRCaGfz91lwfWdDQmOiGJp.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Drama',
            nota: 8.1
        },
        {
            id: 'serie21',
            titulo: 'Wednesday',
            ano: 2022,
            criador: 'Alfred Gough, Miles Millar',
            sinopse: 'Wednesday Addams investiga mistérios sobrenaturais em escola peculiar.',
            poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
            temporadas: 2,
            streaming: 'Netflix',
            genero: 'Horror, Comédia',
            nota: 8.5
        },
        {
            id: 'serie22',
            titulo: 'The Watcher',
            ano: 2022,
            criador: 'Ryan Murphy, Ian Brennan',
            sinopse: 'Família recebe cartas ameaçadoras de observador anônimo em nova casa.',
            poster: 'https://image.tmdb.org/t/p/w500/6RrseODZo2e66XOzC1XMzMuecnf.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Thriller',
            nota: 7.3
        },
        {
            id: 'serie23',
            titulo: 'Midnight Mass',
            ano: 2021,
            criador: 'Mike Flanagan',
            sinopse: 'Comunidade isolada experimenta eventos miraculosos e sinistros.',
            poster: 'https://image.tmdb.org/t/p/w500/iYoMZYVD775CQRqCcGbD8nZcLqP.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Drama',
            nota: 7.7
        },
        {
            id: 'serie24',
            titulo: 'The Haunting of Bly Manor',
            ano: 2020,
            criador: 'Mike Flanagan',
            sinopse: 'Babá cuida de crianças em mansão inglesa assombrada por fantasmas.',
            poster: 'https://image.tmdb.org/t/p/w500/vIXQ85eeJtSld9nR6aq58gDdmbI.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Romance',
            nota: 7.4
        },
        {
            id: 'serie25',
            titulo: 'Chucky',
            ano: 2021,
            criador: 'Don Mancini',
            sinopse: 'Boneco assassino Chucky retorna para aterrorizar nova cidade.',
            poster: 'https://image.tmdb.org/t/p/w500/kY0BogCM8SkNJ0MNiHB3VTM86Tz.jpg',
            temporadas: 3,
            streaming: 'Paramount+',
            genero: 'Horror, Comédia',
            nota: 7.5
        },
        {
            id: 'serie26',
            titulo: 'Evil Dead Rise',
            ano: 2023,
            criador: 'Lee Cronin',
            sinopse: 'Irmãs enfrentam demônios em prédio de Los Angeles.',
            poster: 'https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg',
            temporadas: 1,
            streaming: 'HBO Max',
            genero: 'Horror',
            nota: 6.8
        },
        {
            id: 'serie27',
            titulo: 'The Last of Us',
            ano: 2023,
            criador: 'Craig Mazin, Neil Druckmann',
            sinopse: 'Sobrevivente e jovem atravessam América pós-apocalíptica.',
            poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
            temporadas: 2,
            streaming: 'HBO Max',
            genero: 'Horror, Drama',
            nota: 8.8
        },
        {
            id: 'serie28',
            titulo: 'Goosebumps',
            ano: 2023,
            criador: 'Rob Letterman, Nicholas Stoller',
            sinopse: 'Adolescentes liberam criaturas dos livros de R.L. Stine.',
            poster: 'https://image.tmdb.org/t/p/w500/fPNJBt1r8YqHLjJPGlb0Q5JQNK7.jpg',
            temporadas: 1,
            streaming: 'Disney+',
            genero: 'Horror, Aventura',
            nota: 7.2
        },
        {
            id: 'serie29',
            titulo: 'The Changeling',
            ano: 2023,
            criador: 'Kelly Marcel',
            sinopse: 'Pai descobre segredos sombrios sobre esposa e filho.',
            poster: 'https://image.tmdb.org/t/p/w500/sn24UmYl3FeZ1JVCqxjqvh6Yiyv.jpg',
            temporadas: 1,
            streaming: 'Apple TV+',
            genero: 'Horror, Fantasia',
            nota: 7.0
        },
        {
            id: 'serie30',
            titulo: 'Shining Vale',
            ano: 2022,
            criador: 'Sharon Horgan, Jeff Astrof',
            sinopse: 'Família se muda para casa assombrada ou mãe está enlouquecendo?',
            poster: 'https://image.tmdb.org/t/p/w500/cHgPHYhqNlGsMAHOsIjkZ6ek4yj.jpg',
            temporadas: 2,
            streaming: 'Paramount+',
            genero: 'Horror, Comédia',
            nota: 6.9
        },
        {
            id: 'serie31',
            titulo: 'Invasion',
            ano: 2021,
            criador: 'Simon Kinberg, David Weil',
            sinopse: 'Invasão alienígena vista através de múltiplas perspectivas globais.',
            poster: 'https://image.tmdb.org/t/p/w500/q5PlkescqNqHE41e2ykDPKMpazk.jpg',
            temporadas: 2,
            streaming: 'Apple TV+',
            genero: 'Horror, Sci-Fi',
            nota: 6.7
        },
        {
            id: 'serie32',
            titulo: '1899',
            ano: 2022,
            criador: 'Baran bo Odar, Jantje Friese',
            sinopse: 'Imigrantes em navio a vapor encontram mistério em alto-mar.',
            poster: 'https://image.tmdb.org/t/p/w500/hNdwlXjD2aNyN9C0Hfx5QpuNs7J.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Mystery',
            nota: 7.5
        },
        {
            id: 'serie33',
            titulo: 'Cabinet of Curiosities',
            ano: 2022,
            criador: 'Guillermo del Toro',
            sinopse: 'Antologia de contos macabros selecionados por del Toro.',
            poster: 'https://image.tmdb.org/t/p/w500/kEoWt9TBzuXfPkW3BLmqMh0pHBY.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror',
            nota: 7.3
        },
        {
            id: 'serie34',
            titulo: 'The Bastard Son & The Devil Himself',
            ano: 2022,
            criador: 'Joe Barton',
            sinopse: 'Jovem bruxo foge de pai maligno e descobre seus poderes.',
            poster: 'https://image.tmdb.org/t/p/w500/ifzMBhKZF5pPRPYMymNjSYd57Ej.jpg',
            temporadas: 1,
            streaming: 'Netflix',
            genero: 'Horror, Fantasia',
            nota: 7.6
        },
        {
            id: 'serie35',
            titulo: 'Castle Rock',
            ano: 2018,
            criador: 'Sam Shaw, Dustin Thomason',
            sinopse: 'Antologia baseada no universo de Stephen King.',
            poster: 'https://image.tmdb.org/t/p/w500/6DNXmkJr7WosxIE39Wkbdpb3YVu.jpg',
            temporadas: 2,
            streaming: 'HBO Max',
            genero: 'Horror, Drama',
            nota: 7.5
        }
    ];
}

// Initialize series data
let seriesData = [];

// Load series on page load
async function initializeSeries() {
    try {
        seriesData = await fetchHorrorSeries();
        console.log('Series initialized:', seriesData.length);
    } catch (error) {
        console.error('Error initializing series:', error);
        seriesData = getFallbackSeries();
    }
}
