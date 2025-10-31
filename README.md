# 🕷️ Portal do Medo

Um site completo dedicado aos amantes de histórias de terror, mistérios urbanos e lendas assustadoras.

## 📋 Sobre o Projeto

O Portal do Medo é uma plataforma interativa que oferece:

- **Top 10 Livros de Terror**: Resumos detalhados dos livros de terror mais vendidos de todos os tempos
- **Cidades Assombradas**: Histórias reais, lendas de terror e fatos curiosos sobre locais assombrados ao redor do mundo
- **Interface Imersiva**: Design dark com tema de terror, animações e efeitos visuais

## 🎨 Características

### Página Inicial (index.html)
- Apresentação do site com efeito de digitação no título
- Cards interativos para navegação
- Design responsivo e moderno

### Página de Livros (livros.html)
- Lista dos 10 livros de terror mais vendidos
- Resumos completos de cada obra
- Sistema de busca por título ou autor
- Contador dinâmico de resultados
- Numeração visual dos livros
- Animações de entrada suaves

### Página de Cidades (cidades.html)
- 10 cidades assombradas ao redor do mundo
- Três tipos de informação para cada cidade:
  - 📖 História Real
  - 👻 História de Terror
  - 💡 Fatos Curiosos
- Botões interativos para revelar cada tipo de informação
- Sistema de busca por nome da cidade
- Contador de resultados

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: 
  - Gradientes e sombras
  - Animações e transições
  - Grid e Flexbox para layout
  - Design responsivo
  - Google Fonts (Creepster, Nosifer, Roboto)
- **JavaScript**: 
  - Manipulação do DOM
  - Sistema de busca e filtros
  - Interatividade dinâmica
  - Animações personalizadas

## 📁 Estrutura do Projeto

```
teste1/
│
├── index.html          # Página inicial
├── livros.html         # Página de livros
├── cidades.html        # Página de cidades
├── README.md           # Documentação
│
├── css/
│   └── style.css       # Estilos globais
│
└── js/
    ├── script.js       # Scripts da página inicial
    ├── livros.js       # Lógica da página de livros
    └── cidades.js      # Lógica da página de cidades
```

## 🚀 Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. Navegue pelas seções usando o menu superior
3. Use as barras de busca para filtrar conteúdo
4. Na página de cidades, clique nos botões para revelar diferentes tipos de informação

## 🎭 Tema Visual

- **Cores principais**: 
  - Preto (#000000, #0a0a0a)
  - Vermelho sangue (#ff0000, #8b0000)
  - Tons de cinza escuro
- **Fontes**: 
  - Creepster (títulos de terror)
  - Nosifer (títulos especiais)
  - Roboto (texto corpo)
- **Efeitos**: 
  - Flickering no título principal
  - Animações de hover
  - Transições suaves
  - Gradientes sombrios

## ⚠️ Aviso de Conteúdo

Este site contém descrições de terror intenso. Recomendado para maiores de 16 anos.

## 📱 Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## � Analytics & Tracking

### Vercel Analytics Instalado ✅

O projeto está configurado com **Vercel Analytics** para rastrear:
- 📈 Visualizações de página
- 👥 Visitantes únicos
- 🌍 Localização geográfica
- 📱 Tipos de dispositivos
- 🎯 Eventos personalizados (favoritos, quiz, etc.)

#### Quick Start:

```bash
# 1. Instalar dependências
npm install

# 2. Deploy no Vercel
npm i -g vercel
vercel --prod

# 3. Ativar Analytics no dashboard
# Settings > Analytics > Enable Web Analytics
```

📚 **Documentação completa:**
- [VERCEL_ANALYTICS_GUIDE.md](VERCEL_ANALYTICS_GUIDE.md) - Como usar analytics
- [VERCEL_DEPLOY_GUIDE.md](VERCEL_DEPLOY_GUIDE.md) - Como fazer deploy
- [INSTALLATION_SUMMARY.md](INSTALLATION_SUMMARY.md) - Resumo da instalação

## 🔮 Funcionalidades Implementadas

- [x] Sistema de favoritos com localStorage
- [x] Integração com TMDB API (filmes e séries)
- [x] Integração com Open Library API (livros)
- [x] Quiz interativo de filmes de terror
- [x] Pesquisa em tempo real
- [x] Design moderno com Shadcn-UI e Tailwind CSS
- [x] Analytics com Vercel Analytics
- [x] Rastreamento de eventos personalizados
- [ ] Modo claro/escuro
- [ ] Compartilhamento em redes sociais
- [ ] Sistema de comentários
- [ ] PWA (Progressive Web App)

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Via Vercel CLI
vercel --prod
```

Ou conecte seu repositório GitHub diretamente no [Vercel Dashboard](https://vercel.com/dashboard).

### Outras Plataformas

O projeto é 100% estático e pode ser hospedado em:
- GitHub Pages
- Netlify
- Cloudflare Pages
- Firebase Hosting

---

**Desenvolvido com ❤️ e 💀 para os amantes de terror**
**Com 📊 analytics by Vercel**
