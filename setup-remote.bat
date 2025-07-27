@echo off
cd /d "C:\Users\tadec\OneDrive\Área de Trabalho\CO2eq"

echo ========================================
echo  🚀 CONECTANDO AO GITHUB
echo ========================================
echo.

REM Verificar se já existe remote
git remote -v
if %errorlevel%==0 (
    echo ⚠️ Remote já existe. Removendo...
    git remote remove origin
)

echo.
echo 🔗 Adicionando remote origin...

REM Substituir 'tadec' pelo seu usuário GitHub real
git remote add origin https://github.com/tadec/co2eq-calculator.git

echo.
echo 📤 Renomeando branch para main...
git branch -M main

echo.
echo 🚀 Fazendo push inicial...
git push -u origin main

if %errorlevel%==0 (
    echo.
    echo ✅ SUCCESS! Repositório criado com sucesso!
    echo.
    echo 🌐 Repositório: https://github.com/tadec/co2eq-calculator
    echo 🚀 Site: https://tadec.github.io/co2eq-calculator
    echo.
    echo 📋 Próximos passos:
    echo 1. Ative GitHub Pages em Settings → Pages
    echo 2. Configure LinkedIn credentials
    echo 3. Teste o site online
    echo.
) else (
    echo.
    echo ❌ ERRO no push. Possíveis causas:
    echo 1. Repositório não existe no GitHub
    echo 2. Credenciais incorretas
    echo 3. Nome de usuário errado
    echo.
    echo 💡 Solução:
    echo 1. Crie repositório em: https://github.com/new
    echo 2. Nome: co2eq-calculator
    echo 3. Execute novamente este script
    echo.
)

pause