# 🚀 Deploy Automático - CO2eq Calculator

## Opção 1: Script Automático (Windows)

Execute o arquivo `deploy-github.bat`:
```cmd
deploy-github.bat
```

## Opção 2: Comandos Manuais

### 1. Primeiro, crie o repositório no GitHub:
- Acesse: https://github.com/new
- Nome: `co2eq-calculator`
- Descrição: `🌱 Carbon footprint calculator with LinkedIn authentication`
- Público: ✅
- **NÃO** adicione README, .gitignore ou license
- Clique "Create repository"

### 2. Execute estes comandos (substitua SEU_USUARIO):

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\CO2eq"

# Conectar ao repositório remoto
git remote add origin https://github.com/SEU_USUARIO/co2eq-calculator.git

# Renomear branch para main
git branch -M main

# Fazer push inicial
git push -u origin main
```

### 3. Ativar GitHub Pages:
1. No repositório GitHub → Settings
2. Pages (menu lateral)
3. Source: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/ (root)"
6. Save

## Opção 3: Usar GitHub CLI (se instalado)

```bash
# Instalar GitHub CLI primeiro: https://cli.github.com/
gh repo create co2eq-calculator --public --description "🌱 Carbon footprint calculator with LinkedIn authentication"
git remote add origin https://github.com/$(gh api user --jq .login)/co2eq-calculator.git
git branch -M main
git push -u origin main
gh repo edit --enable-pages --pages-source-branch main
```

## 🎯 URL Final

Seu site ficará em:
`https://SEU_USUARIO.github.io/co2eq-calculator`

## ⚡ Teste Rápido

Após deploy, teste:
1. **Login simulado**: Acesse a URL e clique "🧪 TESTE SEM LINKEDIN"
2. **Calculadora**: Use normalmente
3. **Logout**: Teste botão "Sair"

## 🔧 Configurar LinkedIn Real

1. **LinkedIn Developers**: https://developers.linkedin.com/
2. **Authorized redirect URLs**: 
   ```
   https://SEU_USUARIO.github.io/co2eq-calculator/callback.html
   ```
3. **Atualize credenciais** nos arquivos `index.html` e `callback.html`
4. **Faça novo commit**:
   ```bash
   git add .
   git commit -m "🔧 Add LinkedIn credentials"
   git push
   ```

---

**Execute qualquer uma das opções acima para colocar seu projeto online!**