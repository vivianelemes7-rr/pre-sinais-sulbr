# 🌦️ API de Monitoramento Climático - Sul do Brasil

Este projeto é o MVP de uma aplicação focada no monitoramento de eventos severos (como tornados e ciclones) na região Sul. A API integra dados históricos locais com informações em tempo real de fontes externas.

## Visão de Produto e Carreira
Desenvolvi este projeto como parte da minha transição estratégica para o desenvolvimento Back-End. Com background em Design e UX, meu objetivo foi compreender o "todo" de um produto digital, unindo a robustez da "casa de máquinas" com a excelência na entrega de dados para o usuário final.

## Tecnologias e Arquitetura
- **Node.js** com **Express**
- **MySQL** (Modelagem Relacional com DBeaver)
- **Arquitetura em Camadas (SoC)**: Divisão clara em Models, Services, Controllers e Routes
- **Segurança e Boas Práticas**: Dotenv, Cors, Helmet e Logs customizados

## Diferenciais Técnicos (Extras)
- **Integração em Tempo Real**: Consumo da API pública Open-Meteo via Service especializado.
- **Tratamento de Erros Centralizado**: Middleware que intercepta falhas e padroniza respostas JSON.
- **Sistema de Auditoria (Logs)**: Rastreamento automático de todas as requisições no terminal.

## 📂 Como testar
As rotas podem ser testadas através do arquivo `tests/pre_sinais_api_test.rest` utilizando a extensão REST Client no VS Code.