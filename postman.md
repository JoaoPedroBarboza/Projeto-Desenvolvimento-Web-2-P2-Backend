# Guia de Testes no Postman - Sistema de Gestão Financeira

## Preparação Inicial

### 1. Configurar o Banco de Dados
Execute os comandos SQL do arquivo `adm/sql.txt` no MySQL para criar:
- Banco de dados: `financeiro`
- Tabela: `usuarios`
- Tabela: `transacoes_financeiras`

### 2. Configurar Variáveis de Ambiente (.env)
No arquivo `.env` da pasta `projeto-final`, configure:
```
USUARIO_BD=root
SENHA_BD=sua_senha_aqui
```

### 3. Instalar Dependências
Abra o terminal na pasta `projeto-final` e execute:
```bash
npm install
```

### 4. Iniciar o Servidor
```bash
npm start
```
A API deve estar rodando em: `http://localhost:3000`

---

## Testando os Endpoints no Postman

### PASSO 1: Login (Gerar Token JWT)

**Método:** `POST`  
**URL:** `http://localhost:3000/login`

**Headers:**
- `Content-Type: application/x-www-form-urlencoded`

**Body (x-www-form-urlencoded):**
- `username`: admin
- `password`: 1234

**Resultado Esperado (Status 200):**
```json
{
    "success": true,
    "nome": "admin",
    "email": "admin@gestorfinancas.com",
    "tokenAcesso": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**IMPORTANTE:** Copie o valor de `tokenAcesso` - você precisará dele nos próximos testes!

---

### PASSO 2: Listar Transações (GET)

**Método:** `GET`  
**URL:** `http://localhost:3000/transacoes`

**Headers:**
- `authorization`: COLE_O_TOKEN_AQUI

**Resultado Esperado (Status 200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "descricao": "Salário Mensal",
            "valor": 3500.00,
            "tipo": "receita",
            "categoria": "salario",
            "data": "2025-01-01",
            "usuario_id": 1
        }
    ]
}
```

---

### PASSO 3: Criar Transação (POST)

**Método:** `POST`  
**URL:** `http://localhost:3000/transacoes`

**Headers:**
- `Content-Type: application/x-www-form-urlencoded`
- `authorization`: COLE_O_TOKEN_AQUI

**Body (x-www-form-urlencoded):**
- `descricao`: Academia Mensal
- `valor`: 99.90
- `tipo`: despesa
- `categoria`: saude
- `data`: 2025-10-29
- `usuario_id`: 1

**Resultado Esperado (Status 201):**
```json
{
    "success": true,
    "message": "Transação cadastrada com sucesso.",
    "id": 7
}
```

---

### PASSO 4: Atualizar Transação (PUT)

**Método:** `PUT`  
**URL:** `http://localhost:3000/transacoes/7` (use o ID da transação criada)

**Headers:**
- `Content-Type: application/x-www-form-urlencoded`
- `authorization`: COLE_O_TOKEN_AQUI

**Body (x-www-form-urlencoded):**
- `descricao`: Academia Mensal - Smart Fit
- `valor`: 89.90

**Resultado Esperado (Status 200):**
```json
{
    "success": true,
    "message": "Transação atualizada com sucesso."
}
```

---

### PASSO 5: Deletar Transação (DELETE)

**Método:** `DELETE`  
**URL:** `http://localhost:3000/transacoes/7` (use o ID da transação)

**Headers:**
- `authorization`: COLE_O_TOKEN_AQUI

**Resultado Esperado (Status 200):**
```json
{
    "success": true,
    "message": "Transação excluída com sucesso."
}
```

---

## Resumo dos Endpoints

| Método | Endpoint | Descrição | Requer Token? |
|--------|----------|-----------|---------------|
| POST | /login | Autenticar e gerar token JWT | Não |
| GET | /transacoes | Listar todas as transações | Sim |
| POST | /transacoes | Criar nova transação | Sim |
| PUT | /transacoes/:id | Atualizar transação existente | Sim |
| DELETE | /transacoes/:id | Deletar transação | Sim |

---

## Possíveis Erros e Soluções

### Erro 401: "Token não informado" ou "Token Inválido"
- Verifique se você copiou o token corretamente
- Faça login novamente para gerar um novo token
- O token expira em 1 hora (3600 segundos)

### Erro 400: "Campos obrigatórios"
- Confira se todos os campos necessários foram preenchidos
- Verifique a ortografia dos nomes dos campos

### Erro 404: "Transação não encontrada"
- Verifique se o ID da transação existe
- Use o endpoint GET /transacoes para listar os IDs válidos

### Erro 500: "Erro interno"
- Verifique se o banco de dados está rodando
- Confira as configurações do arquivo .env
- Verifique os logs do servidor no terminal

---

## Dicas para o Vídeo de Apresentação

1. **Mostre o código:** Explique a estrutura do projeto (conexaobd.js, autenticacaoJwt.js, index.js)
2. **Destaque a segurança:** Mostre que os endpoints de transações exigem token JWT
3. **Demonstre no Postman:** Siga a ordem dos passos acima
4. **Explique os status HTTP:** 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)
5. **Mostre o banco de dados:** Abra o MySQL Workbench e mostre as tabelas sendo populadas/alteradas
