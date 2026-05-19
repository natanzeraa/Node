# Autenticação de dois fatores com TOTP Authentication

API para gerenciamento de autenticação, desenvolvida em Node.js com Express e MongoDB.

Para autenticar em 2 fatores com app de autenticação externo, fique a vontade para usar o que for da sua preferência. Em meus testes utilizei o app do Google.

Esta API está sendo consumida em um aplicativo construído por mim em Flutter que pode ser encontrado no seguinte repositório:

- (**google-2FA-mobile**)[https://github.com/natanzeraa/google-2FA-mobile.git]

## Funcionalidades

- Cadastro e autenticação de usuários
- Validação de dados com Zod
- Proteção de rotas com JWT
- Verificação de identidade com Google Authenticator
- Validação de autenticidade com Refresh Token em futuros logins

## Estrutura do Projeto

```
src/
  config/           # Configuração do banco de dados
  controllers/      # Lógica dos endpoints
  middlewares/      # Middlewares de validação e autenticação
  models/           # Modelos Mongoose (MongoDB)
  routes/           # Rotas da API
  services/         # Regras de negócio
  utils/            # Utilitários, mensagens e validações
  mocks/            # Mock de dados para testar validação de token em requisições protegidas
```

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/natanzeraa/google-2FA-mobile.git
   ```
2. Instale as dependências:
   ```sh
   npm ci
   ```
3. Configure o arquivo `.env` conforme o exemplo em `.env.example`.

## Executando o Projeto

```sh
npm run dev
```

## Endpoints Principais

- `POST /auth/signup` — Cadastro de usuário
- `POST /auth/login` — Login de usuário
- `POST /auth/2fa/enable` — Ativa 2FA
- `POST /auth/2fa/check` — Confere está funcionando 2FA
- `POST /auth/2fa/disable` — Desativa 2FA
- `GET /appointments` — Listar clientes (autenticado)

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB & Mongoose
- JWT
- Zod
- Bcrypt
- OTP Auth

## Observações

- É necessário ter o MongoDB rodando e configurar a variável `DATABASE_URI` no `.env`.
- As rotas de _/appointments_ são protegidas por autenticação JWT.
