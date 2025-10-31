/**
 * 📊 Exemplos Práticos de Eventos de Analytics para HallowTales
 * 
 * Este arquivo contém snippets de código prontos para copiar e colar
 * em diferentes partes do site para rastrear comportamentos dos usuários.
 */

// ============================================================================
// 📚 LIVROS - Exemplos de Events
// ============================================================================

// Rastrear quando alguém pesquisa por um livro
document.getElementById('search-livros')?.addEventListener('input', (e) => {
  if (e.target.value.length > 3) {
    trackEvent('Book Search', { 
      query: e.target.value,
      queryLength: e.target.value.length 
    });
  }
});

// Rastrear quando alguém muda de aba (Recomendação vs Pesquisa)
document.getElementById('btn-recomendacao')?.addEventListener('click', () => {
  trackEvent('Tab Changed', { section: 'livros', tab: 'recomendacao' });
});

document.getElementById('btn-pesquisa')?.addEventListener('click', () => {
  trackEvent('Tab Changed', { section: 'livros', tab: 'pesquisa' });
});

// Rastrear cliques em preview de livros
document.querySelectorAll('.livro-preview-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const bookTitle = e.target.closest('.livro-card')?.querySelector('.livro-titulo')?.textContent;
    trackEvent('Book Preview Clicked', { 
      title: bookTitle,
      source: 'Open Library'
    });
  });
});

// ============================================================================
// 🎬 FILMES & SÉRIES - Exemplos de Events
// ============================================================================

// Rastrear quando alguém muda entre Filmes e Séries
document.getElementById('btn-filmes')?.addEventListener('click', () => {
  trackEvent('Tab Changed', { section: 'media', tab: 'filmes' });
});

document.getElementById('btn-series')?.addEventListener('click', () => {
  trackEvent('Tab Changed', { section: 'media', tab: 'series' });
});

// Rastrear pesquisas de filmes/séries
document.getElementById('search-media')?.addEventListener('input', (e) => {
  if (e.target.value.length > 2) {
    trackEvent('Media Search', { 
      query: e.target.value,
      type: 'both' // ou 'filmes' ou 'series'
    });
  }
});

// Rastrear quando alguém clica no poster para ver mais detalhes
document.addEventListener('click', (e) => {
  if (e.target.closest('.media-card')) {
    const card = e.target.closest('.media-card');
    const title = card.querySelector('h3')?.textContent;
    const type = card.getAttribute('data-type'); // 'filme' ou 'serie'
    
    trackEvent('Media Card Clicked', { 
      title: title,
      type: type 
    });
  }
});

// ============================================================================
// 🎮 JOGOS - Exemplos de Events
// ============================================================================

// Rastrear pesquisas de jogos
document.getElementById('search-jogos')?.addEventListener('input', (e) => {
  if (e.target.value.length > 2) {
    trackEvent('Game Search', { 
      query: e.target.value 
    });
  }
});

// Rastrear quando alguém ordena a lista de jogos
document.getElementById('sort-jogos')?.addEventListener('change', (e) => {
  trackEvent('Games Sorted', { 
    sortBy: e.target.value // 'name', 'year', 'rating'
  });
});

// ============================================================================
// ❓ QUIZ - Exemplos de Events
// ============================================================================

// Rastrear quando alguém inicia o quiz
function startQuiz() {
  trackEvent('Quiz Started', { 
    timestamp: new Date().toISOString() 
  });
  // ... resto do código do quiz
}

// Rastrear respostas do quiz
function answerQuestion(questionNumber, answer) {
  trackEvent('Quiz Question Answered', { 
    questionNumber: questionNumber,
    answer: answer 
  });
  // ... resto do código
}

// Rastrear resultado final do quiz
function showQuizResult(movieRecommendation) {
  trackEvent('Quiz Completed', { 
    result: movieRecommendation,
    questionsAnswered: currentQuestion // número de perguntas respondidas
  });
  // ... resto do código
}

// Rastrear quando alguém reinicia o quiz
document.getElementById('reiniciar-quiz')?.addEventListener('click', () => {
  trackEvent('Quiz Restarted');
});

// ============================================================================
// 🏛️ CIDADES - Exemplos de Events
// ============================================================================

// Rastrear quando alguém expande detalhes de uma cidade
document.querySelectorAll('.cidade-card').forEach(card => {
  card.addEventListener('click', () => {
    const cityName = card.querySelector('h3')?.textContent;
    trackEvent('City Details Viewed', { 
      city: cityName 
    });
  });
});

// Rastrear pesquisas de cidades
document.getElementById('search-cidades')?.addEventListener('input', (e) => {
  if (e.target.value.length > 2) {
    trackEvent('City Search', { 
      query: e.target.value 
    });
  }
});

// ============================================================================
// ❤️ FAVORITOS - Exemplos já implementados
// ============================================================================

// ✅ JÁ IMPLEMENTADO em favoritos.js:
// - 'Favorite Added' quando adiciona favorito
// - 'Favorite Removed' quando remove favorito

