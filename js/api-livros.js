// Open Library API Integration for Horror Books
// This file fetches books dynamically from Open Library API

// Cache for API results to avoid excessive requests
let booksCache = null;
let cacheTimestamp = null;
const LIVRO_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Helper function to normalize titles for comparison
function normalizeTitle(title) {
    return title.toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Remove punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
        .replace(/\bdr\b|\bmr\b|\bmrs\b|\bms\b/g, '') // Remove titles
        .trim();
}

// Title translation dictionary (English to Portuguese)
function translateTitleToPortuguese(englishTitle) {
    const translations = {
        // Books that should NOT be translated (keep original)
        'Stuart Little': 'Stuart Little',
        'The Wonderful Visit': 'A Visita Maravilhosa',
        'Brood of the Witch-Queen': 'A Ninhada da Rainha Bruxa',
        'The White People': 'As Pessoas Brancas',
        
        // Stephen King
        'The Shining': 'O Iluminado',
        'It': 'It: A Coisa',
        'Pet Sematary': 'Cemitério Maldito',
        'Pet Cemetery': 'Cemitério Maldito',
        'Carrie': 'Carrie, a Estranha',
        'The Stand': 'A Dança da Morte',
        'Salem\'s Lot': 'A Hora do Vampiro',
        'Misery': 'Louca Obsessão',
        'The Dead Zone': 'A Zona Morta',
        'Cujo': 'Cujo',
        'Christine': 'Christine',
        'Firestarter': 'A Incendiária',
        'The Green Mile': 'À Espera de um Milagre',
        'Bag of Bones': 'Saco de Ossos',
        'The Dark Half': 'Metade Sombria',
        'Needful Things': 'Coisas Necessárias',
        'Gerald\'s Game': 'Jogos Pérfidos',
        'Dolores Claiborne': 'Dolores Claiborne',
        'The Girl Who Loved Tom Gordon': 'A Menina Que Amava Tom Gordon',
        'Thinner': 'O Ataque',
        
        // Classic Horror
        'Dracula': 'Drácula',
        'Frankenstein': 'Frankenstein',
        'Frankenstein; or, The Modern Prometheus': 'Frankenstein',
        'Frankenstein or The Modern Prometheus': 'Frankenstein',
        'The Strange Case of Dr Jekyll and Mr Hyde': 'O Médico e o Monstro',
        'The Strange Case of Dr. Jekyll and Mr. Hyde': 'O Médico e o Monstro',
        'Strange Case of Dr Jekyll and Mr Hyde': 'O Médico e o Monstro',
        'Dr Jekyll and Mr Hyde': 'O Médico e o Monstro',
        'Jekyll and Hyde': 'O Médico e o Monstro',
        'The Picture of Dorian Gray': 'O Retrato de Dorian Gray',
        'The Invisible Man': 'O Homem Invisível',
        'The Island of Doctor Moreau': 'A Ilha do Dr. Moreau',
        'The Island of Dr Moreau': 'A Ilha do Dr. Moreau',
        'The Turn of the Screw': 'A Volta do Parafuso',
        'The Phantom of the Opera': 'O Fantasma da Ópera',
        'The Monk': 'O Monge',
        'The Castle of Otranto': 'O Castelo de Otranto',
        'The Mysteries of Udolpho': 'Os Mistérios de Udolpho',
        'The Legend of Sleepy Hollow': 'A Lenda do Cavaleiro Sem Cabeça',
        'The Tell-Tale Heart': 'O Coração Delator',
        'The Fall of the House of Usher': 'A Queda da Casa de Usher',
        'The Raven': 'O Corvo',
        'The Masque of the Red Death': 'A Máscara da Morte Rubra',
        
        // H.P. Lovecraft
        'The Call of Cthulhu': 'O Chamado de Cthulhu',
        'At the Mountains of Madness': 'Nas Montanhas da Loucura',
        'The Shadow over Innsmouth': 'A Sombra de Innsmouth',
        'The Dunwich Horror': 'O Horror de Dunwich',
        'The Colour Out of Space': 'A Cor que Caiu do Espaço',
        'The Whisperer in Darkness': 'O Sussurrador nas Trevas',
        'The Shadow Out of Time': 'A Sombra Vinda do Tempo',
        'The Dreams in the Witch House': 'Os Sonhos na Casa da Bruxa',
        'The Rats in the Walls': 'Os Ratos nas Paredes',
        'The Music of Erich Zann': 'A Música de Erich Zann',
        'Herbert West–Reanimator': 'Herbert West - Reanimador',
        'Reanimator': 'Reanimador',
        
        // Modern Horror
        'The Exorcist': 'O Exorcista',
        'Rosemary\'s Baby': 'O Bebê de Rosemary',
        'The Haunting of Hill House': 'A Assombração da Casa da Colina',
        'I Am Legend': 'Eu Sou a Lenda',
        'Psycho': 'Psicose',
        'The Silence of the Lambs': 'O Silêncio dos Inocentes',
        'American Psycho': 'Psicopata Americano',
        'The Amityville Horror': 'Horror em Amityville',
        'Hell House': 'A Casa Infernal',
        'Ghost Story': 'História de Fantasmas',
        'The Other': 'O Outro',
        'The Shining Girls': 'As Garotas Luminosas',
        'Mexican Gothic': 'Gótico Mexicano',
        'The Ruins': 'As Ruínas',
        'The Terror': 'O Terror',
        'The Witching Hour': 'A Hora das Bruxas',
        'The Historian': 'A Historiadora',
        
        // Other Notable Works
        'House of Leaves': 'Casa de Folhas',
        'Bird Box': 'Caixa de Pássaros',
        'The Road': 'A Estrada',
        'World War Z': 'Guerra Mundial Z',
        'Interview with the Vampire': 'Entrevista com o Vampiro',
        'Let the Right One In': 'Deixe Ela Entrar',
        'The Ritual': 'O Ritual',
        'The Troop': 'A Tropa',
        'Heart-Shaped Box': 'Caixa em Forma de Coração',
        'The Fisherman': 'O Pescador',
        'The Cabin at the End of the World': 'A Cabana no Fim do Mundo',
        'The Southern Book Club\'s Guide to Slaying Vampires': 'O Guia do Clube do Livro Sulista para Matar Vampiros',
        'Ring': 'O Chamado',
        'Dark Matter': 'Matéria Escura',
        'The Woman in Black': 'A Mulher de Preto',
        'The Little Stranger': 'O Pequeno Estranho',
        'We Have Always Lived in the Castle': 'Sempre Vivemos no Castelo',
        'Rebecca': 'Rebecca',
        'Coraline': 'Coraline',
        'The Graveyard Book': 'O Livro do Cemitério',
        'Something Wicked This Way Comes': 'Este Lado das Trevas',
        
        // Japanese Horror
        'Battle Royale': 'Battle Royale',
        'Audition': 'Audição',
        'Spiral': 'Espiral',
        
        // Zombies & Post-Apocalyptic
        'The Girl with All the Gifts': 'A Menina com Todos os Dons',
        'Zone One': 'Zona Um',
        'The Passage': 'A Passagem',
        'The Twelve': 'Os Doze',
        'The City of Mirrors': 'A Cidade dos Espelhos',
        
        // Vampires & Werewolves
        'The Vampire Chronicles': 'As Crônicas Vampirescas',
        'The Historian': 'A Historiadora',
        'Fevre Dream': 'Sonho Febril',
        'Those Across the River': 'Aqueles do Outro Lado do Rio',
        'The Wolfman': 'O Lobisomem',
        
        // Gothic & Classic
        'Wuthering Heights': 'O Morro dos Ventos Uivantes',
        'Jane Eyre': 'Jane Eyre',
        'The Woman in White': 'A Mulher de Branco',
        'The Moonstone': 'A Pedra da Lua'
    };
    
    // Try exact match first
    if (translations[englishTitle]) {
        return translations[englishTitle];
    }
    
    // Try case-insensitive exact match
    const lowerTitle = englishTitle.toLowerCase();
    for (const [eng, por] of Object.entries(translations)) {
        if (lowerTitle === eng.toLowerCase()) {
            return por;
        }
    }
    
    // Try normalized matching (removes punctuation, extra spaces, titles like Dr., Mr.)
    const normalizedInput = normalizeTitle(englishTitle);
    for (const [eng, por] of Object.entries(translations)) {
        const normalizedKey = normalizeTitle(eng);
        if (normalizedInput === normalizedKey) {
            return por;
        }
    }
    
    // Try partial matching for compound titles (but not for very short titles)
    const inputWords = normalizedInput.split(/\s+/);
    
    // Skip partial matching for single-word titles or titles with very short words
    if (inputWords.length > 1 && inputWords.every(w => w.length >= 3)) {
        for (const [eng, por] of Object.entries(translations)) {
            const normalizedKey = normalizeTitle(eng);
            const keyWords = normalizedKey.split(/\s+/);
            
            // Skip matching keys that are too short (like "it")
            if (keyWords.length === 1 && keyWords[0].length < 3) {
                continue;
            }
            
            // If the normalized key matches a significant portion, use it
            if (normalizedInput.includes(normalizedKey) || normalizedKey.includes(normalizedInput)) {
                // Make sure it's a significant match (more than 60% of the shorter string)
                const matchLength = Math.max(
                    normalizedInput.split(' ').filter(word => normalizedKey.includes(word)).length,
                    normalizedKey.split(' ').filter(word => normalizedInput.includes(word)).length
                );
                if (matchLength >= Math.ceil(normalizedKey.split(' ').length * 0.6)) {
                    return por;
                }
            }
        }
    }
    
    // If no translation found, try to translate common English words
    return translateCommonWords(englishTitle);
}

