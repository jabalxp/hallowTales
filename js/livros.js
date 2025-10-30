document.addEventListener('DOMContentLoaded', async function() {
    // Initialize favorites system
    FavoritesManager.init();
    
    // Initialize books from API
    await initializeBooks();
    
    // Get DOM elements
    const listaRecomendados = document.getElementById('lista-recomendados');
    const listaTodosLivros = document.getElementById('lista-todos-livros');
    const searchInput = document.getElementById('search-livros');
    const loadingIndicator = document.getElementById('loading-books');
    
    // Filter buttons
    const btnRecomendacao = document.getElementById('btn-recomendacao');
    const btnPesquisa = document.getElementById('btn-pesquisa');
    const secaoRecomendados = document.getElementById('livros-recomendados');
    const secaoPesquisa = document.getElementById('todos-livros-section');

    // Helper function to normalize text for comparison
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/g, "")
            .trim();
    }

    // Check if a book from API matches a recommended book
    function findRecommendedBook(apiBook) {
        const normalizedApiTitle = normalizeText(apiBook.titulo);
        const normalizedApiOriginal = apiBook.tituloOriginal ? normalizeText(apiBook.tituloOriginal) : '';
        
        return livrosData.recomendados.find(rec => {
            const normalizedRecTitle = normalizeText(rec.titulo);
            
            // Exact match
            if (normalizedRecTitle === normalizedApiTitle || normalizedRecTitle === normalizedApiOriginal) {
                return true;
            }
            
            // For very short titles (like "It"), require exact match or match with author
            const recWords = normalizedRecTitle.split(/\s+/);
            const apiWords = normalizedApiTitle.split(/\s+/);
            if (recWords.length <= 2 || apiWords.length <= 2) {
                // Check if author also matches for short titles
                const normalizedRecAutor = normalizeText(rec.autor);
                const normalizedApiAutor = normalizeText(apiBook.autor);
                return (normalizedRecTitle === normalizedApiTitle || normalizedRecTitle === normalizedApiOriginal) &&
                       (normalizedRecAutor.includes(normalizedApiAutor) || normalizedApiAutor.includes(normalizedRecAutor));
            }
            
            // For longer titles, allow partial matching
            return normalizedApiTitle.includes(normalizedRecTitle) ||
                   normalizedRecTitle.includes(normalizedApiTitle) ||
                   (normalizedApiOriginal && (normalizedApiOriginal.includes(normalizedRecTitle) || normalizedRecTitle.includes(normalizedApiOriginal)));
        });
    }

    // Display recommended books
    function exibirRecomendados() {
        listaRecomendados.innerHTML = '';
        
        livrosData.recomendados.forEach((livro, index) => {
            // Use API covers for specific books that should match with search results
            const shouldUseApiCover = ['frankenstein', 'dracula'].includes(livro.id.toLowerCase());
            const needsCover = !livro.capa || livro.capa.includes('placeholder') || shouldUseApiCover;
            
            if (needsCover) {
                // Look for API match to get the cover
                const apiMatch = livrosData.todos.find(apiBook => {
                    const normalizedApiTitle = normalizeText(apiBook.titulo);
                    const normalizedRecTitle = normalizeText(livro.titulo);
                    const normalizedApiOriginal = apiBook.tituloOriginal ? normalizeText(apiBook.tituloOriginal) : '';
                    const normalizedRecAutor = normalizeText(livro.autor);
                    const normalizedApiAutor = normalizeText(apiBook.autor);
                    
                    // Exact match
                    if (normalizedRecTitle === normalizedApiTitle || normalizedRecTitle === normalizedApiOriginal) {
                        return true;
                    }
                    
                    // For short titles, require author match too
                    const recWords = normalizedRecTitle.split(/\s+/);
                    const apiWords = normalizedApiTitle.split(/\s+/);
                    if (recWords.length <= 2 || apiWords.length <= 2) {
                        return (normalizedRecTitle === normalizedApiTitle || normalizedRecTitle === normalizedApiOriginal) &&
                               (normalizedRecAutor.includes(normalizedApiAutor) || normalizedApiAutor.includes(normalizedRecAutor));
                    }
                    
                    // For longer titles, allow partial matching
                    return normalizedApiTitle.includes(normalizedRecTitle) ||
                           normalizedRecTitle.includes(normalizedApiTitle) ||
                           (normalizedApiOriginal && (normalizedApiOriginal.includes(normalizedRecTitle) || normalizedRecTitle.includes(normalizedApiOriginal)));
                });
                
                // If found in API, use the API book's cover
                if (apiMatch && apiMatch.capa) {
                    livro.capa = apiMatch.capa;
                }
            }
            
            const div = createBookCard(livro, index, 'recomendado', false);
            listaRecomendados.appendChild(div);
        });
        
        // Initialize favorite buttons
        FavoritesManager.initializeFavoriteButtons();
    }

    // Display all books
    function exibirTodosLivros(livrosFiltrados = null) {
        const livros = livrosFiltrados || livrosData.todos;
        listaTodosLivros.innerHTML = '';
        
        if (livros.length === 0) {
            listaTodosLivros.innerHTML = '<p style="text-align: center; color: #ff4444; font-size: 1.2rem;">Nenhum livro encontrado. Tente outra busca.</p>';
            return;
        }
        
        livros.forEach((livro, index) => {
            // Check if this API book is also a recommended book
            const recommendedMatch = findRecommendedBook(livro);
            const isRecommended = !!recommendedMatch;
            
            const div = createBookCard(livro, index, 'api', isRecommended);
            listaTodosLivros.appendChild(div);
        });
        
        // Update counter
        atualizarContador(livros.length);
        
        // Initialize favorite buttons
        FavoritesManager.initializeFavoriteButtons();
    }

    // Create book card with cover and favorite button
    function createBookCard(livro, index, tipo, isRecommendedInSearch = false) {
        const div = document.createElement('div');
        div.className = 'livro-card';
        div.style.animationDelay = `${index * 0.05}s`;
        
        const isFavorite = FavoritesManager.isFavorite('livros', livro.id);
        const favoriteIcon = isFavorite ? '❤️' : '🤍';
        const favoriteClass = isFavorite ? 'favorited' : '';
        
        // Build rating stars if available
        let ratingHtml = '';
        if (livro.nota) {
            const stars = '⭐'.repeat(Math.round(livro.nota));
            ratingHtml = `<p class="livro-rating">${stars} ${livro.nota}/10</p>`;
        }
        
        // Determine badge to show
        let badgeHtml = '';
        if (tipo === 'recomendado') {
            badgeHtml = '<div class="recomendado-badge">⭐ Recomendado</div>';
        } else if (isRecommendedInSearch) {
            badgeHtml = '<div class="recomendado-badge">⭐ Recomendado</div>';
        }
        
        div.innerHTML = `
            <div class="livro-capa-container">
                <img src="${livro.capa}" alt="${livro.titulo}" class="livro-capa" loading="lazy">
                <button class="favorite-btn ${favoriteClass}" 
                        data-favorite-type="livros" 
                        data-favorite-id="${livro.id}"
                        data-favorite-data='${JSON.stringify({
                            titulo: livro.titulo,
                            autor: livro.autor,
                            capa: livro.capa,
                            ano: livro.ano
                        })}'
                        title="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                    ${favoriteIcon}
                </button>
                ${badgeHtml}
            </div>
            <div class="livro-info">
                <h3 class="livro-titulo">${livro.titulo}</h3>
                <p class="livro-autor"><strong>📖 Autor:</strong> ${livro.autor}</p>
                ${livro.ano ? `<p class="livro-ano"><strong>📅 Ano:</strong> ${livro.ano}</p>` : ''}
                ${livro.editora ? `<p class="livro-editora"><strong>🏢 Editora:</strong> ${livro.editora}</p>` : ''}
                ${livro.categoria ? `<p class="livro-categoria"><strong>🏷️ Categoria:</strong> ${livro.categoria}</p>` : ''}
                ${ratingHtml}
                <p class="livro-sinopse">${livro.sinopse}</p>
                ${livro.previewLink ? `<a href="${livro.previewLink}" target="_blank" class="livro-preview-link">📚 ${tipo === 'recomendado' ? 'Livro Clássico' : 'Ver no Open Library'}</a>` : ''}
            </div>
        `;
        
        return div;
    }
    
    function atualizarContador(quantidade) {
        let contador = document.getElementById('contador-todos-livros');
        if (!contador) {
            contador = document.createElement('div');
            contador.id = 'contador-todos-livros';
            contador.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.2rem; color: #ff4444;';
            const todosSection = document.getElementById('todos-livros-section');
            if (todosSection) {
                todosSection.insertBefore(contador, listaTodosLivros);
            }
        }
        contador.innerHTML = `<strong>📚 Exibindo ${quantidade} livro${quantidade !== 1 ? 's' : ''} de terror</strong>`;
    }

    // Search functionality - search in both Portuguese and English titles
    searchInput.addEventListener('input', function() {
        const termo = this.value.toLowerCase();
        
        if (termo.trim() === '') {
            exibirTodosLivros();
            return;
        }
        
        const livrosFiltrados = livrosData.todos.filter(livro => 
            livro.titulo.toLowerCase().includes(termo) || 
            (livro.tituloOriginal && livro.tituloOriginal.toLowerCase().includes(termo)) ||
            livro.autor.toLowerCase().includes(termo) ||
            (livro.sinopse && livro.sinopse.toLowerCase().includes(termo))
        );
        exibirTodosLivros(livrosFiltrados);
    });

    // Filter button functionality
    function setActiveFilter(filterType) {
        // Update button states
        if (filterType === 'recomendacao') {
            btnRecomendacao.classList.add('active');
            btnPesquisa.classList.remove('active');
            secaoRecomendados.classList.add('active');
            secaoPesquisa.classList.remove('active');
        } else {
            btnPesquisa.classList.add('active');
            btnRecomendacao.classList.remove('active');
            secaoPesquisa.classList.add('active');
            secaoRecomendados.classList.remove('active');
        }
    }

    // Event listeners for filter buttons
    btnRecomendacao.addEventListener('click', function() {
        setActiveFilter('recomendacao');
    });

    btnPesquisa.addEventListener('click', function() {
        setActiveFilter('pesquisa');
    });

    // Handle favorite button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite-btn') || e.target.closest('.favorite-btn')) {
            const btn = e.target.classList.contains('favorite-btn') ? e.target : e.target.closest('.favorite-btn');
            const type = btn.getAttribute('data-favorite-type');
            const id = btn.getAttribute('data-favorite-id');
            const data = JSON.parse(btn.getAttribute('data-favorite-data'));
            
            FavoritesManager.toggleFavorite(type, id, data);
        }
    });

    // Initial display
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    exibirRecomendados();
    exibirTodosLivros();
    
    // Set initial filter to "Recomendação"
    setActiveFilter('recomendacao');
});