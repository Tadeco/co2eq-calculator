# 🚀 Deploy no Vercel - CO2eq Calculator

## 🎯 Por que Vercel?

- ✅ **Mais rápido** que GitHub Pages
- ✅ **CDN global** automaticamente
- ✅ **Deploy automático** a cada push
- ✅ **Domínio personalizado** grátis
- ✅ **Analytics** inclusos
- ✅ **HTTPS** automático

## 📋 Método 1: Interface Web (Mais Fácil)

### 1. Criar Conta Vercel
1. **Acesse**: https://vercel.com
2. **Clique**: "Sign Up"
3. **Login com**: GitHub (recomendado)
4. **Autorize**: Vercel no GitHub

### 2. Import Repository
1. **Dashboard Vercel**: Clique "New Project"
2. **Import Git Repository**: Encontre `co2eq-calculator`
3. **Configure Project**:
   - Project Name: `co2eq-calculator`
   - Framework: `Other`
   - Root Directory: `./` (padrão)
   - Build Command: (deixe vazio)
   - Output Directory: (deixe vazio)
4. **Deploy**: Clique "Deploy"

### 3. URLs Automáticas
- **Produção**: `https://co2eq-calculator.vercel.app`
- **Preview**: URLs únicas para cada branch/PR

## 📋 Método 2: Vercel CLI (Avançado)

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\CO2eq"
vercel
```

### 4. Seguir Prompts
- Setup and deploy? **Y**
- Which scope? **Sua conta**
- Link to existing project? **N**
- Project name: **co2eq-calculator**
- Directory: **./** (Enter)

## 🔧 Configuração LinkedIn para Vercel

### 1. URL de Produção
Após deploy, sua URL será:
```
https://co2eq-calculator.vercel.app
```

### 2. Atualizar LinkedIn Developers
1. **Acesse**: https://developers.linkedin.com/
2. **Sua App** → Auth → Authorized redirect URLs
3. **Adicione**:
   ```
   https://co2eq-calculator.vercel.app/callback.html
   ```

### 3. Atualizar Credenciais
Edite localmente e faça push:

**index.html** (linha ~201):
```javascript
const LINKEDIN_CLIENT_ID = 'sua_client_id_real';
```

**callback.html** (linhas ~59-60):
```javascript
const LINKEDIN_CLIENT_ID = 'sua_client_id_real';
const LINKEDIN_CLIENT_SECRET = 'sua_client_secret_real';
```

### 4. Deploy Automático
```bash
git add .
git commit -m "🔧 Configure LinkedIn for Vercel"
git push
```

**Vercel fará deploy automático!**

## 🌐 URLs Finais

### Produção
- **Site**: https://co2eq-calculator.vercel.app
- **Login**: https://co2eq-calculator.vercel.app/index.html
- **Calculadora**: https://co2eq-calculator.vercel.app/calculator.html
- **Debug**: https://co2eq-calculator.vercel.app/debug.html

### Dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Analytics**: Tráfego e performance
- **Deployments**: Histórico de deploys

## ⚡ Vantagens do Vercel

### Performance
- **CDN Global**: Site carrega de qualquer lugar
- **Edge Functions**: Funções serverless
- **Image Optimization**: Imagens otimizadas
- **Analytics**: Métricas de performance

### DevOps
- **Deploy Automático**: Push → Deploy
- **Preview URLs**: Cada branch tem URL
- **Rollback**: Voltar versões facilmente
- **Custom Domains**: Domínio próprio grátis

## 🧪 Teste Vercel vs GitHub Pages

| Recurso | GitHub Pages | Vercel |
|---------|--------------|--------|
| Velocidade | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| CDN Global | ❌ | ✅ |
| Deploy Automático | ✅ | ✅ |
| Analytics | ❌ | ✅ |
| Custom Domain | ✅ | ✅ |
| Serverless Functions | ❌ | ✅ |

## 🎯 Passo a Passo Resumido

1. **Acesse**: https://vercel.com
2. **Login**: Com GitHub
3. **Import**: Repositório `co2eq-calculator`
4. **Deploy**: Um clique
5. **Teste**: https://co2eq-calculator.vercel.app
6. **Configure**: LinkedIn para URL do Vercel

## 🔒 Variáveis de Ambiente (Segurança)

Para produção, use variáveis de ambiente:

1. **Vercel Dashboard** → Project → Settings
2. **Environment Variables**:
   - `LINKEDIN_CLIENT_ID`: sua_client_id
   - `LINKEDIN_CLIENT_SECRET`: sua_client_secret
3. **Redeploy**: Para aplicar mudanças

---

**🚀 Em 5 minutos seu site estará no Vercel com performance máxima!**