// Translate common English words to Portuguese for unknown titles
function translateCommonWords(title) {
    const wordTranslations = {
        'the': '',
        'a': 'um/uma',
        'an': 'um/uma',
        'of': 'de',
        'and': 'e',
        'or': 'ou',
        'in': 'em',
        'on': 'sobre',
        'at': 'em',
        'to': 'para',
        'for': 'para',
        'with': 'com',
        'by': 'por',
        'from': 'de',
        'about': 'sobre',
        'tales': 'contos',
        'tale': 'conto',
        'story': 'história',
        'stories': 'histórias',
        'book': 'livro',
        'books': 'livros',
        'night': 'noite',
        'dark': 'escuro',
        'darkness': 'escuridão',
        'death': 'morte',
        'dead': 'morto',
        'ghost': 'fantasma',
        'ghosts': 'fantasmas',
        'witch': 'bruxa',
        'witches': 'bruxas',
        'monster': 'monstro',
        'monsters': 'monstros',
        'creature': 'criatura',
        'house': 'casa',
        'castle': 'castelo',
        'blood': 'sangue',
        'shadow': 'sombra',
        'shadows': 'sombras',
        'curse': 'maldição',
        'horror': 'horror',
        'terror': 'terror',
        'nightmare': 'pesadelo',
        'haunted': 'assombrado',
        'haunting': 'assombração'
    };
    
    let words = title.split(' ');
    let translated = words.map(word => {
        const lower = word.toLowerCase().replace(/[^\w]/g, '');
        return wordTranslations[lower] || word;
    });
    
    // Clean up empty translations and extra spaces
    return translated.filter(w => w && w !== '').join(' ').trim();
}

