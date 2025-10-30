// TMDB API Integration for Horror Movies
// This file fetches movies dynamically from TMDB API

// Cache for API results
let moviesCache = null;
let moviesCacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch horror movies from TMDB API
async function fetchHorrorMovies() {
    // Check if API key is configured
    if (!API_CONFIG.TMDB.API_KEY || API_CONFIG.TMDB.API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
        console.warn('TMDB API key not configured. Using fallback data.');
        return getFallbackMovies();
    }

    // Check cache first
    if (moviesCache && moviesCacheTimestamp && (Date.now() - moviesCacheTimestamp) < CACHE_DURATION) {
        console.log('Returning movies from cache');
        return moviesCache;
    }

    try {
        console.log('Fetching horror movies from TMDB API...');
        
        // Horror genre ID in TMDB is 27
        const horrorGenreId = 27;
        
        // Fetch multiple pages to get more movies
        const promises = [];
        for (let page = 1; page <= 3; page++) {
            const url = buildApiUrl(API_CONFIG.TMDB.BASE_URL, '/discover/movie', {
                api_key: API_CONFIG.TMDB.API_KEY,
                with_genres: horrorGenreId,
                sort_by: 'vote_average.desc',
                'vote_count.gte': 500, // Minimum votes for quality
                page: page,
                language: 'pt-BR'
            });
            
            promises.push(apiFetch(url));
        }

        const results = await Promise.all(promises);
        
        // Combine and process results
        const allMovies = results.flatMap(result => result.results || []);
        
        console.log(`Fetched ${allMovies.length} movies from TMDB`);
        
        // Map TMDB data to our format
        moviesCache = allMovies.map((movie, index) => {
            // Get director from credits (would need additional API call, using simplified approach)
            const ano = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
            
            // Determine decade
            let decada = '';
            if (ano !== 'N/A') {
                if (ano >= 2020) decada = '2020s';
                else if (ano >= 2010) decada = '2010s';
                else if (ano >= 2000) decada = '2000s';
                else if (ano >= 1990) decada = '1990s';
                else if (ano >= 1980) decada = '1980s';
                else if (ano >= 1970) decada = '1970s';
                else decada = 'Clássicos';
            }

            // Determine type (modern vs classic)
            const tipo = ano >= 2000 ? 'Moderno' : 'Clássico';

            return {
                id: `movie-${movie.id}`,
                titulo: movie.title,
                ano: ano,
                diretor: 'Various', // Would need /movie/{id}/credits endpoint
                sinopse: movie.overview || 'No description available.',
                poster: getTMDBImageUrl(movie.poster_path, 'poster'),
                backdrop: getTMDBImageUrl(movie.backdrop_path, 'backdrop'),
                decada: decada,
                tipo: tipo,
                genero: 'Horror',
                nota: movie.vote_average ? parseFloat(movie.vote_average.toFixed(1)) : 7.0,
                votos: movie.vote_count,
                tmdb_id: movie.id,
                popularidade: movie.popularity
            };
        });

        moviesCacheTimestamp = Date.now();
        console.log('Movies cached successfully');
        return moviesCache;

    } catch (error) {
        console.error('Error fetching movies from TMDB:', error);
        return getFallbackMovies();
    }
}

