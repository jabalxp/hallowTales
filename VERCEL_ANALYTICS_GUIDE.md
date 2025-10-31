# 📊 Vercel Analytics - Guia de Instalação e Uso

## ✅ Instalação Concluída

O Vercel Analytics foi instalado e configurado no projeto HallowTales!

### 📦 Pacote Instalado
```bash
npm i @vercel/analytics
```

### 📁 Arquivos Adicionados/Modificados

1. **`package.json`** - Criado com dependência do @vercel/analytics
2. **`js/analytics.js`** - Script de inicialização do analytics
3. **Todas as páginas HTML** - Script de analytics adicionado no `<head>`

## 🚀 Como Funciona

### Para Projetos Hospedados no Vercel

1. Faça deploy do seu site no Vercel
2. No dashboard do Vercel, vá em **Project Settings > Analytics**
3. Ative o **Web Analytics**
4. O script `/_vercel/insights/script.js` será automaticamente carregado
5. Pronto! Seus dados de analytics começarão a aparecer no dashboard

### Para Desenvolvimento Local

Durante o desenvolvimento local, você verá uma mensagem no console:
```
📊 Vercel Analytics: Script não carregado (normal em localhost)
```

Isso é normal! O analytics só funciona quando hospedado no Vercel.

## 📈 Métricas Rastreadas Automaticamente

O Vercel Analytics rastreia automaticamente:

- **Page Views** - Visualizações de cada página
- **Unique Visitors** - Visitantes únicos
- **Top Pages** - Páginas mais visitadas
- **Referrers** - De onde os visitantes vêm
- **Countries** - Localização geográfica dos visitantes
- **Devices** - Desktop vs Mobile
- **Browsers** - Quais navegadores são usados
- **Web Vitals** - Métricas de performance (LCP, FID, CLS, TTFB, FCP)

## 🎯 Eventos Personalizados

O projeto já está configurado para rastrear eventos personalizados:

### Eventos Automáticos (Já Implementados)

```javascript
// Quando um usuário adiciona aos favoritos
'Favorite Added' - { type: 'livros', itemId: 'it', itemTitle: 'It' }

// Quando um usuário remove dos favoritos  
'Favorite Removed' - { type: 'filmes', itemId: '123', itemTitle: 'The Shining' }
```

### Adicionar Novos Eventos Personalizados

Use a função global `trackEvent()` em qualquer lugar do código:

```javascript
// Exemplo: Rastrear quando alguém completa o quiz
trackEvent('Quiz Completed', { 
    result: 'The Conjuring',
    score: 8
});

// Exemplo: Rastrear pesquisas
trackEvent('Book Search', { 
    query: 'Stephen King',
    resultsCount: 15
});

// Exemplo: Rastrear cliques em links externos
trackEvent('External Link Click', {
    url: 'https://amazon.com',
    type: 'book-preview'
});

// Exemplo: Rastrear filtros aplicados
trackEvent('Filter Applied', {
    category: 'jogos',
    filter: 'survival-horror'
});
```

## 🔍 Modo Debug

Para ver os eventos sendo rastreados no console durante desenvolvimento:

1. Abra `js/analytics.js`
2. A função `trackEvent` já loga todos os eventos no console:
   ```
   📊 Event tracked: Favorite Added { type: 'livros', itemTitle: 'Dracula' }
   ```

## 📊 Visualizando os Dados

Após fazer deploy no Vercel:

1. Acesse https://vercel.com/dashboard
2. Selecione seu projeto
3. Clique na aba **Analytics**
4. Veja todas as métricas e eventos personalizados

## 🔧 Configuração Avançada

### Desabilitar Analytics em Produção

Se precisar desabilitar temporariamente:

```javascript
// Em js/analytics.js, comente estas linhas:
// document.head.appendChild(script);
```

### Filtrar por Ambiente

O analytics detecta automaticamente o ambiente. Para forçar um modo específico:

```javascript
// Adicionar no analytics.js:
window.va('mode', 'production'); // ou 'development'
```

### Custom Script Source

Se usar um domínio customizado:

```javascript
script.src = 'https://seu-dominio.com/_vercel/insights/script.js';
```

## 📚 Documentação Oficial

- [Vercel Analytics - Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Custom Events](https://vercel.com/docs/analytics/custom-events)
- [Web Vitals API](https://vercel.com/docs/speed-insights/api)

## 💡 Dicas e Boas Práticas

1. **Não rastreie dados sensíveis** - Nunca envie senhas, emails ou informações pessoais nos eventos
2. **Use nomes consistentes** - Mantenha os nomes dos eventos padronizados (ex: sempre "Favorite Added", não "favorite_added" ou "FavoriteAdded")
3. **Limite dados dos eventos** - Envie apenas dados relevantes, evite objetos muito grandes
4. **Teste no staging** - Teste eventos em ambiente de staging antes de produção
5. **Monitore regularmente** - Verifique o dashboard semanalmente para insights

## 🎃 Eventos Sugeridos para HallowTales

Aqui estão alguns eventos que você pode adicionar:

```javascript
// Navegação
trackEvent('Tab Changed', { from: 'recomendados', to: 'pesquisa' });

// Interações
trackEvent('Book Preview Clicked', { bookId: 'frankenstein' });
trackEvent('Quiz Started');
trackEvent('Quiz Result', { movie: 'Hereditary' });

// Engajamento
trackEvent('Read More Clicked', { section: 'cidades', city: 'Salem' });
trackEvent('Share Clicked', { type: 'livro', title: 'Dracula' });

// Conversões
trackEvent('Newsletter Signup', { location: 'footer' });
trackEvent('Social Media Click', { platform: 'instagram' });
```

## ⚠️ Troubleshooting

### Analytics não aparece no dashboard
- Certifique-se que o projeto está deployado no Vercel
- Ative o Analytics nas configurações do projeto
- Aguarde alguns minutos para os primeiros dados aparecerem

### Eventos não são rastreados
- Verifique se `js/analytics.js` está carregado
- Abra o console e procure por mensagens de erro
- Confirme que `window.trackEvent` está definido: `console.log(typeof window.trackEvent)`

### Script não carrega em localhost
- Isso é esperado! Analytics só funciona quando hospedado no Vercel
- Para testar localmente, use o modo debug

---

**🎃 Happy Tracking! Que seus analytics sejam tão assustadores quanto suas histórias de terror! 👻**
