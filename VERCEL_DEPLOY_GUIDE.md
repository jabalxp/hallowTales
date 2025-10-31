# 🚀 Deploy no Vercel - Guia Rápido

## Pré-requisitos
- Conta no GitHub (para conectar o repositório)
- Conta no Vercel (gratuita)

## 📋 Passo a Passo

### 1️⃣ Preparar o Repositório

Primeiro, inicialize um repositório Git se ainda não tiver:

```bash
git init
git add .
git commit -m "Initial commit - HallowTales com Vercel Analytics"
```

### 2️⃣ Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Crie um novo repositório (ex: `hallowtales`)
3. **NÃO** adicione README, .gitignore ou licença (já temos)
4. Copie o comando de push:

```bash
git remote add origin https://github.com/SEU-USUARIO/hallowtales.git
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy no Vercel

#### Opção A: Via Dashboard (Recomendado)

1. Acesse https://vercel.com
2. Clique em **"Add New Project"**
3. Clique em **"Import Git Repository"**
4. Selecione seu repositório do GitHub
5. Configure o projeto:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (deixe em branco)
   - **Output Directory**: `./`
6. Clique em **"Deploy"**

#### Opção B: Via Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Login no Vercel
vercel login

# Deploy
vercel

# Seguir as instruções:
# - Set up and deploy? Yes
# - Which scope? [Seu usuário/team]
# - Link to existing project? No
# - What's your project's name? hallowtales
# - In which directory is your code located? ./
# - Want to override the settings? No

# Deploy para produção
vercel --prod
```

### 4️⃣ Ativar Analytics no Vercel

1. No dashboard do Vercel, acesse seu projeto
2. Vá em **"Settings"** (configurações)
3. No menu lateral, clique em **"Analytics"**
4. Clique no botão **"Enable Web Analytics"**
5. Pronto! Os dados começarão a aparecer em alguns minutos

### 5️⃣ Configurar Domínio Personalizado (Opcional)

1. No dashboard do projeto, vá em **"Settings" > "Domains"**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções do Vercel
4. Aguarde a propagação (pode levar até 48h)

## 📊 Visualizando os Analytics

Após ativar e ter algumas visitas:

1. No dashboard do Vercel, acesse seu projeto
2. Clique na aba **"Analytics"**
3. Você verá:
   - **Overview**: Visão geral de visitas
   - **Top Pages**: Páginas mais visitadas
   - **Top Referrers**: De onde vêm os visitantes
   - **Countries**: Localização geográfica
   - **Devices**: Desktop vs Mobile vs Tablet
   - **Browsers**: Quais navegadores
   - **Custom Events**: Seus eventos personalizados

### Filtros Disponíveis

- Período: Last 24h, 7 days, 30 days, All time
- Plataforma: All, Desktop, Mobile, Tablet
- País: Todos ou específico
- Browser: Todos ou específico

## 🔄 Atualizações Automáticas

Após o primeiro deploy, qualquer push para a branch `main` irá automaticamente:

1. Fazer novo deploy
2. Executar verificações
3. Atualizar o site em produção
4. Notificar via email/Discord (se configurado)

```bash
# Fazer uma atualização
git add .
git commit -m "Adicionar nova funcionalidade"
git push origin main

# O Vercel irá automaticamente fazer deploy!
```

## 🌿 Deploy de Branches (Preview)

O Vercel cria URLs de preview automaticamente para cada branch/PR:

```bash
# Criar nova branch para teste
git checkout -b nova-feature

# Fazer alterações
git add .
git commit -m "Testar nova feature"
git push origin nova-feature

# O Vercel cria automaticamente uma URL de preview!
# Exemplo: hallowtales-git-nova-feature-seu-usuario.vercel.app
```

## 🔒 Variáveis de Ambiente (Se necessário)

Se você tiver API keys ou secrets:

1. No dashboard, vá em **"Settings" > "Environment Variables"**
2. Adicione as variáveis:
   - **Key**: `TMDB_API_KEY`
   - **Value**: `sua-api-key-aqui`
   - **Environment**: Production, Preview, Development
3. Clique em **"Save"**
4. Faça redeploy para aplicar as mudanças

No código JavaScript, acesse via:
```javascript
// NOTA: Em projetos frontend estáticos, variáveis de ambiente
// NÃO são secretas! Qualquer pessoa pode ver no código.
// Use apenas para configurações, não para API keys sensíveis.
```

## 📱 Configurações Adicionais

### Adicionar Badge no README

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/SEU-USUARIO/hallowtales)
```

### Webhooks (Notificações)

Configure webhooks para notificações de deploy:

1. **Settings** > **Git** > **Deploy Hooks**
2. Adicione URL do seu Discord/Slack
3. Escolha os eventos: deployment, build success/failure

### Headers Personalizados

Adicione um arquivo `vercel.json` na raiz do projeto:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Redirects

No mesmo arquivo `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/index.html",
      "permanent": true
    }
  ]
}
```

## 🐛 Troubleshooting

### Build falhou
- Verifique se todos os arquivos estão commitados
- Veja os logs no dashboard do Vercel
- Teste localmente primeiro

### Analytics não aparecem
- Aguarde alguns minutos após ativar
- Faça algumas visitas no site
- Certifique-se que não está bloqueando com AdBlock
- Verifique se o script está carregando (F12 > Network)

### Domínio não funciona
- Aguarde propagação DNS (até 48h)
- Verifique configuração dos records:
  - Type: A, Name: @, Value: 76.76.21.21
  - Type: CNAME, Name: www, Value: cname.vercel-dns.com

## 📚 Links Úteis

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Analytics Docs](https://vercel.com/docs/analytics)
- [Vercel Status](https://www.vercel-status.com/)
- [Community Forum](https://github.com/vercel/vercel/discussions)

## 💰 Limites do Plano Gratuito (Hobby)

- ✅ Unlimited projects
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Analytics básico (pageviews, top pages)
- ✅ SSL automático
- ✅ Preview deployments
- ⚠️ Custom events limitados (1000/mês no free tier)

Para projetos pessoais, o plano gratuito é mais que suficiente!

## 🎉 Pronto!

Seu site HallowTales agora está:
- ✅ Hospedado no Vercel
- ✅ Com HTTPS automático
- ✅ Analytics funcionando
- ✅ Deploy automático
- ✅ Pronto para o mundo! 🌍

**URL do seu site:** https://seu-projeto.vercel.app

---

🎃 **Happy Haunting!** Seu site de terror está online e rastreando visitantes! 👻
