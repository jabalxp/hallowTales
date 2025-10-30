# 🎃 HallowTales - API Integration Guide

## 🚀 Overview

HallowTales agora usa APIs reais para buscar dados dinâmicos de filmes, séries e jogos! Este guia explica como configurar e usar as integrações de API.

## 📋 APIs Utilizadas

### 1. **TMDB (The Movie Database)** - Filmes & Séries
- **Website**: https://www.themoviedb.org/
- **Documentação**: https://developer.themoviedb.org/reference/intro/getting-started
- **Custo**: Gratuito
- **Limite**: Nenhum limite oficial para uso pessoal
- **Usado para**: Filmes de terror e séries de horror/mistério

### 2. **RAWG** - Video Games Database
- **Website**: https://rawg.io/
- **Documentação**: https://api.rawg.io/docs/
- **Custo**: Gratuito
- **Limite**: 20,000 requisições por mês
- **Usado para**: Jogos de terror de todas as plataformas

### 3. **Open Library** - Books Database *(Planejado)*
- **Website**: https://openlibrary.org/
- **Documentação**: https://openlibrary.org/developers/api
- **Custo**: Completamente gratuito
- **Limite**: Sem limites
- **Usado para**: Livros de terror (a ser implementado)

---

## 🔑 Como Obter Chaves de API

### TMDB API Key

1. Acesse https://www.themoviedb.org/signup
2. Crie uma conta gratuita
3. Vá para **Settings** → **API**
4. Clique em "Request an API Key"
5. Escolha "Developer" e preencha o formulário
6. Copie sua **API Key (v3 auth)**

### RAWG API Key

1. Acesse https://rawg.io/apidocs
2. Clique em "Get API Key"
3. Crie uma conta gratuita
4. Sua chave de API aparecerá automaticamente no painel
5. Copie a **API Key**

---

## ⚙️ Configuração

### Passo 1: Configure as Chaves de API

Abra o arquivo **`js/api-config.js`** e substitua os placeholders pelas suas chaves reais:

```javascript
const API_CONFIG = {
    TMDB: {
        API_KEY: 'SUA_CHAVE_TMDB_AQUI', // ← Cole sua chave TMDB aqui
        // ...
    },
    RAWG: {
        API_KEY: 'SUA_CHAVE_RAWG_AQUI', // ← Cole sua chave RAWG aqui
        // ...
    }
};
```

### Passo 2: Teste a Integração

1. Abra o arquivo **`jogos.html`** em seu navegador
2. Abra o **Console do Desenvolvedor** (F12)
3. Você deve ver mensagens como:
   ```
   Fetching horror games from RAWG API...
   Fetched 40 games from RAWG
   Games cached successfully
   ```

4. Abra **`filmes.html`** e verifique:
   ```
   Fetching horror movies from TMDB API...
   Fetched 60 movies from TMDB
   Movies cached successfully
   ```

---

## 📦 Funcionalidades Implementadas

### ✅ Sistema de Cache
- **Duração**: 5 minutos
- **Benefício**: Evita requisições repetidas e economiza limite de API
- **Implementação**: Dados são armazenados em memória e reutilizados

### ✅ Fallback Automático
- Se a API falhar ou a chave não estiver configurada
- O site automaticamente usa dados hardcoded (20 itens)
- Mensagem no console explica o problema

### ✅ Tratamento de Erros
- Validação de chaves de API
- Mensagens de erro amigáveis
- Imagens placeholder para posters faltando

### ✅ Imagens de Alta Qualidade
- **TMDB**: Posters em resolução 500px de largura
- **RAWG**: Screenshots e background images
- **Fallback**: Imagens placeholder com texto do título

---

## 🎮 Como Funciona

### Jogos (RAWG API)

```javascript
// Busca automaticamente jogos de horror
async function fetchHorrorGames() {
    // 1. Verifica cache (5 minutos)
    // 2. Faz requisição para RAWG API
    // 3. Filtra por gênero "Horror" (ID: 4)
    // 4. Ordena por rating e metacritic
    // 5. Retorna 40 jogos (2 páginas)
}
```

**Parâmetros da busca:**
- `genres=4` (Horror)
- `ordering=-rating,-metacritic` (Melhor avaliados)
- `tags=horror,survival-horror,psychological-horror`
- `page_size=20` (20 por página)

### Filmes (TMDB API)

```javascript
// Busca filmes de horror automaticamente
async function fetchHorrorMovies() {
    // 1. Verifica cache (5 minutos)
    // 2. Faz requisição para TMDB API
    // 3. Filtra por gênero "Horror" (ID: 27)
    // 4. Requer mínimo de 500 votos para qualidade
    // 5. Retorna 60 filmes (3 páginas)
}
```

**Parâmetros da busca:**
- `with_genres=27` (Horror)
- `sort_by=vote_average.desc` (Melhor avaliados)
- `vote_count.gte=500` (Mínimo de votos)
- `language=pt-BR` (Descrições em português)

### Séries (TMDB API)

```javascript
// Busca séries de horror/mistério
async function fetchHorrorSeries() {
    // 1. Verifica cache (5 minutos)
    // 2. Busca por múltiplos gêneros relacionados
    // 3. Filtra por keywords de horror
    // 4. Retorna 40 séries (2 páginas)
}
```

