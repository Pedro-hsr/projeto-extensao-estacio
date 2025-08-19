# BolsoCerto

Projeto de extensão — Estácio

## Sobre o aplicativo

O **BolsoCerto** é um aplicativo mobile desenvolvido como parte do projeto de extensão da Estácio. Seu objetivo é ajudar usuários a controlar suas finanças pessoais de forma simples e intuitiva.

## Funcionalidades

- **Transações:** Visualize uma lista de suas movimentações financeiras.
- **Nova Transação:** Adicione novas receitas ou despesas.
- **Categorias:** Gerencie categorias para organizar seus gastos.
- **Metas Mensais:** Defina objetivos de economia ou limite de gastos para o mês.

## Tecnologias utilizadas

- React Native
- JavaScript/TypeScript

# BolsoCerto

Projeto móvel simples para controle de gastos pessoais usado no projeto de extensão.

Este repositório contém uma app Expo/React Native (TypeScript) com telas para registrar transações, categorias e metas, além de gráficos de visualização (pizza e linha).

## Principais funcionalidades

- Registrar transações (descrição, valor, categoria)
- Gerenciar categorias
- Definir meta mensal e acompanhar progresso
- Visualizações: gráfico de pizza (gastos por categoria) e gráfico de linha (gastos por mês)

## Estrutura do projeto

- `app/` — telas da aplicação (Dashboard, Transações, Nova Transação, Categorias, Metas)
- `lib/` — lógica auxiliar (storage, analytics)
- `assets/` — imagens e fontes
- `package.json`, `app.json`, `tsconfig.json` — configuração do projeto

## Requisitos

- Node.js (recomendado LTS)
- npm ou yarn
- Expo CLI (opcional, pode usar `npx expo`)

## Instalação e execução (PowerShell)

1. Instalar dependências

```powershell
npm install
# ou: yarn
```

2. Iniciar Metro/Expo

```powershell
npx expo start
# para executar no dispositivo/emulador use as opções exibidas (qrcode / run on Android/iOS)
```

3. Testar no dispositivo

- Abra o app Expo Go no Android/iOS e escaneie o QR code mostrado pelo `expo start`.

---

Desenvolvido por Pedro-HSR para o projeto de extensão Estácio.
