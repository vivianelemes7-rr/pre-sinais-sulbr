async function buscarClimaReal() {
    console.log("Iniciando Spike: Buscando dados na API OpenMeteo...");
    
    // Coordenadas Bento
    const latitude = -29.17;
    const longitude = -51.52;
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,surface_pressure,wind_speed_10m&timezone=America%2FSao_Paulo`;

    try {
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error(`Erro na API: ${resposta.status}`);
        }

        const dados = await resposta.json();
        
        console.log("\n=== DADOS REAIS CAPTURADOS ===");
        console.log(`Temperatura: ${dados.current.temperature_2m} °C`);
        console.log(`Pressão Superfície: ${dados.current.surface_pressure} hPa`);
        console.log(`Velocidade do Vento: ${dados.current.wind_speed_10m} km/h`);
        console.log(`Horário da Coleta: ${dados.current.time}`);
        console.log("==============================\n");
        console.log("Conclusão do Spike: API do OpenMeteo responde no formato esperado e pode ser integrada ao Service na próxima etapa.");

    } catch (erro) {
        console.error("Falha ao buscar dados no Spike:", erro.message);
    }
}

buscarClimaReal();