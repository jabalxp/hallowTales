// Sistema de Favoritos - HallowTales
// Gerencia favoritos usando localStorage

const FavoritesManager = {
    storageKey: 'hallowtales_favorites',

    // Inicializa o localStorage se não existir
    init() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({
                filmes: [],
                series: [],
                livros: [],
                jogos: []
            }));
        }
    },

    // Retorna todos os favoritos
    getAll() {
        this.init();
        return JSON.parse(localStorage.getItem(this.storageKey));
    },

    // Retorna favoritos de um tipo específico
    getFavorites(type) {
        const favorites = this.getAll();
        return favorites[type] || [];
    },

    // Adiciona aos favoritos
    addToFavorites(type, id, data = {}) {
        console.log('➕ addToFavorites chamado:', { type, id, data });
        const favorites = this.getAll();
        if (!favorites[type].find(item => item.id === id)) {
            const itemToAdd = { id, ...data, addedAt: new Date().toISOString() };
            console.log('💾 Adicionando item:', itemToAdd);
            favorites[type].push(itemToAdd);
            localStorage.setItem(this.storageKey, JSON.stringify(favorites));
            this.updateFavoriteButtons(type, id, true);
            this.showNotification(`Adicionado aos favoritos! ❤️`);
            console.log('✅ Item adicionado com sucesso!');
            
            // Track event in Vercel Analytics
            if (typeof window.trackEvent === 'function') {
                window.trackEvent('Favorite Added', { 
                    type: type, 
                    itemId: id,
                    itemTitle: data.titulo || data.title || 'Unknown'
                });
            }
            
            return true;
        }
        console.log('⚠️ Item já existe nos favoritos');
        return false;
    },

    // Remove dos favoritos
    removeFromFavorites(type, id) {
        const favorites = this.getAll();
        const removedItem = favorites[type].find(item => item.id === id);
        favorites[type] = favorites[type].filter(item => item.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
        this.updateFavoriteButtons(type, id, false);
        this.showNotification(`Removido dos favoritos! 💔`);
        
        // Track event in Vercel Analytics
        if (typeof window.trackEvent === 'function' && removedItem) {
            window.trackEvent('Favorite Removed', { 
                type: type, 
                itemId: id,
                itemTitle: removedItem.titulo || removedItem.title || 'Unknown'
            });
        }
        
        return true;
    },

    // Verifica se está nos favoritos
    isFavorite(type, id) {
        const favorites = this.getFavorites(type);
        return favorites.some(item => item.id === id);
    },

    // Toggle favorito
    toggleFavorite(type, id, data = {}) {
        console.log('🔄 toggleFavorite chamado:', { type, id, data });
        const isFav = this.isFavorite(type, id);
        console.log('É favorito?', isFav);
        
        if (isFav) {
            console.log('➖ Removendo dos favoritos...');
            this.removeFromFavorites(type, id);
            return false;
        } else {
            console.log('➕ Adicionando aos favoritos...');
            this.addToFavorites(type, id, data);
            return true;
        }
    },

    // Atualiza todos os botões de favorito na página
    updateFavoriteButtons(type, id, isFavorite) {
        const buttons = document.querySelectorAll(`[data-favorite-type="${type}"][data-favorite-id="${id}"]`);
        buttons.forEach(btn => {
            if (isFavorite) {
                btn.classList.add('favorited');
                btn.innerHTML = '❤️';
                btn.title = 'Remover dos favoritos';
            } else {
                btn.classList.remove('favorited');
                btn.innerHTML = '🤍';
                btn.title = 'Adicionar aos favoritos';
            }
        });
    },

    // Inicializa todos os botões de favorito na página
    initializeFavoriteButtons() {
        const buttons = document.querySelectorAll('[data-favorite-type]');
        buttons.forEach(btn => {
            const type = btn.getAttribute('data-favorite-type');
            const id = btn.getAttribute('data-favorite-id');
            const isFav = this.isFavorite(type, id);
            
            if (isFav) {
                btn.classList.add('favorited');
                btn.innerHTML = '❤️';
                btn.title = 'Remover dos favoritos';
            } else {
                btn.classList.remove('favorited');
                btn.innerHTML = '🤍';
                btn.title = 'Adicionar aos favoritos';
            }

            // Remove event listeners antigos (se houver)
            if (btn._favoriteClickHandler) {
                btn.removeEventListener('click', btn._favoriteClickHandler);
            }

            // Cria novo handler e guarda referência
            btn._favoriteClickHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🔍 Botão favorito clicado!');
                console.log('Type:', type, 'ID:', id);
                
                // Pega os dados do button ou do card
                let itemData = {};
                
                // Primeiro tenta pegar do próprio botão (para livros)
                if (btn.hasAttribute('data-favorite-data')) {
                    try {
                        const dataStr = btn.getAttribute('data-favorite-data');
                        console.log('📝 Dados encontrados no botão:', dataStr);
                        itemData = JSON.parse(dataStr);
                        console.log('✅ Dados parseados:', itemData);
                    } catch (err) {
                        console.error('❌ Erro ao parsear dados do botão:', err);
                    }
                }
                // Se não encontrou no botão, tenta pegar do card pai
                else {
                    const card = btn.closest('[data-item-data]');
                    if (card) {
                        try {
                            itemData = JSON.parse(card.getAttribute('data-item-data'));
                            console.log('✅ Dados encontrados no card pai:', itemData);
                        } catch (err) {
                            console.error('❌ Erro ao parsear dados do item:', err);
                        }
                    } else {
                        console.log('⚠️ Nenhum dado encontrado (nem no botão, nem no card pai)');
                    }
                }
                
                console.log('🚀 Chamando toggleFavorite com:', { type, id, itemData });
                this.toggleFavorite(type, id, itemData);
            };

            btn.addEventListener('click', btn._favoriteClickHandler);
        });
    },

    // Mostra notificação
    showNotification(message) {
        // Remove notificação existente se houver
        const existing = document.querySelector('.favorite-notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'favorite-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    // Conta total de favoritos
    getTotalCount() {
        const favorites = this.getAll();
        return Object.values(favorites).reduce((total, arr) => total + arr.length, 0);
    },

    // Exporta favoritos como JSON
    exportFavorites() {
        const favorites = this.getAll();
        const dataStr = JSON.stringify(favorites, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'hallowtales_favoritos.json';
        link.click();
    }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    FavoritesManager.init();
});
