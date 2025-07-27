# 🚀 Guia para Criar Repositório GitHub - CO2eq Calculator

## ✅ Status Atual
- ✅ Git inicializado
- ✅ Arquivos commitados localmente  
- ✅ Commit inicial feito
- 🔄 **Próximo passo**: Conectar ao GitHub

## 📝 Passo a Passo

### 1. Criar Repositório no GitHub

1. **Acesse**: https://github.com
2. **Clique**: "New repository" (botão verde)
3. **Preencha**:
   - **Repository name**: `co2eq-calculator`
   - **Description**: `🌱 Carbon footprint calculator with LinkedIn authentication`
   - **Visibility**: Public (para usar GitHub Pages grátis)
   - **❌ NÃO marque**: "Add a README file"
   - **❌ NÃO marque**: "Add .gitignore" 
   - **❌ NÃO marque**: "Choose a license"
4. **Clique**: "Create repository"

### 2. Conectar Repositório Local ao GitHub

Após criar o repositório, copie os comandos da página do GitHub ou use estes:

```bash
# Ir para pasta do projeto
cd "C:\Users\tadec\OneDrive\Área de Trabalho\CO2eq"

# Adicionar origin remoto (SUBSTITUA 'seuusuario' pelo seu nome de usuário)
git remote add origin https://github.com/seuusuario/co2eq-calculator.git

# Renomear branch para main (padrão do GitHub)
git branch -M main

# Fazer push inicial
git push -u origin main
```

### 3. Ativar GitHub Pages

1. **No repositório GitHub**: Vá para "Settings"
2. **Navegue até**: "Pages" (menu lateral esquerdo)
3. **Source**: Selecione "Deploy from a branch"
4. **Branch**: Selecione "main"
5. **Folder**: Selecione "/ (root)"
6. **Clique**: "Save"

### 4. URL Final

Seu site ficará disponível em:
```
https://seuusuario.github.io/co2eq-calculator
```

### 5. Configurar LinkedIn com URL Real

1. **Acesse**: https://www.linkedin.com/developers/apps
2. **Edite sua aplicação**
3. **Auth → Authorized redirect URLs**:
   ```
   https://seuusuario.github.io/co2eq-calculator/callback.html
   ```
4. **Salve as configurações**

### 6. Atualizar Credenciais nos Arquivos

**Edite os arquivos localmente:**

1. **index.html** (linha ~201):
   ```javascript
   const LINKEDIN_CLIENT_ID = 'sua_client_id_real';
   ```

2. **callback.html** (linhas ~59-60):
   ```javascript
   const LINKEDIN_CLIENT_ID = 'sua_client_id_real';
   const LINKEDIN_CLIENT_SECRET = 'sua_client_secret_real';
   ```

### 7. Fazer Push das Alterações

```bash
cd "C:\Users\tadec\OneDrive\Área de Trabalho\CO2eq"
git add .
git commit -m "🔧 Configure LinkedIn credentials for production"
git push
```

## 🎯 URLs Importantes

- **Repositório**: `https://github.com/seuusuario/co2eq-calculator`
- **Site**: `https://seuusuario.github.io/co2eq-calculator`
- **Login**: `https://seuusuario.github.io/co2eq-calculator/index.html`
- **Calculadora**: `https://seuusuario.github.io/co2eq-calculator/calculator.html`
- **Debug**: `https://seuusuario.github.io/co2eq-calculator/debug.html`

## ⚠️ Importante

1. **Substitua** `seuusuario` pelo seu nome de usuário GitHub
2. **Configure** credenciais LinkedIn reais antes de testar OAuth
3. **GitHub Pages** pode demorar 5-10 minutos para ficar ativo
4. **Use HTTPS** sempre (GitHub Pages força HTTPS)

## 🔍 Verificar se Funcionou

1. **Acesse** sua URL do GitHub Pages
2. **Teste** login simulado primeiro
3. **Configure** LinkedIn e teste OAuth real
4. **Verifique** se todos os links funcionam

## 🤝 Colaboração

Para fazer alterações futuras:
```bash
# Fazer alterações nos arquivos
git add .
git commit -m "📝 Describe your changes"
git push
```

As alterações aparecerão no site em poucos minutos!

---

**🎉 Seu projeto estará online e funcional em aproximadamente 10 minutos!**