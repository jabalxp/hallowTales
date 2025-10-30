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
                jogos: [],
                cidades: []
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
        const favorites = this.getAll();
        if (!favorites[type].find(item => item.id === id)) {
            favorites[type].push({ id, ...data, addedAt: new Date().toISOString() });
            localStorage.setItem(this.storageKey, JSON.stringify(favorites));
            this.updateFavoriteButtons(type, id, true);
            this.showNotification(`Adicionado aos favoritos! ❤️`);
            return true;
        }
        return false;
    },

    // Remove dos favoritos
    removeFromFavorites(type, id) {
        const favorites = this.getAll();
        favorites[type] = favorites[type].filter(item => item.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
        this.updateFavoriteButtons(type, id, false);
        this.showNotification(`Removido dos favoritos! 💔`);
        return true;
    },

    // Verifica se está nos favoritos
    isFavorite(type, id) {
        const favorites = this.getFavorites(type);
        return favorites.some(item => item.id === id);
    },

    // Toggle favorito
    toggleFavorite(type, id, data = {}) {
        if (this.isFavorite(type, id)) {
            this.removeFromFavorites(type, id);
            return false;
        } else {
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

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Pega os dados do card
                const card = btn.closest('[data-item-data]');
                let itemData = {};
                if (card) {
                    try {
                        itemData = JSON.parse(card.getAttribute('data-item-data'));
                    } catch (e) {
                        console.error('Erro ao parsear dados do item:', e);
                    }
                }
                
                this.toggleFavorite(type, id, itemData);
            });
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
