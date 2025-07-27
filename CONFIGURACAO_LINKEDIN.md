# 🔐 Configuração de Login com LinkedIn - CO2eq Calculator

## Passos para Configurar o Login com LinkedIn

### 1. Criar Aplicação no LinkedIn Developers

1. Acesse [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Clique em "Create App"
3. Preencha as informações:
   - **App name**: CO2eq Calculator
   - **LinkedIn Page**: Sua página/empresa no LinkedIn
   - **App logo**: Upload do logo da sua aplicação
   - **Privacy policy URL**: Link para política de privacidade
   - **App use**: Selecione o uso apropriado

### 2. Configurar Produtos e Permissões

1. Na aba "Products", adicione:
   - **Sign In with LinkedIn**: Para autenticação básica
   - **Share on LinkedIn**: Se quiser permitir compartilhamento

2. Na aba "Auth", configure:
   - **Authorized redirect URLs**: 
     - `http://localhost:3000/callback_html.html` (desenvolvimento)
     - `https://seudominio.com/callback_html.html` (produção)

### 3. Obter Credenciais

1. Na aba "Auth", copie:
   - **Client ID**
   - **Client Secret**

### 4. Atualizar Arquivos da Aplicação

#### No arquivo `login_html.html` (linha 69):
```javascript
const LINKEDIN_CLIENT_ID = 'SEU_CLIENT_ID_AQUI'; // Substitua pelo seu Client ID
```

#### No arquivo `callback_html.html` (linhas 59-60):
```javascript
const LINKEDIN_CLIENT_ID = 'SEU_CLIENT_ID_AQUI'; // Substitua pelo seu Client ID
const LINKEDIN_CLIENT_SECRET = 'SEU_CLIENT_SECRET_AQUI'; // Substitua pelo seu Client Secret
```

### 5. Configurar CORS (Importante!)

**⚠️ AVISO DE SEGURANÇA**: O código atual faz a troca do código por token diretamente no frontend. Em produção, esta operação deve ser feita no backend para manter o `client_secret` seguro.

Para desenvolvimento local, você pode:

1. **Opção 1**: Usar um servidor local que permita CORS
2. **Opção 2**: Usar uma extensão do navegador para desabilitar CORS (apenas desenvolvimento)
3. **Opção 3**: Implementar um backend simples

### 6. Backend Recomendado (Produção)

Para produção, crie um endpoint backend:

```javascript
// Exemplo em Node.js/Express
app.post('/auth/linkedin', async (req, res) => {
  const { code } = req.body;
  
  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
      })
    });
    
    const tokenData = await tokenResponse.json();
    res.json({ access_token: tokenData.access_token });
  } catch (error) {
    res.status(500).json({ error: 'Erro na autenticação' });
  }
});
```

### 7. Variáveis de Ambiente

Crie um arquivo `.env` para suas credenciais:

```env
LINKEDIN_CLIENT_ID=seu_client_id_aqui
LINKEDIN_CLIENT_SECRET=seu_client_secret_aqui
REDIRECT_URI=https://seudominio.com/callback_html.html
```

### 8. Teste da Configuração

1. Abra `login_html.html` no navegador
2. Clique em "Entrar com LinkedIn"
3. Autorize a aplicação no LinkedIn
4. Verifique se o redirecionamento funciona
5. Confirme se os dados do perfil são carregados

### 9. URLs de Redirecionamento por Ambiente

- **Desenvolvimento**: `http://localhost:3000/callback_html.html`
- **Teste**: `https://teste.seudominio.com/callback_html.html`
- **Produção**: `https://seudominio.com/callback_html.html`

### 10. Permissões Necessárias

A aplicação solicita as seguintes permissões:
- `r_liteprofile`: Dados básicos do perfil (nome, foto)
- `r_emailaddress`: Endereço de email do usuário

## Fluxo de Autenticação

1. **Login** (`login_html.html`):
   - Usuário clica em "Entrar com LinkedIn"
   - Redireciona para autorização do LinkedIn
   - LinkedIn retorna código de autorização

2. **Callback** (`callback_html.html`):
   - Recebe código de autorização
   - Troca código por token de acesso
   - Obtém dados do perfil do usuário
   - Salva dados no localStorage
   - Redireciona para calculadora

3. **Calculadora** (`index_html.html`):
   - Verifica se usuário está autenticado
   - Carrega dados do perfil
   - Permite uso da aplicação
   - Oferece opção de logout

## Segurança

- ✅ Verificação de state para prevenir CSRF
- ✅ Validação de token antes do acesso
- ✅ Limpeza de dados ao fazer logout
- ⚠️ Client secret no frontend (mover para backend em produção)
- ⚠️ Tokens salvos no localStorage (considerar httpOnly cookies)

## Troubleshooting

### Erro "redirect_uri_mismatch"
- Verifique se a URL no LinkedIn Developers coincide exatamente com a configurada

### Erro CORS
- Implemente backend ou use servidor local com CORS habilitado

### Token inválido
- Verifique se as credenciais estão corretas
- Confirme se as permissões foram aprovadas

### Usuário não consegue acessar
- Limpe localStorage e tente novamente
- Verifique console do navegador para erros