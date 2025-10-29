# Resumo Executivo - Atividade P2

## Projeto: Sistema de Gestão Financeira - Backend API

### Estrutura Criada

```
projeto-final/
├── index.js              → Servidor Express com 5 endpoints (1 login + 4 CRUD)
├── conexaobd.js          → Conexão com MySQL (banco: financeiro)
├── autenticacaoJwt.js    → Geração e verificação de tokens JWT
├── package.json          → Dependências do projeto
├── .env                  → Configurações do banco de dados
├── database.sql          → Script SQL para criar banco e tabelas
├── postman.md            → Guia completo de testes no Postman
├── README.md             → Documentação do projeto
└── .gitignore            → Arquivos ignorados pelo Git
```

### Endpoints Implementados

#### 1. POST /login (sem autenticação)
- **Função:** Autenticar usuário e gerar token JWT
- **Status:** 200 (sucesso), 401 (credenciais inválidas), 400 (dados faltando)
- **Segurança:** Senha com hash MD5

#### 2. GET /transacoes (com JWT)
- **Função:** Listar todas as transações financeiras
- **Status:** 200 (sucesso), 401 (token inválido), 500 (erro servidor)
- **Segurança:** Requer token JWT válido

#### 3. POST /transacoes (com JWT)
- **Função:** Criar nova transação financeira
- **Status:** 201 (criado), 400 (dados inválidos), 401 (token inválido)
- **Segurança:** Requer token JWT + validação de campos

#### 4. PUT /transacoes/:id (com JWT)
- **Função:** Atualizar transação existente
- **Status:** 200 (sucesso), 404 (não encontrado), 400 (dados inválidos)
- **Segurança:** Requer token JWT + validação de ID

#### 5. DELETE /transacoes/:id (com JWT)
- **Função:** Deletar transação
- **Status:** 200 (sucesso), 404 (não encontrado), 401 (token inválido)
- **Segurança:** Requer token JWT + verificação de existência

### Requisitos Atendidos

✅ **4 Endpoints funcionais** conectados ao banco de dados MySQL  
✅ **Métodos HTTP adequados:** GET, POST, PUT, DELETE  
✅ **Status HTTP corretos:** 200, 201, 400, 401, 404, 500  
✅ **Token JWT** implementado com verificação de segurança  
✅ **Conexão com banco de dados** MySQL (tabela: transacoes_financeiras)  
✅ **Validação de dados** de entrada em todos os endpoints  
✅ **Queries parametrizadas** para evitar SQL Injection  

### Como Executar

1. **Configurar banco de dados:**
   ```bash
   mysql -u root -p < database.sql
   ```

2. **Instalar dependências:**
   ```bash
   cd projeto-final
   npm install
   ```

3. **Configurar .env** (ajustar usuário/senha do MySQL)

4. **Iniciar servidor:**
   ```bash
   npm start
   ```

5. **Testar no Postman** seguindo o guia `postman.md`

### Para o Vídeo de Apresentação

**Estrutura sugerida (15 minutos):**

1. **Introdução (1 min):** Apresentação do projeto e objetivos
2. **Código (5 min):** 
   - Mostrar estrutura de arquivos
   - Explicar autenticacaoJwt.js (geração e verificação)
   - Explicar conexaobd.js (MySQL)
   - Mostrar index.js (endpoints)
3. **Demonstração Postman (7 min):**
   - POST /login (gerar token)
   - GET /transacoes (listar com token)
   - POST /transacoes (criar com token)
   - PUT /transacoes/:id (atualizar)
   - DELETE /transacoes/:id (deletar)
   - Mostrar erros: token inválido, dados faltando
4. **Banco de Dados (1 min):** Mostrar dados no MySQL
5. **Conclusão (1 min):** Recapitular requisitos atendidos

### Observações Importantes

- Backend **independente** do frontend (pasta adm)
- Arquivos PHP da pasta adm **não são utilizados**
- Projeto baseado no exemplo do professor (app-jwt)
- Adaptado para tabela **transacoes_financeiras** do banco **financeiro**
- Token JWT expira em **1 hora** (3600 segundos)
- Usuário de teste: **admin / 1234**

### Critérios de Avaliação

- **0,5 pts por endpoint** = 2 pts total (4 endpoints)
- **1 pt pelo vídeo** de apresentação
- **Total:** 3 pontos possíveis

---

**Desenvolvido para:** Disciplina de Desenvolvimento Web II  
**Data:** Outubro 2025