// Fetch horror books from Open Library API
async function fetchHorrorBooks() {
    // Check cache first
    if (booksCache && cacheTimestamp && (Date.now() - cacheTimestamp) < LIVRO_CACHE_DURATION) {
        console.log('Returning books from cache');
        return booksCache;
    }

    try {
        console.log('Fetching horror books from Open Library API...');
        
        // Fetch horror books using Subjects API
        const subjects = ['horror', 'horror_tales', 'gothic_horror', 'supernatural'];
        const promises = [];
        
        // Fetch books from different horror subjects
        for (const subject of subjects) {
            const url = `https://openlibrary.org/subjects/${subject}.json?limit=50`;
            promises.push(
                fetch(url, {
                    headers: {
                        'User-Agent': 'HallowTales/1.0 (hallowtales@example.com)'
                    }
                }).then(res => res.json())
            );
        }

        const results = await Promise.all(promises);
        
        // Combine and process results
        const allBooks = results.flatMap(result => result.works || []);
        
        console.log(`Fetched ${allBooks.length} books from Open Library`);
        
        // Remove duplicates by key
        const uniqueBooks = [];
        const seenKeys = new Set();
        
        for (const book of allBooks) {
            if (book.key && !seenKeys.has(book.key)) {
                seenKeys.add(book.key);
                uniqueBooks.push(book);
            }
        }
        
        // Map Open Library data to our format
        booksCache = uniqueBooks.slice(0, 100).map((book, index) => {
            const originalTitle = book.title || 'Título Desconhecido';
            
            // Translate title to Portuguese if it's a known classic
            let titulo = translateTitleToPortuguese(originalTitle) || originalTitle;
            
            // Get description - prioritize full description over first sentence
            let sinopse = '';
            if (book.description) {
                sinopse = typeof book.description === 'string' 
                    ? book.description 
                    : book.description.value;
            } else if (book.first_sentence) {
                sinopse = Array.isArray(book.first_sentence) 
                    ? book.first_sentence.join(' ') 
                    : book.first_sentence;
            }
            
            // If no description, create a generic one
            if (!sinopse || sinopse.trim() === '') {
                sinopse = `Uma obra de horror ${book.first_publish_year ? `publicada em ${book.first_publish_year}` : 'clássica'} que explora temas sombrios e atmosferas perturbadoras. ${book.authors?.[0]?.name ? `Escrita por ${book.authors[0].name}, ` : ''}esta história cativa leitores com sua narrativa envolvente e elementos assustadores.`;
            }
            
            // Truncate if too long
            if (sinopse.length > 400) {
                sinopse = sinopse.substring(0, 397) + '...';
            }

            // Get cover image
            let capa = 'https://via.placeholder.com/300x450/1a0033/00ff00?text=Sem+Capa';
            if (book.cover_id) {
                capa = `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
            } else if (book.cover_edition_key) {
                capa = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;
            }

            // Get authors
            const autores = book.authors?.map(a => a.name).join(', ') || 'Autor Desconhecido';

            // Get year from first publish date
            let ano = 'N/A';
            if (book.first_publish_year) {
                ano = book.first_publish_year;
            }

            return {
                id: book.key.replace('/works/', ''),
                titulo: titulo,
                tituloOriginal: originalTitle, // Store original English title for search
                autor: autores,
                ano: ano,
                sinopse: sinopse,
                capa: capa,
                categoria: 'Horror',
                open_library_key: book.key,
                edition_count: book.edition_count || 0,
                tipo: 'api',
                previewLink: `https://openlibrary.org${book.key}`
            };
        });

        cacheTimestamp = Date.now();
        console.log(`${booksCache.length} unique books cached successfully`);
        return booksCache;

    } catch (error) {
        console.error('Error fetching books from Open Library:', error);
        
        // Return empty array if API fails
        return [];
    }
}

