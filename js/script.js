// Script geral para funcionalidades comuns
document.addEventListener('DOMContentLoaded', function() {
    console.log('HallowTales carregado - Feliz Halloween! 🎃');
    
    // Criar elementos de Halloween flutuantes
    criarElementosHalloween();
    
    // Efeito de digitação no banner de Halloween
    const bannerTitulo = document.querySelector('.halloween-banner h2');
    if (bannerTitulo) {
        const textoOriginal = bannerTitulo.textContent;
        bannerTitulo.textContent = '';
        let i = 0;
        
        function digitar() {
            if (i < textoOriginal.length) {
                bannerTitulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(digitar, 80);
            }
        }
        
        setTimeout(digitar, 500);
    }
    
    // Adicionar efeito de hover suave nos cards
    const cards = document.querySelectorAll('.intro-card, .filme-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Função para criar elementos de Halloween flutuantes
function criarElementosHalloween() {
    const emojis = ['🎃', '👻', '🦇', '💀', '🕷️', '🍬', '🕸️', '🌙'];
    const quantidade = 15;
    
    for (let i = 0; i < quantidade; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'halloween-float';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (Math.random() * 10 + 15) + 's';
        emoji.style.animationDelay = (Math.random() * 5) + 's';
        emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
        document.body.appendChild(emoji);
    }
}