# Sistema de Gestão Financeira - Backend

Backend desenvolvido em Node.js para o sistema de gestão financeira pessoal.

## Estrutura do Projeto

```
projeto-final/
├── index.js              # Arquivo principal com os endpoints
├── conexaobd.js          # Configuração de conexão com MySQL
├── autenticacaoJwt.js    # Funções de autenticação JWT
├── package.json          # Dependências do projeto
├── .env                  # Variáveis de ambiente (não versionar)
├── postman.md            # Guia de testes no Postman
└── README.md             # Este arquivo
```

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL2** - Conexão com banco de dados MySQL
- **JWT (jsonwebtoken)** - Autenticação por token
- **MD5** - Hash de senhas
- **Body-parser** - Parse de requisições
- **CORS** - Controle de acesso
- **Dotenv** - Variáveis de ambiente

## Instalação

1. Certifique-se de ter o Node.js instalado
2. Entre na pasta do projeto:
```bash
cd projeto-final
```

3. Instale as dependências:
```bash
npm install
```

4. Configure o arquivo `.env` com suas credenciais do MySQL

5. Execute o SQL para criar o banco de dados `financeiro` e suas tabelas (arquivo em `adm/sql.txt`)

## Executar

```bash
npm start
```

O servidor iniciará na porta 3000: `http://localhost:3000`

## Endpoints da API

### Autenticação
- **POST /login** - Gerar token JWT (não requer autenticação)

### Transações Financeiras (Todos requerem token JWT)
- **GET /transacoes** - Listar todas as transações
- **POST /transacoes** - Criar nova transação
- **PUT /transacoes/:id** - Atualizar transação existente
- **DELETE /transacoes/:id** - Deletar transação

## Segurança

- Autenticação via JWT (JSON Web Token)
- Senha criptografada com MD5
- Token com expiração de 1 hora
- Validação de dados de entrada
- Queries parametrizadas para evitar SQL Injection

## Banco de Dados

**Banco:** financeiro

**Tabelas:**
- `usuarios` - Armazena dados dos usuários
- `transacoes_financeiras` - Armazena receitas e despesas

## Testes

Consulte o arquivo `postman.md` para instruções detalhadas de como testar todos os endpoints no Postman.
