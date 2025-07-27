# 🧪 Como Testar o Login LinkedIn - Guia Rápido

## Opção 1: Teste Básico (Sem LinkedIn Real)

### 1. Simular Login Local
Edite o arquivo `script_js.js` e adicione esta função de teste:

```javascript
// Função de teste - simular login
function simulateLogin() {
    const mockProfile = {
        id: 'test123',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@email.com'
    };
    
    localStorage.setItem('linkedin_access_token', 'test_token_123');
    localStorage.setItem('user_profile', JSON.stringify(mockProfile));
    
    window.location.href = 'index_html.html';
}
```

### 2. Adicionar Botão de Teste
No arquivo `login_html.html`, adicione após o botão LinkedIn:

```html
<button onclick="simulateLogin()" style="background: #28a745; color: white; padding: 15px; margin-top: 10px; border: none; border-radius: 8px; width: 100%;">
    🧪 TESTE SEM LINKEDIN (Dev Mode)
</button>
```

### 3. Testar
1. Abra `login_html.html`
2. Clique em "TESTE SEM LINKEDIN"
3. Deve redirecionar para calculadora
4. Verifique se nome aparece no cabeçalho
5. Teste logout

## Opção 2: Configuração LinkedIn Real

### 1. Criar Aplicação LinkedIn
1. Acesse: https://www.linkedin.com/developers/apps
2. Clique "Create app"
3. Preencha:
   - **App name**: CO2eq Calculator
   - **LinkedIn Page**: Sua página pessoal/empresa
   - **App logo**: Qualquer imagem
   - **Privacy policy**: `https://example.com/privacy` (temporário)

### 2. Configurar Permissões
Na aba "Products":
- Adicione "Sign In with LinkedIn"
- Aguarde aprovação (pode ser instantâneo)

### 3. Configurar Redirecionamento
Na aba "Auth" → "Authorized redirect URLs":
```
http://localhost:8080/callback_html.html
http://127.0.0.1:8080/callback_html.html
file:///[caminho_completo]/callback_html.html
```

### 4. Copiar Credenciais
Na aba "Auth":
- Copie o **Client ID**
- Copie o **Client Secret**

### 5. Atualizar Arquivos
**login_html.html** (linha ~69):
```javascript
const LINKEDIN_CLIENT_ID = 'SUA_CLIENT_ID_AQUI';
```

**callback_html.html** (linhas ~59-60):
```javascript
const LINKEDIN_CLIENT_ID = 'SUA_CLIENT_ID_AQUI';
const LINKEDIN_CLIENT_SECRET = 'SUA_CLIENT_SECRET_AQUI';
```

### 6. Servidor Local (Necessário para CORS)
```bash
# Python 3
python -m http.server 8080

# Node.js (se tiver npx)
npx serve . -p 8080

# PHP
php -S localhost:8080
```

### 7. Testar
1. Abra: `http://localhost:8080/login_html.html`
2. Clique "Entrar com LinkedIn"
3. Autorize no LinkedIn
4. Deve voltar para calculadora

## ⚠️ Problemas Comuns

### CORS Error
- **Solução**: Use servidor local (não abra direto como file://)
- **Alternativa**: Use extensão CORS no navegador (só desenvolvimento)

### redirect_uri_mismatch
- **Solução**: URLs no LinkedIn devem ser EXATAMENTE iguais às configuradas

### Client ID/Secret inválido
- **Solução**: Copie novamente do LinkedIn Developers

### Token inválido
- **Solução**: Limpe localStorage e tente novamente:
```javascript
localStorage.clear();
```

## 🔧 Debug Mode

Adicione no console do navegador para debug:
```javascript
// Ver dados salvos
console.log('Token:', localStorage.getItem('linkedin_access_token'));
console.log('Profile:', localStorage.getItem('user_profile'));

// Limpar dados
localStorage.clear();

// Verificar se está autenticado
console.log('Autenticado:', !!localStorage.getItem('linkedin_access_token'));
```

## ✅ Checklist de Teste

- [ ] Login simulado funciona
- [ ] Redirecionamento após login
- [ ] Nome aparece no cabeçalho
- [ ] Campo responsável preenchido automaticamente
- [ ] Botão logout funciona
- [ ] Após logout, redireciona para login
- [ ] Calculadora protegida (só acessa se logado)
- [ ] Dados persistem após refresh da página

## 🚀 Teste Rápido (5 minutos)

Use a **Opção 1** primeiro para testar toda a funcionalidade sem precisar configurar LinkedIn. Depois, se tudo funcionar, configure o LinkedIn real.