// TMDB API Integration for Horror TV Series
// This file fetches series dynamically from TMDB API

// Cache for API results
let seriesCache = null;
let seriesCacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch horror series from TMDB API
async function fetchHorrorSeries() {
    // Check if API key is configured
    if (!API_CONFIG.TMDB.API_KEY || API_CONFIG.TMDB.API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
        console.warn('TMDB API key not configured. Using fallback data.');
        return getFallbackSeries();
    }

    // Check cache first
    if (seriesCache && seriesCacheTimestamp && (Date.now() - seriesCacheTimestamp) < CACHE_DURATION) {
        console.log('Returning series from cache');
        return seriesCache;
    }

    try {
        console.log('Fetching horror series from TMDB API...');
        
        // Mystery & Sci-Fi Fantasy genres also work well for horror series
        // 10759 = Action & Adventure, 9648 = Mystery, 10765 = Sci-Fi & Fantasy
        const horrorGenres = '10765,9648';
        
        // Fetch multiple pages to get more series
        const promises = [];
        for (let page = 1; page <= 2; page++) {
            const url = buildApiUrl(API_CONFIG.TMDB.BASE_URL, '/discover/tv', {
                api_key: API_CONFIG.TMDB.API_KEY,
                with_genres: horrorGenres,
                with_keywords: '9663|4458|9951|180547', // horror, supernatural, gore, survival horror keywords
                sort_by: 'vote_average.desc',
                'vote_count.gte': 100,
                page: page,
                language: 'pt-BR'
            });
            
            promises.push(apiFetch(url));
        }

        const results = await Promise.all(promises);
        
        // Combine and process results
        const allSeries = results.flatMap(result => result.results || []);
        
        console.log(`Fetched ${allSeries.length} series from TMDB`);
        
        // Map TMDB data to our format
        seriesCache = allSeries.map((series, index) => {
            const ano = series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A';
            
            // Simplify streaming info (would need additional endpoints for accurate data)
            let streaming = [];
            if (series.popularity > 100) streaming.push('Netflix');
            if (series.vote_average > 7.5) streaming.push('Amazon Prime');
            if (ano >= 2020) streaming.push('Max');
            if (streaming.length === 0) streaming = ['Vários'];

            return {
                id: `serie-${series.id}`,
                titulo: series.name,
                ano: ano,
                criador: 'Various', // Would need /tv/{id}/credits endpoint
                sinopse: series.overview || 'No description available.',
                poster: getTMDBImageUrl(series.poster_path, 'poster'),
                backdrop: getTMDBImageUrl(series.backdrop_path, 'backdrop'),
                temporadas: series.number_of_seasons || 'N/A',
                streaming: streaming.join(', '),
                genero: 'Horror/Mystery',
                nota: series.vote_average ? parseFloat(series.vote_average.toFixed(1)) : 7.0,
                votos: series.vote_count,
                tmdb_id: series.id,
                popularidade: series.popularity
            };
        });

        seriesCacheTimestamp = Date.now();
        console.log('Series cached successfully');
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
            streaming: 'Netflix, Amazon Prime',
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
            streaming: 'Netflix, Amazon Prime',
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
            streaming: 'Amazon Prime',
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
            streaming: 'Amazon Prime',
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
            streaming: 'Amazon Prime',
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
            streaming: 'Max',
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
            streaming: 'Max',
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
            genero: 'Horror, Drama'
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
