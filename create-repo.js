#!/usr/bin/env node

// Script para criar repositório GitHub automaticamente
const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Criando repositório CO2eq Calculator no GitHub...\n');

rl.question('Digite seu nome de usuário GitHub: ', (username) => {
  rl.question('Digite seu Personal Access Token (deixe vazio se não tiver): ', (token) => {
    
    const repoData = JSON.stringify({
      name: 'co2eq-calculator',
      description: '🌱 Carbon footprint calculator with LinkedIn authentication',
      private: false,
      auto_init: false,
      has_issues: true,
      has_projects: true,
      has_wiki: false
    });

    if (token) {
      // Criar via API
      const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/user/repos',
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'CO2eq-Calculator-Setup',
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(repoData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 201) {
            console.log('\n✅ Repositório criado com sucesso!');
            console.log(`🔗 URL: https://github.com/${username}/co2eq-calculator`);
            setupGitRemote(username);
          } else {
            console.log('\n❌ Erro ao criar repositório:', JSON.parse(data));
            console.log('\n💡 Crie manualmente em: https://github.com/new');
            setupGitRemote(username);
          }
        });
      });

      req.on('error', (e) => {
        console.log('\n❌ Erro de conexão:', e.message);
        console.log('\n💡 Crie manualmente em: https://github.com/new');
        setupGitRemote(username);
      });

      req.write(repoData);
      req.end();
    } else {
      console.log('\n💡 Sem token fornecido. Crie o repositório manualmente:');
      console.log('1. Acesse: https://github.com/new');
      console.log('2. Nome: co2eq-calculator');
      console.log('3. Descrição: 🌱 Carbon footprint calculator with LinkedIn authentication');
      console.log('4. Público: ✅');
      console.log('5. NÃO adicione README, .gitignore ou license');
      console.log('6. Clique "Create repository"');
      setupGitRemote(username);
    }

    rl.close();
  });
});

function setupGitRemote(username) {
  const { spawn } = require('child_process');
  
  console.log('\n🔗 Configurando git remoto...');
  
  const commands = [
    ['git', ['remote', 'add', 'origin', `https://github.com/${username}/co2eq-calculator.git`]],
    ['git', ['branch', '-M', 'main']],
    ['git', ['push', '-u', 'origin', 'main']]
  ];

  function runCommand(index) {
    if (index >= commands.length) {
      console.log('\n🎉 Deploy concluído!');
      console.log(`\n🌐 Repositório: https://github.com/${username}/co2eq-calculator`);
      console.log(`🚀 Site (após ativar Pages): https://${username}.github.io/co2eq-calculator`);
      console.log('\n📋 Para ativar GitHub Pages:');
      console.log('1. Vá para Settings → Pages');
      console.log('2. Source: Deploy from a branch');
      console.log('3. Branch: main');
      console.log('4. Folder: / (root)');
      console.log('5. Save');
      return;
    }

    const [cmd, args] = commands[index];
    console.log(`Executando: ${cmd} ${args.join(' ')}`);
    
    const process = spawn(cmd, args, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });

    process.on('close', (code) => {
      if (code === 0) {
        runCommand(index + 1);
      } else {
        console.log(`❌ Erro no comando: ${cmd} ${args.join(' ')}`);
        console.log('💡 Execute manualmente os comandos restantes.');
      }
    });
  }

  runCommand(0);
}