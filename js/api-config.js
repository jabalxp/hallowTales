// API Configuration File
// Configure your API keys here

const API_CONFIG = {
    // TMDB API - The Movie Database
    // Get your free API key at: https://www.themoviedb.org/settings/api
    TMDB: {
        API_KEY: '2213be1811fd9f3901a97068e65ea67e', // Replace with your TMDB API key
        BASE_URL: 'https://api.themoviedb.org/3',
        IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
        IMAGE_SIZES: {
            poster: 'w500',      // For movie/series posters
            backdrop: 'w1280',   // For background images
            profile: 'w185'      // For person profiles
        }
    },

    // RAWG API - Video Games Database
    // Get your free API key at: https://rawg.io/apidocs
    RAWG: {
        API_KEY: '300be8282dfc48c49a2e2f26268e74ae', // Replace with your RAWG API key
        BASE_URL: 'https://api.rawg.io/api'
    },

    // Open Library API - Books Database
    // No API key required - completely free!
    OPEN_LIBRARY: {
        BASE_URL: 'https://openlibrary.org',
        COVERS_URL: 'https://covers.openlibrary.org/b'
    }
};

// Helper function to build TMDB image URLs
function getTMDBImageUrl(path, type = 'poster') {
    if (!path) return 'https://via.placeholder.com/500x750/1a0033/00ff00?text=No+Image';
    const size = API_CONFIG.TMDB.IMAGE_SIZES[type];
    return `${API_CONFIG.TMDB.IMAGE_BASE_URL}/${size}${path}`;
}

// Helper function to get Open Library cover URL
function getOpenLibraryCoverUrl(coverId, size = 'M') {
    if (!coverId) return 'https://via.placeholder.com/500x750/1a0033/00ff00?text=No+Cover';
    return `${API_CONFIG.OPEN_LIBRARY.COVERS_URL}/id/${coverId}-${size}.jpg`;
}

// Helper function to build API URLs with query parameters
function buildApiUrl(baseUrl, endpoint, params = {}) {
    const url = new URL(`${baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
}

// Generic fetch with error handling
async function apiFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
}
