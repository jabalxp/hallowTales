// js/api-utils.js

function buildApiUrl(base, endpoint, params = {}) {
    const url = new URL(endpoint, base);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    return url.href;
}

// Função para fetch genérico da API e tratamento de erro
async function apiFetch(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Fetch failed: ${resp.status} - ${resp.statusText}`);
    return await resp.json();
}

// TMDB image helper
function getTMDBImageUrl(path, type = 'poster', size = 'w500') {
    if (!path) return 'https://via.placeholder.com/300x450/1a001a/00ff00?text=Sem+Imagem';
    if (type === 'backdrop') size = 'w780';
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
