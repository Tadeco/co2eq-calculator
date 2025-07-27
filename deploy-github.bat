@echo off
echo ========================================
echo  🚀 DEPLOY CO2eq Calculator para GitHub
echo ========================================
echo.

set /p username="Digite seu nome de usuário GitHub: "
set /p token="Digite seu Personal Access Token (opcional para repositório público): "

echo.
echo 📋 Criando repositório remoto...

REM Criar repositório via API (se token fornecido)
if not "%token%"=="" (
    curl -H "Authorization: token %token%" ^
         -H "Accept: application/vnd.github.v3+json" ^
         -d "{\"name\":\"co2eq-calculator\",\"description\":\"🌱 Carbon footprint calculator with LinkedIn authentication\",\"private\":false}" ^
         https://api.github.com/user/repos
    echo.
)

echo.
echo 🔗 Conectando repositório local ao GitHub...
git remote add origin https://github.com/%username%/co2eq-calculator.git

echo.
echo 📤 Fazendo push inicial...
git branch -M main
git push -u origin main

echo.
echo ✅ Deploy concluído!
echo.
echo 🌐 Seu repositório: https://github.com/%username%/co2eq-calculator
echo 🔧 Para ativar GitHub Pages:
echo    1. Vá para Settings → Pages
echo    2. Source: Deploy from a branch
echo    3. Branch: main
echo    4. Folder: / (root)
echo    5. Save
echo.
echo 🚀 Site estará disponível em: https://%username%.github.io/co2eq-calculator
echo.
pause