// Rastrear quando visualiza a página de favoritos
if (window.location.pathname.includes('favoritos.html')) {
  trackEvent('Favorites Page Viewed', {
    timestamp: new Date().toISOString()
  });
}

// Rastrear quando exporta favoritos
document.querySelector('.btn-export')?.addEventListener('click', () => {
  trackEvent('Favorites Exported', {
    totalItems: FavoritesManager.getAll().filmes.length + 
                FavoritesManager.getAll().series.length + 
                FavoritesManager.getAll().livros.length + 
                FavoritesManager.getAll().jogos.length
  });
});

// Rastrear quando limpa todos os favoritos
document.querySelector('.btn-clear')?.addEventListener('click', () => {
  trackEvent('Clear All Favorites Clicked');
});

// ============================================================================
// 🔗 NAVEGAÇÃO GERAL - Exemplos de Events
// ============================================================================

// Rastrear cliques em links da navegação
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    const destination = e.target.getAttribute('href');
    const linkText = e.target.textContent.trim();
    
    trackEvent('Navigation Link Clicked', { 
      destination: destination,
      linkText: linkText,
      from: window.location.pathname
    });
  });
});

// Rastrear tempo na página (quando usuário sai)
let pageStartTime = Date.now();

window.addEventListener('beforeunload', () => {
  const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000); // em segundos
  
  if (timeSpent > 5) { // só rastreia se ficou mais de 5 segundos
    trackEvent('Page Exit', { 
      page: window.location.pathname,
      timeSpent: timeSpent
    });
  }
});

// Rastrear scroll profundo (usuário rolou até o fim)
let hasReachedBottom = false;

window.addEventListener('scroll', () => {
  if (hasReachedBottom) return;
  
  const scrollPercentage = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
  
  if (scrollPercentage > 0.9) { // 90% da página
    hasReachedBottom = true;
    trackEvent('Scrolled To Bottom', { 
      page: window.location.pathname 
    });
  }
});

// ============================================================================
// 📱 MOBILE MENU - Exemplos de Events
// ============================================================================

// Rastrear quando abre/fecha menu mobile
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  const isOpen = !menu.classList.contains('hidden');
  
  trackEvent('Mobile Menu Toggle', { 
    action: isOpen ? 'close' : 'open' 
  });
});

// ============================================================================
// 🎃 EVENTOS ESPECIAIS - Halloween / Datas Especiais
// ============================================================================

// Rastrear se visitou no Halloween
const today = new Date();
if (today.getMonth() === 9 && today.getDate() === 31) { // 31 de outubro
  trackEvent('Halloween Visit', {
    year: today.getFullYear(),
    time: today.getHours()
  });
}

// Rastrear primeiros visitantes do dia
const lastVisitDate = localStorage.getItem('hallowtales_last_visit');
const todayStr = today.toISOString().split('T')[0];

if (lastVisitDate !== todayStr) {
  trackEvent('First Visit Today', {
    date: todayStr,
    dayOfWeek: today.toLocaleDateString('pt-BR', { weekday: 'long' })
  });
  localStorage.setItem('hallowtales_last_visit', todayStr);
}

// ============================================================================
// 💡 COMO USAR ESTES EXEMPLOS
// ============================================================================

/*
1. Copie o código que você quer usar
2. Cole no arquivo JavaScript apropriado:
   - Livros → js/livros.js
   - Filmes → js/filmes.js ou js/api-filmes.js
   - Jogos → js/jogos.js
   - Quiz → Diretamente no quiz.html no <script> do quiz
   - Cidades → js/cidades.js
   
3. Ou adicione no final das páginas HTML dentro de <script> tags

4. Teste localmente abrindo o console e verificando as mensagens:
   📊 Event tracked: [nome do evento] { dados }

5. Faça deploy no Vercel e veja os dados no dashboard!
*/

// ============================================================================
// 🎯 METAS DE ANALYTICS SUGERIDAS
// ============================================================================

/*
Métricas Chave para Acompanhar:

1. ENGAJAMENTO
   - Tempo médio na página
   - Taxa de scroll profundo
   - Número de favoritos adicionados por usuário
   - Taxa de conclusão do quiz

2. CONTEÚDO POPULAR
   - Livros mais favoritados
   - Filmes/séries mais clicados
   - Jogos mais procurados
   - Cidades mais visualizadas

3. BUSCA
   - Termos mais pesquisados em cada seção
   - Taxa de pesquisas sem resultado
   - Tempo entre pesquisa e favoritar

4. NAVEGAÇÃO
   - Páginas mais visitadas
   - Fluxo de navegação (de onde vêm, para onde vão)
   - Taxa de saída por página

5. CONVERSÃO
   - % de visitantes que adicionam favoritos
   - % que completam o quiz
   - % que exportam favoritos
   - Taxa de retorno (visitantes recorrentes)
*/

console.log('📊 Analytics Events Examples loaded! Use trackEvent() para rastrear eventos.');