// Get recommended (fallback) horror books
function getRecommendedBooks() {
    console.log('Loading recommended books');
    return [
        {
            id: 'o-iluminado',
            titulo: "O Iluminado",
            autor: "Stephen King",
            ano: 1977,
            editora: "Suma",
            sinopse: "Jack Torrance, um aspirante a escritor e alcoólatra em recuperação, aceita um emprego como zelador de inverno no isolado Hotel Overlook, nas montanhas do Colorado. Ele se muda com sua esposa, Wendy, e seu filho, Danny, que possui 'o brilho', uma habilidade psíquica. O hotel, assombrado por eventos passados, exerce uma influência malévola sobre Jack, levando-o à loucura e violência.",
            capa: "https://covers.openlibrary.org/b/isbn/0385121679-L.jpg",
            categoria: "Horror, Sobrenatural",
            nota: 9.5,
            tipo: 'recomendado'
        },
        {
            id: 'dracula',
            titulo: "Drácula",
            autor: "Bram Stoker",
            ano: 1897,
            editora: "Darkside",
            sinopse: "O romance narra a história do Conde Drácula, um vampiro da Transilvânia que se muda para a Inglaterra em busca de sangue novo e para espalhar sua maldição. Um pequeno grupo, liderado pelo Professor Abraham Van Helsing, luta para detê-lo.",
            capa: "https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg",
            categoria: "Horror, Vampiros",
            nota: 9.3,
            tipo: 'recomendado'
        },
        {
            id: 'frankenstein',
            titulo: "Frankenstein",
            autor: "Mary Shelley",
            ano: 1818,
            editora: "Darkside",
            sinopse: "Victor Frankenstein, um jovem cientista, cria uma criatura grotesca em um experimento científico pouco ortodoxo. Horrorizado com sua criação, Victor a abandona. A criatura, rejeitada pela sociedade, busca vingança contra seu criador.",
            capa: "https://covers.openlibrary.org/b/isbn/0486282112-L.jpg",
            categoria: "Horror, Ficção Científica",
            nota: 9.2,
            tipo: 'recomendado'
        },
        {
            id: 'o-exorcista',
            titulo: "O Exorcista",
            autor: "William Peter Blatty",
            ano: 1971,
            editora: "Harper",
            sinopse: "Regan MacNeil, uma menina de 12 anos, é possuída por uma entidade demoníaca. Sua mãe, desesperada, busca a ajuda de dois padres para realizar um exorcismo e salvar sua filha.",
            capa: "https://covers.openlibrary.org/b/isbn/0061007226-L.jpg",
            categoria: "Horror, Possessão",
            nota: 9.4,
            tipo: 'recomendado'
        },
        {
            id: 'assombracao-casa-colina',
            titulo: "A Assombração da Casa da Colina",
            autor: "Shirley Jackson",
            ano: 1959,
            editora: "DarkSide",
            sinopse: "Dr. Montague, um investigador do sobrenatural, aluga a Casa da Colina, uma mansão com fama de assombrada, para um estudo. Ele convida três pessoas, incluindo a tímida Eleanor Vance, que desenvolve uma estranha conexão com a casa.",
            capa: "https://covers.openlibrary.org/b/isbn/0143122355-L.jpg",
            categoria: "Horror, Casa Assombrada",
            nota: 9.1,
            tipo: 'recomendado'
        },
        {
            id: 'psicose',
            titulo: "Psicose",
            autor: "Robert Bloch",
            ano: 1959,
            editora: "Darkside",
            sinopse: "Marion Crane, uma secretária, rouba 40 mil dólares e foge. Durante sua fuga, ela para no Motel Bates, administrado pelo recluso e estranho Norman Bates e sua mãe dominadora. O que acontece a seguir é um dos maiores choques da literatura de suspense.",
            capa: "https://covers.openlibrary.org/b/isbn/0765357305-L.jpg",
            categoria: "Horror, Suspense",
            nota: 9.0,
            tipo: 'recomendado'
        },
        {
            id: 'chamado-cthulhu',
            titulo: "O Chamado de Cthulhu",
            autor: "H.P. Lovecraft",
            ano: 1928,
            editora: "DarkSide",
            sinopse: "Uma coleção de contos que introduz o panteão de entidades cósmicas conhecidas como os Grandes Antigos. A história principal segue a investigação de um culto que adora a entidade Cthulhu, que dorme em sua cidade submersa de R'lyeh, esperando para despertar e dominar o mundo.",
            capa: "https://covers.openlibrary.org/b/isbn/0143106481-L.jpg",
            categoria: "Horror Cósmico",
            nota: 9.6,
            tipo: 'recomendado'
        },
        {
            id: 'bebe-rosemary',
            titulo: "O Bebê de Rosemary",
            autor: "Ira Levin",
            ano: 1967,
            editora: "Record",
            sinopse: "Rosemary Woodhouse e seu marido, Guy, se mudam para um apartamento em Nova York com uma reputação sinistra. Após Rosemary engravidar, ela começa a suspeitar que seus vizinhos idosos e seu próprio marido têm planos malignos para seu bebê.",
            capa: "https://covers.openlibrary.org/b/isbn/0451194004-L.jpg",
            categoria: "Horror, Suspense",
            nota: 8.9,
            tipo: 'recomendado'
        },
        {
            id: 'eu-sou-lenda',
            titulo: "Eu Sou a Lenda",
            autor: "Richard Matheson",
            ano: 1954,
            editora: "DarkSide",
            sinopse: "Robert Neville é o último homem vivo na Terra... ou assim ele pensa. O resto da humanidade foi transformado em vampiros sedentos de sangue, e Neville deve lutar para sobreviver todas as noites enquanto busca uma cura durante o dia.",
            capa: "https://covers.openlibrary.org/b/isbn/0765357151-L.jpg",
            categoria: "Horror, Pós-Apocalíptico",
            nota: 9.2,
            tipo: 'recomendado'
        },
        {
            id: 'it-coisa',
            titulo: "It: A Coisa",
            autor: "Stephen King",
            ano: 1986,
            editora: "Suma",
            sinopse: "Em Derry, uma pequena cidade no Maine, sete crianças conhecidas como 'O Clube dos Perdedores' enfrentam uma criatura antiga que ressurge a cada 27 anos para se alimentar do medo das crianças, assumindo a forma de seus piores pesadelos, mais comumente o palhaço Pennywise.",
            capa: "https://covers.openlibrary.org/b/isbn/0670813028-L.jpg",
            categoria: "Horror, Sobrenatural",
            nota: 9.7,
            tipo: 'recomendado'
        }
    ];
}

// Initialize books data
let livrosData = {
    recomendados: [],
    todos: []
};

// Load books on page load
async function initializeBooks() {
    try {
        // Load recommended books
        livrosData.recomendados = getRecommendedBooks();
        console.log('Recommended books loaded:', livrosData.recomendados.length);
        
        // Load API books
        const apiBooks = await fetchHorrorBooks();
        livrosData.todos = apiBooks;
        console.log('API books loaded:', livrosData.todos.length);
        
    } catch (error) {
        console.error('Error initializing books:', error);
        livrosData.todos = [];
    }
}