// Fallback hardcoded movies in case API fails
function getFallbackMovies() {
    console.log('Using fallback movie data');
    return [
        {
            id: 'filme1',
            titulo: 'O Exorcista',
            ano: 1973,
            diretor: 'William Friedkin',
            sinopse: 'Uma mãe desesperada busca ajuda de dois padres para salvar sua filha de uma possessão demoníaca.',
            poster: 'https://image.tmdb.org/t/p/w500/5x0CeVHJI8tcDx8tUUwYHQSNILq.jpg',
            decada: '1970s',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme2',
            titulo: 'Hereditário',
            ano: 2018,
            diretor: 'Ari Aster',
            sinopse: 'Uma família lida com segredos sombrios e forças sobrenaturais após a morte da matriarca.',
            poster: 'https://image.tmdb.org/t/p/w500/p5pEJAgiWeb2DPGcWrQi9Rc9Cq9.jpg',
            decada: '2010s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme3',
            titulo: 'O Iluminado',
            ano: 1980,
            diretor: 'Stanley Kubrick',
            sinopse: 'Um escritor aceita trabalho como zelador de hotel isolado durante o inverno, levando sua família à loucura.',
            poster: 'https://image.tmdb.org/t/p/w500/b6ko0IKC8MdYBBPkkA1aBPLe2yz.jpg',
            decada: '1980s',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme4',
            titulo: 'A Bruxa',
            ano: 2015,
            diretor: 'Robert Eggers',
            sinopse: 'Em 1630, uma família puritana enfrenta forças malignas na Nova Inglaterra.',
            poster: 'https://image.tmdb.org/t/p/w500/cCN7LFHSgmg6kNdRAZ4dIrIv9RK.jpg',
            decada: '2010s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme5',
            titulo: 'A Noite dos Mortos-Vivos',
            ano: 1968,
            diretor: 'George A. Romero',
            sinopse: 'Sobreviventes se refugiam em uma casa durante um apocalipse zumbi.',
            poster: 'https://image.tmdb.org/t/p/w500/inNUOa9WZGdyRXQlt7eqmHtCttl.jpg',
            decada: 'Clássicos',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme6',
            titulo: 'Midsommar',
            ano: 2019,
            diretor: 'Ari Aster',
            sinopse: 'Um casal em crise viaja para festival sueco que acontece a cada 90 anos, revelando rituais perturbadores.',
            poster: 'https://image.tmdb.org/t/p/w500/9Z4gS3TkD9H4RqYLPWp4BLnJjYE.jpg',
            decada: '2010s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme7',
            titulo: 'Halloween',
            ano: 1978,
            diretor: 'John Carpenter',
            sinopse: 'Michael Myers escapa do manicômio e retorna à sua cidade natal para matar.',
            poster: 'https://image.tmdb.org/t/p/w500/igm0F6ka6vLRydH0P8jU8m9FP0R.jpg',
            decada: '1970s',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme8',
            titulo: 'Invocação do Mal',
            ano: 2013,
            diretor: 'James Wan',
            sinopse: 'Investigadores paranormais Ed e Lorraine Warren ajudam família aterrorizada por presença sombria.',
            poster: 'https://image.tmdb.org/t/p/w500/6xsDI4WFrZwyDirbH7nVxZJ5UF1.jpg',
            decada: '2010s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme9',
            titulo: 'Psicose',
            ano: 1960,
            diretor: 'Alfred Hitchcock',
            sinopse: 'Mulher em fuga encontra motel isolado administrado por jovem perturbado e sua mãe.',
            poster: 'https://image.tmdb.org/t/p/w500/iIdJqFdqXS5fdt6jOlUSEElCWkA.jpg',
            decada: 'Clássicos',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme10',
            titulo: 'Corra!',
            ano: 2017,
            diretor: 'Jordan Peele',
            sinopse: 'Jovem visita família da namorada e descobre segredos perturbadores.',
            poster: 'https://image.tmdb.org/t/p/w500/gLhHHZUzeseRXShoDyC4VqLgsNv.jpg',
            decada: '2010s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme11',
            titulo: 'O Massacre da Serra Elétrica',
            ano: 1974,
            diretor: 'Tobe Hooper',
            sinopse: 'Grupo de amigos encontra família de canibais no Texas.',
            poster: 'https://image.tmdb.org/t/p/w500/w8xLlkr7bTk5dMNwJpZmIbGZIxw.jpg',
            decada: '1970s',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme12',
            titulo: 'It: A Coisa',
            ano: 2017,
            diretor: 'Andy Muschietti',
            sinopse: 'Grupo de crianças enfrenta entidade maligna que assume forma de palhaço.',
            poster: 'https://image.tmdb.org/t/p/w500/i1JJJlB6SjZADEWHwYPHoUGKxrS.jpg',
            decada: '2010s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme13',
            titulo: 'Alien: O Oitavo Passageiro',
            ano: 1979,
            diretor: 'Ridley Scott',
            sinopse: 'Tripulação de nave espacial enfrenta criatura alienígena mortal.',
            poster: 'https://image.tmdb.org/t/p/w500/jVKVKyAP2rJ4nWV5WVEPJUMc0wP.jpg',
            decada: '1970s',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme14',
            titulo: 'A Hora do Pesadelo',
            ano: 1984,
            diretor: 'Wes Craven',
            sinopse: 'Adolescentes são caçados em seus sonhos por Freddy Krueger.',
            poster: 'https://image.tmdb.org/t/p/w500/kZzE9jdjO63M0rYXHp1a6MAg3bR.jpg',
            decada: '1980s',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme15',
            titulo: 'Atividade Paranormal',
            ano: 2007,
            diretor: 'Oren Peli',
            sinopse: 'Casal instala câmeras em casa para documentar atividade sobrenatural.',
            poster: 'https://image.tmdb.org/t/p/w500/rxuFWBQ3fW3GJWa01tTXzTN7fDt.jpg',
            decada: '2000s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme16',
            titulo: 'Scream',
            ano: 1996,
            diretor: 'Wes Craven',
            sinopse: 'Assassino mascarado aterroriza cidade seguindo regras de filmes de terror.',
            poster: 'https://image.tmdb.org/t/p/w500/7OyKUmT9Lj0bMLEvdQ8HlAeN6p1.jpg',
            decada: '1990s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme17',
            titulo: 'Sinfonia da Necrópole',
            ano: 2024,
            diretor: 'Rodrigo Aragão',
            sinopse: 'Terror brasileiro sobre médico que descobre segredos em necrotério.',
            poster: 'https://image.tmdb.org/t/p/w500/hMjrKPXYZjWvHMZN0YYqHqKgZ8A.jpg',
            decada: '2020s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme18',
            titulo: 'O Farol',
            ano: 2019,
            diretor: 'Robert Eggers',
            sinopse: 'Dois faroleiros lutam contra sanidade em ilha isolada.',
            poster: 'https://image.tmdb.org/t/p/w500/vjEJSOD1fjpjSMIHlwHHnLZPDFz.jpg',
            decada: '2010s',
            tipo: 'Moderno',
            genero: 'Horror'
        },
        {
            id: 'filme19',
            titulo: 'Carrie: A Estranha',
            ano: 1976,
            diretor: 'Brian De Palma',
            sinopse: 'Adolescente com poderes telecinéticos se vinga de seus atormentadores.',
            poster: 'https://image.tmdb.org/t/p/w500/uc3OvgmbnYaS5Y0BOjSmC1EmSz4.jpg',
            decada: '1970s',
            tipo: 'Clássico',
            genero: 'Horror'
        },
        {
            id: 'filme20',
            titulo: 'Longlegs',
            ano: 2024,
            diretor: 'Osgood Perkins',
            sinopse: 'Agente do FBI caça serial killer ocultista em thriller psicológico.',
            poster: 'https://image.tmdb.org/t/p/w500/8CPF7Q7F9tLfEjbbXGwHpxg6qLC.jpg',
            decada: '2020s',
            tipo: 'Moderno',
            genero: 'Horror'
        }
    ];
}

// Initialize movies data
let filmesData = [];

// Load movies on page load
async function initializeMovies() {
    try {
        filmesData = await fetchHorrorMovies();
        console.log('Movies initialized:', filmesData.length);
    } catch (error) {
        console.error('Error initializing movies:', error);
        filmesData = getFallbackMovies();
    }
}
