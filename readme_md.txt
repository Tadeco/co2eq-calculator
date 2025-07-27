# 🌱 Calculadora de Emissões CO2e

Uma ferramenta web para calcular emissões de CO2 equivalente a partir de diferentes tipos de resíduos, com geração automática de relatórios profissionais e autenticação via LinkedIn.

## 📋 Características

- ✅ **Autenticação LinkedIn** com OAuth 2.0 seguro
- ✅ **10 tipos de resíduos** com fatores de emissão baseados em dados científicos
- ✅ **Múltiplas unidades** (kg, toneladas, litros, unidades)
- ✅ **Gráfico de pizza interativo** com distribuição visual
- ✅ **Upload de logo** da empresa
- ✅ **Geração de relatórios** profissionais em PDF
- ✅ **Interface responsiva** para desktop e mobile
- ✅ **Referências bibliográficas** completas
- ✅ **Preenchimento automático** de dados do usuário

## 🗂️ Estrutura do Projeto

```
CO2eq/
├── login_html.html           # Página de login com LinkedIn (PONTO DE ENTRADA)
├── callback_html.html        # Callback OAuth do LinkedIn
├── index_html.html           # Página principal da calculadora (protegida)
├── styles_css.css            # Estilos CSS
├── script_js.js              # JavaScript principal + autenticação
├── chart_js.js               # Funções do gráfico de pizza
├── report_js.js              # Geração de relatórios
├── exemplo_html.html         # Página de exemplo para PDF
├── readme_md.txt             # Esta documentação
└── CONFIGURACAO_LINKEDIN.md  # Guia de configuração LinkedIn
```

## 🚀 Como Usar

### 1. Configuração Inicial
1. **Configure aplicação LinkedIn** - siga o guia em `CONFIGURACAO_LINKEDIN.md`
2. **Baixe todos os arquivos** para uma pasta chamada `CO2eq`
3. **Atualize credenciais** nos arquivos `login_html.html` e `callback_html.html`
4. **Abra `login_html.html`** em seu navegador (PONTO DE ENTRADA)

### 2. Funcionamento
1. **Faça login com LinkedIn** - clique no botão de login
2. **Autorize a aplicação** no LinkedIn
3. **Adicione logo da empresa** (opcional) - clique na área destinada
4. **Preencha informações da empresa** - nome, período (responsável preenchido automaticamente)
5. **Adicione resíduos** - selecione tipo, quantidade e unidade
6. **Visualize resultados** - tabela e gráfico atualizados automaticamente
7. **Gere relatório** - clique em "Gerar Relatório"
8. **Exporte para PDF** - use Ctrl+P na janela do relatório
9. **Faça logout** - clique em "Sair" no canto superior direito

### 3. Exemplo Rápido
- Abra `exemplo.html` para ver um relatório já pronto
- Clique em "EXPORTAR COMO PDF" para testar a funcionalidade

## 📊 Tipos de Resíduos Suportados

| Tipo | Fator de Emissão | Unidade |
|------|------------------|---------|
| Papel/Papelão | 0.9 kg CO2e/kg | kg, ton |
| Plástico | 3.1 kg CO2e/kg | kg, ton |
| Vidro | 0.7 kg CO2e/kg | kg, ton |
| Metal/Alumínio | 1.8 kg CO2e/kg | kg, ton |
| Resíduo Orgânico | 0.5 kg CO2e/kg | kg, ton |
| Resíduo Eletrônico | 12.0 kg CO2e/kg | kg, ton |
| Têxtil | 5.9 kg CO2e/kg | kg, ton |
| Madeira | 0.4 kg CO2e/kg | kg, ton |
| Óleo de Cozinha | 2.5 kg CO2e/L | litros |
| Baterias | 8.7 kg CO2e/unidade | unidades |

## 📚 Referências Bibliográficas

Os fatores de emissão são baseados em:

- **IPCC Guidelines (2019)** - Padrão internacional para inventários de GEE
- **EPA WARM Model** - Modelo americano amplamente utilizado
- **European Environment Agency** - Diretrizes europeias
- **MCTI Brasil** - Comunicação nacional sobre mudanças climáticas
- **DEFRA UK** - Fatores de conversão do governo britânico

## ⚠️ Aviso Importante

Os fatores de emissão são **valores aproximados para fins demonstrativos**. Para aplicações oficiais ou estudos científicos, recomenda-se utilizar fatores específicos validados para sua região.

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilos e responsividade
- **JavaScript Vanilla** - Funcionalidades interativas
- **LinkedIn OAuth 2.0** - Autenticação segura
- **Canvas API** - Gráficos de pizza
- **FileReader API** - Upload de imagens
- **localStorage** - Persistência de sessão

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge (versões recentes)
- ✅ Dispositivos móveis (tablets e smartphones)
- ✅ Impressão/PDF nativo do navegador

## 🎯 Funcionalidades Principais

### Calculadora Principal (`index.html`)
- Interface completa para entrada de dados
- Validação de campos obrigatórios
- Cálculos automáticos em tempo real
- Gráfico interativo com legendas
- Sistema de remoção de itens

### Geração de Relatórios
- Cabeçalho com logo da empresa
- Informações completas do relatório
- Tabela detalhada com percentuais
- Gráfico de pizza colorido
- Análise automática dos resultados
- Recomendações estratégicas
- Observações metodológicas

### Exemplo Demonstrativo (`exemplo.html`)
- Relatório pré-preenchido
- Pronto para exportação PDF
- Demonstra layout final

## 📥 Como Exportar PDF

1. **Método Recomendado:**
   - Clique em "Gerar Relatório" na calculadora
   - Na nova janela, pressione `Ctrl+P` (Windows) ou `Cmd+P` (Mac)
   - Selecione "Salvar como PDF"
   - Ajuste margens se necessário
   - Clique em "Salvar"

2. **Método Alternativo:**
   - Abra `exemplo.html`
   - Clique em "EXPORTAR COMO PDF"
   - Siga os mesmos passos acima

## 🔧 Personalização

### Adicionar Novos Tipos de Resíduos
1. Edite o objeto `emissionFactors` em `script.js`
2. Adicione entrada correspondente em `wasteNames`
3. Inclua nova opção no select em `index.html`

### Modificar Fatores de Emissão
- Edite os valores no objeto `emissionFactors` em `script.js`
- Atualize as referências bibliográficas conforme necessário

### Personalizar Cores do Gráfico
- Modifique o array `colors` na função `updateChart()` em `chart.js`

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto:
- Consulte a documentação científica das referências
- Verifique a compatibilidade do navegador
- Teste com diferentes tipos de resíduos

## 📄 Licença

Este projeto é fornecido como ferramenta educacional e demonstrativa. Para uso comercial ou oficial, recomenda-se validação com especialistas em inventários de GEE.

---

**Desenvolvido com foco em sustentabilidade e precisão científica** 🌍