# 🔧 Configuração LinkedIn Real - CO2eq Calculator

## 🎯 URL do Seu Site
**Vercel**: https://co2eq-calculator.vercel.app

## 📋 Passo a Passo LinkedIn Developers

### 1. Criar/Editar Aplicação LinkedIn
1. **Acesse**: https://www.linkedin.com/developers/apps
2. **Clique**: "Create app" (ou edite existente)
3. **Preencha**:
   - **App name**: CO2eq Calculator
   - **LinkedIn Page**: Sua página pessoal/empresa
   - **App logo**: Logo da aplicação
   - **Privacy policy URL**: `https://co2eq-calculator.vercel.app/privacy.html`
   - **App description**: Calculadora de pegada de carbono para resíduos

### 2. Configurar Produtos
1. **Aba "Products"**:
   - Adicione: **"Sign In with LinkedIn using OpenID Connect"**
   - Aguarde aprovação (geralmente instantâneo)

### 3. Configurar URLs de Redirecionamento
1. **Aba "Auth"**:
2. **"Authorized redirect URLs"**:
   ```
   https://co2eq-calculator.vercel.app/callback.html
   ```
3. **Salvar**

### 4. Copiar Credenciais
1. **Aba "Auth"**:
2. **Copie**:
   - **Client ID**: `78zy6m3i8j3iad` (exemplo - use o seu)
   - **Client Secret**: `abc123xyz789` (exemplo - use o seu)

## 🔧 Atualizar Arquivos

### Arquivo: index.html (linha 175)
```javascript
const LINKEDIN_CLIENT_ID = 'SUA_CLIENT_ID_REAL_AQUI';
```

### Arquivo: callback.html (linhas 96-97)
```javascript
const LINKEDIN_CLIENT_ID = 'SUA_CLIENT_ID_REAL_AQUI';
const LINKEDIN_CLIENT_SECRET = 'SUA_CLIENT_SECRET_REAL_AQUI';
```

## 🚀 Deploy das Alterações

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\CO2eq"
git add .
git commit -m "🔧 Configure LinkedIn OAuth credentials"
git push
```

**Vercel fará deploy automático em ~30 segundos!**

## 🧪 Testar LinkedIn OAuth

1. **Aguarde** deploy do Vercel (30s)
2. **Acesse**: https://co2eq-calculator.vercel.app
3. **Clique**: "Entrar com LinkedIn"
4. **Autorize** a aplicação no LinkedIn
5. **Deve** redirecionar para calculadora

## ⚠️ Problemas Comuns

### "redirect_uri_mismatch"
- **Solução**: URL no LinkedIn deve ser EXATAMENTE:
  ```
  https://co2eq-calculator.vercel.app/callback.html
  ```

### "invalid_client_id"
- **Solução**: Verificar se Client ID está correto

### "unauthorized_client"
- **Solução**: Aguardar aprovação do produto "Sign In with LinkedIn"

### CORS Error
- **Solução**: Client Secret deve ficar no backend (não frontend)

## 🔒 Segurança (Recomendado)

Para produção real, implemente backend:

1. **Vercel Functions** (grátis):
   - Crie `/api/linkedin-auth.js`
   - Mova Client Secret para lá
   - Use variáveis de ambiente

2. **Variáveis de Ambiente Vercel**:
   - Dashboard → Project → Settings → Environment Variables
   - `LINKEDIN_CLIENT_ID`: sua_client_id
   - `LINKEDIN_CLIENT_SECRET`: sua_client_secret

## ✅ Checklist Final

- [ ] Aplicação LinkedIn criada
- [ ] Produto "Sign In" aprovado
- [ ] URL redirecionamento configurada
- [ ] Client ID atualizada nos arquivos
- [ ] Client Secret atualizada nos arquivos
- [ ] Deploy feito no Vercel
- [ ] Teste de login funcionando

## 🎉 Resultado Final

Após configuração:
- ✅ Login LinkedIn real funcionando
- ✅ Sem loops infinitos
- ✅ Interface limpa (sem botão dev)
- ✅ Site profissional no Vercel

---

**Execute os passos acima para ativar LinkedIn OAuth real!**