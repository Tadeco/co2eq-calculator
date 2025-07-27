function generateReport() {
    const companyName = document.getElementById('companyName').value || 'Empresa';
    const reportPeriod = document.getElementById('reportPeriod').value || 'Não informado';
    const responsiblePerson = document.getElementById('responsiblePerson').value || 'Não informado';
    const reportDate = document.getElementById('reportDate').value || new Date().toISOString().split('T')[0];

    if (wasteData.length === 0) {
        alert('Adicione pelo menos um resíduo para gerar o relatório.');
        return;
    }

    let totalEmission = wasteData.reduce((sum, item) => sum + item.emission, 0);

    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatório de Emissões CO2e - ${companyName}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #3498db; padding-bottom: 20px; }
                .logo { max-width: 200px; max-height: 80px; margin-bottom: 20px; }
                .company-info { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #3498db; color: white; }
                .total-box { background: #27ae60; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
                .footer { margin-top: 40px; font-size: 0.9em; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
                .chart-container { text-align: center; margin: 30px 0; }
                .recommendations { background: #fff9e6; border-left: 5px solid #f39c12; padding: 20px; margin: 20px 0; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="header">
                ${companyLogo ? '<img src="' + companyLogo + '" class="logo" alt="Logo da Empresa">' : ''}
                <h1>Relatório de Emissões de CO2 Equivalente</h1>
                <h2>${companyName}</h2>
            </div>

            <div class="company-info">
                <h3>Informações do Relatório</h3>
                <div class="info-grid">
                    <div><strong>Período:</strong> ${reportPeriod}</div>
                    <div><strong>Data do Relatório:</strong> ${new Date(reportDate).toLocaleDateString('pt-BR')}</div>
                    <div><strong>Responsável:</strong> ${responsiblePerson}</div>
                    <div><strong>Metodologia:</strong> IPCC Guidelines</div>
                </div>
            </div>

            <h3>Detalhamento por Tipo de Resíduo</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tipo de Resíduo</th>
                        <th>Quantidade</th>
                        <th>Fator de Emissão</th>
                        <th>CO2e (kg)</th>
                        <th>% do Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${wasteData.map(item => {
                        let factorUnit = 'kg CO2e/kg';
                        if (item.type === 'oleo') factorUnit = 'kg CO2e/L';
                        if (item.type === 'bateria') factorUnit = 'kg CO2e/unidade';
                        
                        const percentage = ((item.emission / totalEmission) * 100).toFixed(1);
                        
                        return '<tr><td>' + item.name + '</td><td>' + item.quantity + ' ' + item.unit + '</td><td>' + item.factor + ' ' + factorUnit + '</td><td>' + item.emission.toFixed(2) + '</td><td>' + percentage + '%</td></tr>';
                    }).join('')}
                </tbody>
            </table>

            <div class="total-box">
                <h2>Total de Emissões: ${totalEmission.toFixed(2)} kg CO2e</h2>
                <p>Equivalente a ${(totalEmission/1000).toFixed(3)} toneladas de CO2</p>
            </div>

            <div class="chart-container">
                <canvas id="reportChart" width="500" height="400"></canvas>
            </div>

            <h3>Análise dos Resultados</h3>
            <p>O inventário de resíduos apresenta as seguintes características:</p>
            <ul>
                ${generateAnalysis(wasteData, totalEmission)}
            </ul>

            <div class="recommendations">
                <h4>💡 Recomendações</h4>
                <ul>
                    ${generateRecommendations(wasteData, totalEmission)}
                </ul>
            </div>

            <div class="footer">
                <p><strong>Observações:</strong></p>
                <ul>
                    <li>Os fatores de emissão utilizados são baseados em metodologias internacionais (IPCC, EPA, EEA).</li>
                    <li>Os cálculos consideram o ciclo de vida completo dos resíduos desde a produção até o descarte.</li>
                    <li>Para inventários oficiais de GEE, recomenda-se validação com fatores específicos da região.</li>
                </ul>
                <p><strong>Gerado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                <p><strong>Calculadora de Emissões CO2e</strong> - Ferramenta para cálculo de pegada de carbono</p>
            </div>

            <script>
                // Desenhar gráfico no relatório
                const canvas = document.getElementById('reportChart');
                const ctx = canvas.getContext('2d');
                const data = ${JSON.stringify(wasteData)};
                const total = ${totalEmission};
                
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = Math.min(centerX, centerY) - 80;
                
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
                
                let currentAngle = -Math.PI / 2;
                
                data.forEach((item, index) => {
                    const percentage = item.emission / total;
                    const sliceAngle = percentage * 2 * Math.PI;
                    
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                    ctx.closePath();
                    ctx.fillStyle = colors[index % colors.length];
                    ctx.fill();
                    
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    if (percentage > 0.05) {
                        const labelAngle = currentAngle + sliceAngle / 2;
                        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
                        
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 14px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(Math.round(percentage * 100) + '%', labelX, labelY);
                    }
                    
                    currentAngle += sliceAngle;
                });
                
                // Legenda
                const legendStartY = 30;
                data.forEach((item, index) => {
                    const y = legendStartY + (index * 20);
                    
                    ctx.fillStyle = colors[index % colors.length];
                    ctx.fillRect(30, y, 12, 12);
                    
                    ctx.fillStyle = '#333';
                    ctx.font = '11px Arial';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    
                    const percentage = ((item.emission / total) * 100).toFixed(1);
                    ctx.fillText(item.name + ' (' + percentage + '%)', 50, y + 1);
                });
                
                // Título
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Distribuição de Emissões por Tipo de Resíduo', centerX, canvas.height - 15);
            </script>
        </body>
        </html>
    `);
    reportWindow.document.close();
}

function generateAnalysis(data, total) {
    const sorted = [...data].sort((a, b) => b.emission - a.emission);
    const highest = sorted[0];
    const analysis = [];
    
    if (highest) {
        const percentage = ((highest.emission / total) * 100).toFixed(1);
        analysis.push(`<li><strong>${highest.name}</strong> representa ${percentage}% das emissões totais (${highest.emission.toFixed(2)} kg CO2e)</li>`);
    }
    
    if (sorted.length > 1) {
        const topTwo = ((sorted[0].emission + sorted[1].emission) / total * 100).toFixed(1);
        analysis.push(`<li>Os dois principais tipos de resíduos respondem por ${topTwo}% do total de emissões</li>`);
    }
    
    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
    analysis.push(`<li>Quantidade total de resíduos processados: ${totalQuantity.toFixed(2)} kg</li>`);
    
    return analysis.join('');
}

function generateRecommendations(data, total) {
    const sorted = [...data].sort((a, b) => b.emission - a.emission);
    const recommendations = [];
    
    if (sorted[0]) {
        recommendations.push(`<li><strong>Priorizar redução de ${sorted[0].name}:</strong> Principal fonte de emissões identificada</li>`);
    }
    
    recommendations.push('<li><strong>Programa de educação ambiental:</strong> Capacitar funcionários sobre separação adequada</li>');
    recommendations.push('<li><strong>Parcerias para reciclagem:</strong> Estabelecer vínculos com cooperativas especializadas</li>');
    recommendations.push('<li><strong>Monitoramento contínuo:</strong> Implementar acompanhamento mensal das emissões</li>');
    recommendations.push('<li><strong>Meta de redução:</strong> Estabelecer objetivo de redução de 15-25% para o próximo período</li>');
    
    return recommendations.join('');
}