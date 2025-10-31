/**
 * Vercel Analytics Integration
 * 
 * Este arquivo inicializa o Vercel Web Analytics para rastrear:
 * - Page views (visualizações de página)
 * - Web Vitals (métricas de performance)
 * - Custom events (eventos personalizados)
 * 
 * Documentação: https://vercel.com/docs/analytics
 */

// Para projetos hospedados no Vercel, você pode simplesmente ativar o Analytics
// no dashboard do Vercel em: Project Settings > Analytics

// Para desenvolvimento local ou sites fora do Vercel, use o script abaixo:

// Método 1: Usando o pacote NPM (requer build system)
// import { inject } from '@vercel/analytics';
// inject();

// Método 2: Para HTML puro (sem build), adicione este script no <head> de cada página:
/*
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
*/

// Método 3: Script inline para injetar analytics automaticamente
(function() {
  // Verifica se já foi inicializado
  if (window.vaInitialized) return;
  window.vaInitialized = true;

  // Cria a função de analytics
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };

  // Carrega o script do Vercel Analytics
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  script.onerror = function() {
    console.log('📊 Vercel Analytics: Script não carregado (normal em localhost)');
    console.log('💡 Para ativar analytics: Deploy no Vercel e ative em Project Settings > Analytics');
  };
  
  document.head.appendChild(script);
  
  console.log('📊 Vercel Analytics inicializado!');
})();

// Função helper para rastrear eventos personalizados
window.trackEvent = function(eventName, eventData = {}) {
  if (window.va) {
    window.va('event', { name: eventName, data: eventData });
    console.log('📊 Event tracked:', eventName, eventData);
  }
};

// Exemplos de uso:
// trackEvent('Signup', { location: 'footer' });
// trackEvent('Purchase', { productName: 'Livro de Terror', price: 29.99 });
// trackEvent('Favorite Added', { type: 'livro', title: 'It' });