**Parâmetros da busca:**
- `with_genres=10765,9648` (Sci-Fi/Fantasy + Mystery)
- `with_keywords=9663|4458|9951|180547` (horror, supernatural, gore, survival horror)
- `vote_count.gte=100` (Mínimo de votos)

---

## 🐛 Solução de Problemas

### ❌ "Using fallback data"

**Problema**: API key não configurada ou inválida

**Solução**:
1. Verifique se você copiou a chave corretamente em `api-config.js`
2. Certifique-se de não ter espaços extras
3. Confira se a chave ainda está válida no site da API

### ❌ "HTTP error! status: 401"

**Problema**: Chave de API inválida ou expirada

**Solução**:
1. Gere uma nova chave de API
2. Atualize em `api-config.js`
3. Limpe o cache do navegador (Ctrl + Shift + Del)

### ❌ "HTTP error! status: 429"

**Problema**: Limite de requisições excedido

**Solução**:
1. **RAWG**: Espere até o próximo mês (20k req/mês)
2. O site usará dados em cache automaticamente
3. Considere reduzir o número de páginas buscadas

### ❌ Imagens não carregam (fundo preto)

**Problema**: URL da imagem inválida ou não existe

**Solução**:
- O sistema automaticamente usa imagem placeholder
- Atributo `onerror` substitui imagens quebradas
- RAWG às vezes retorna URLs inválidas (API em desenvolvimento)

---

## 📊 Estrutura de Dados

### Formato de Jogo (jogosData)

```javascript
{
    id: 'resident-evil-4-remake',
    titulo: 'Resident Evil 4 Remake',
    ano: 2023,
    desenvolvedor: 'Capcom',
    sinopse: 'Remake do clássico...',
    poster: 'https://media.rawg.io/media/games/...',
    plataformas: 'PC, PlayStation 5, Xbox Series X',
    categoria: 'Action, Shooter',
    nota: 9.2,
    metacritic: 92,
    rawg_id: 123456,
    rawg_slug: 'resident-evil-4-remake'
}
```

### Formato de Filme (filmesData)

```javascript
{
    id: 'movie-550',
    titulo: 'O Exorcista',
    ano: 1973,
    diretor: 'William Friedkin',
    sinopse: 'Uma mãe desesperada...',
    poster: 'https://image.tmdb.org/t/p/w500/...',
    backdrop: 'https://image.tmdb.org/t/p/w1280/...',
    decada: '1970s',
    tipo: 'Clássico',
    genero: 'Horror',
    nota: 8.1,
    votos: 5432,
    tmdb_id: 550,
    popularidade: 234.5
}
```

### Formato de Série (seriesData)

```javascript
{
    id: 'serie-1399',
    titulo: 'Stranger Things',
    ano: 2016,
    criador: 'Irmãos Duffer',
    sinopse: 'Crianças enfrentam...',
    poster: 'https://image.tmdb.org/t/p/w500/...',
    temporadas: 4,
    streaming: 'Netflix',
    genero: 'Horror/Mystery',
    nota: 8.7,
    tmdb_id: 1399
}
```

---

## 🔮 Próximas Implementações

### Open Library API (Livros)
- [ ] Busca de livros de terror por tema
- [ ] Integração de capas de livros
- [ ] Informações de autor e ano
- [ ] Sistema de favoritos para livros da API

### Melhorias Futuras
- [ ] Paginação infinita (lazy loading)
- [ ] Filtros avançados por data de lançamento
- [ ] Detalhes expandidos ao clicar (modal)
- [ ] Trailers de filmes/jogos
- [ ] Avaliações de usuários
- [ ] Sistema de recomendações personalizado

---

## 📝 Notas Importantes

1. **Nunca compartilhe suas chaves de API publicamente**
   - Não faça commit do `api-config.js` com chaves reais
   - Use variáveis de ambiente em produção

2. **Respeite os limites das APIs**
   - RAWG: 20,000 requisições/mês
   - TMDB: Uso razoável para projetos pessoais
   - Não faça requisições em loop

3. **Cache é seu amigo**
   - Dados são cachados por 5 minutos
   - Evita requisições desnecessárias
   - Melhora performance do site

4. **Fallback sempre disponível**
   - Site funciona mesmo sem API keys
   - 20 itens hardcoded em cada categoria
   - Usuário não fica sem conteúdo

---

## 🎉 Conclusão

Agora seu site HallowTales está conectado a APIs reais e pode exibir centenas de filmes, séries e jogos de terror! 

**Benefícios:**
- ✅ Conteúdo sempre atualizado
- ✅ Imagens de alta qualidade
- ✅ Descrições profissionais
- ✅ Avaliações reais de usuários
- ✅ Dados de múltiplas plataformas

**Para começar:**
1. Configure suas chaves de API em `js/api-config.js`
2. Abra `jogos.html` ou `filmes.html` no navegador
3. Aproveite o conteúdo dinâmico!

---

## 📧 Suporte

Se encontrar problemas:
1. Verifique o Console do Desenvolvedor (F12)
2. Leia as mensagens de erro
3. Consulte a documentação das APIs
4. Verifique se suas chaves estão corretas

**Happy Coding! 👻🎃**
