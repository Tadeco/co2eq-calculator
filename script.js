// Fatores de emissão em kg CO2e por kg de resíduo
const emissionFactors = {
    papel: 0.9,        // kg CO2e/kg
    plastico: 3.1,     // kg CO2e/kg
    vidro: 0.7,        // kg CO2e/kg
    metal: 1.8,        // kg CO2e/kg
    organico: 0.5,     // kg CO2e/kg
    eletronico: 12.0,  // kg CO2e/kg
    textil: 5.9,       // kg CO2e/kg
    madeira: 0.4,      // kg CO2e/kg
    oleo: 2.5,         // kg CO2e/kg (por litro)
    bateria: 8.7       // kg CO2e/unidade
};

const wasteNames = {
    papel: 'Papel/Papelão',
    plastico: 'Plástico',
    vidro: 'Vidro',
    metal: 'Metal/Alumínio',
    organico: 'Resíduo Orgânico',
    eletronico: 'Resíduo Eletrônico',
    textil: 'Têxtil',
    madeira: 'Madeira',
    oleo: 'Óleo de Cozinha',
    bateria: 'Baterias'
};

let wasteData = [];
let companyLogo = null;

// Verificar autenticação do LinkedIn
function checkAuthentication() {
    const token = localStorage.getItem('linkedin_access_token');
    if (!token) {
        // Redirecionar para página de login
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Carregar dados do usuário logado
function loadUserProfile() {
    const userProfile = localStorage.getItem('user_profile');
    if (userProfile) {
        const profile = JSON.parse(userProfile);
        // Preencher automaticamente o responsável com o nome do usuário
        document.getElementById('responsiblePerson').value = `${profile.firstName} ${profile.lastName}`;
        
        // Adicionar informações do usuário no cabeçalho
        const headerElement = document.querySelector('.header p');
        if (headerElement) {
            headerElement.innerHTML = `Converta seus resíduos em equivalente de CO2 para cálculo da pegada de carbono<br><small>Logado como: ${profile.firstName} ${profile.lastName}</small>`;
        }
    }
}

// Função de logout
function logout() {
    localStorage.removeItem('linkedin_access_token');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('linkedin_state');
    window.location.href = 'index.html';
}

// Função de teste - simular login (apenas para desenvolvimento)
function simulateLogin() {
    const mockProfile = {
        id: 'test123',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@email.com'
    };
    
    localStorage.setItem('linkedin_access_token', 'test_token_123');
    localStorage.setItem('user_profile', JSON.stringify(mockProfile));
    
    window.location.href = 'calculator.html';
}

// Configurar data atual
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação primeiro
    if (!checkAuthentication()) {
        return;
    }
    
    // Carregar dados do usuário
    loadUserProfile();
    
    document.getElementById('reportDate').value = new Date().toISOString().split('T')[0];
    
    // Configurar upload de logo
    document.getElementById('logoUploadArea').addEventListener('click', function() {
        document.getElementById('logoInput').click();
    });

    document.getElementById('logoInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Arquivo muito grande. Máximo 2MB.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                companyLogo = e.target.result;
                const logoImg = document.getElementById('companyLogo');
                const placeholder = document.getElementById('logoPlaceholder');
                
                logoImg.src = companyLogo;
                logoImg.style.display = 'block';
                placeholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Permitir adicionar com Enter
    document.getElementById('quantity').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addWaste();
        }
    });
});

function addWaste() {
    const wasteType = document.getElementById('wasteType').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const unit = document.getElementById('unit').value;

    if (!wasteType || !quantity || quantity <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos.');
        return;
    }

    // Converter para kg se necessário
    let quantityInKg = quantity;
    if (unit === 'ton') {
        quantityInKg = quantity * 1000;
    } else if (unit === 'litro' && wasteType === 'oleo') {
        quantityInKg = quantity; // Para óleo, usamos litros diretamente
    } else if (unit === 'unidade' && wasteType === 'bateria') {
        quantityInKg = quantity; // Para baterias, usamos unidades diretamente
    }

    // Calcular emissão
    let emission = 0;
    if (wasteType === 'oleo' && unit === 'litro') {
        emission = quantity * emissionFactors[wasteType];
    } else if (wasteType === 'bateria' && unit === 'unidade') {
        emission = quantity * emissionFactors[wasteType];
    } else {
        emission = quantityInKg * emissionFactors[wasteType];
    }

    const wasteItem = {
        id: Date.now(),
        type: wasteType,
        name: wasteNames[wasteType],
        quantity: quantity,
        unit: unit,
        quantityInKg: quantityInKg,
        emission: emission,
        factor: emissionFactors[wasteType]
    };

    wasteData.push(wasteItem);
    updateResults();
    clearForm();
}

function removeWaste(id) {
    wasteData = wasteData.filter(item => item.id !== id);
    updateResults();
}

function updateResults() {
    const container = document.getElementById('resultsContainer');
    
    if (wasteData.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Nenhum resíduo adicionado ainda. Adicione um resíduo acima para começar o cálculo.</p></div>';
        return;
    }

    let html = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>Tipo de Resíduo</th>
                    <th>Quantidade</th>
                    <th>Fator de Emissão</th>
                    <th>CO2e (kg)</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalEmission = 0;

    wasteData.forEach(item => {
        totalEmission += item.emission;
        
        let factorUnit = 'kg CO2e/kg';
        if (item.type === 'oleo') factorUnit = 'kg CO2e/L';
        if (item.type === 'bateria') factorUnit = 'kg CO2e/unidade';

        html += `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.quantity} ${item.unit}</td>
                <td>${item.factor} ${factorUnit}</td>
                <td><strong>${item.emission.toFixed(2)} kg</strong></td>
                <td>
                    <button class="btn btn-danger" onclick="removeWaste(${item.id})" style="padding: 8px 15px; font-size: 0.9em;">
                        🗑️ Remover
                    </button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        
        <div class="total-section">
            <h3>Total de Emissões</h3>
            <div class="total-value">${totalEmission.toFixed(2)} kg CO2e</div>
            <p>Equivalente a ${(totalEmission/1000).toFixed(3)} toneladas de CO2</p>
            
            <div class="chart-container">
                <canvas id="emissionsChart" width="400" height="400"></canvas>
            </div>
            
            <div class="report-section no-print">
                <button class="btn btn-report" onclick="generateReport()">📄 Gerar Relatório</button>
                <button class="btn btn-report" onclick="exportToPDF()">📥 Exportar PDF</button>
            </div>
        </div>
    `;

    container.innerHTML = html;
    updateChart();
}

function clearForm() {
    document.getElementById('wasteType').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('unit').value = 'kg';
}

function exportToPDF() {
    generateReport();
    setTimeout(() => {
        alert('📄 Para salvar como PDF:\n\n1. Clique com botão direito na página do relatório\n2. Selecione "Imprimir"\n3. Escolha "Salvar como PDF"\n4. Clique em "Salvar"');
    }, 1000);
}