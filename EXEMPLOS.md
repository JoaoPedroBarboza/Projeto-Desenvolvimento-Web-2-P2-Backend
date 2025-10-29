# Exemplos de Requisições - Copiar e Colar

## 1. LOGIN - Gerar Token

**URL:** `http://localhost:3000/login`  
**Método:** POST  
**Headers:** `Content-Type: application/x-www-form-urlencoded`

**Body (x-www-form-urlencoded):**
```
username=admin
password=1234
```

**Resposta Esperada:**
```json
{
    "success": true,
    "nome": "admin",
    "email": "admin@gestorfinancas.com",
    "tokenAcesso": "SEU_TOKEN_AQUI"
}
```

---

## 2. GET - Listar Transações

**URL:** `http://localhost:3000/transacoes`  
**Método:** GET  
**Headers:**
```
authorization: SEU_TOKEN_AQUI
```

---

## 3. POST - Criar Transação

**URL:** `http://localhost:3000/transacoes`  
**Método:** POST  
**Headers:**
```
Content-Type: application/x-www-form-urlencoded
authorization: SEU_TOKEN_AQUI
```

**Body (x-www-form-urlencoded):**
```
descricao=Netflix Mensal
valor=45.90
tipo=despesa
categoria=entretenimento
data=2025-10-29
usuario_id=1
```

**Exemplo 2 - Receita:**
```
descricao=Venda Freelance
valor=500.00
tipo=receita
categoria=trabalho
data=2025-10-29
usuario_id=1
```

---

## 4. PUT - Atualizar Transação

**URL:** `http://localhost:3000/transacoes/1`  
**Método:** PUT  
**Headers:**
```
Content-Type: application/x-www-form-urlencoded
authorization: SEU_TOKEN_AQUI
```

**Body (x-www-form-urlencoded) - Exemplo 1:**
```
descricao=Netflix Premium
valor=55.90
```

**Body (x-www-form-urlencoded) - Exemplo 2 (atualizar apenas valor):**
```
valor=49.90
```

---

## 5. DELETE - Deletar Transação

**URL:** `http://localhost:3000/transacoes/7`  
**Método:** DELETE  
**Headers:**
```
authorization: SEU_TOKEN_AQUI
```

---

## Testando Erros Comuns

### Erro: Token não informado
**Teste:** Fazer requisição GET /transacoes SEM o header authorization

**Resposta Esperada (401):**
```json
{
    "auth": false,
    "message": "Token não informado."
}
```

### Erro: Token Inválido
**Teste:** Usar um token errado no header authorization

**Resposta Esperada (401):**
```json
{
    "auth": false,
    "message": "Token Inválido."
}
```

### Erro: Campos obrigatórios faltando
**Teste:** POST /transacoes sem preencher todos os campos

**Resposta Esperada (400):**
```json
{
    "success": false,
    "message": "Todos os campos são obrigatórios: descricao, valor, tipo, categoria, data, usuario_id"
}
```

### Erro: ID inválido
**Teste:** DELETE /transacoes/abc

**Resposta Esperada (400):**
```json
{
    "success": false,
    "message": "ID de transação inválido."
}
```

### Erro: Transação não encontrada
**Teste:** DELETE /transacoes/9999

**Resposta Esperada (404):**
```json
{
    "success": false,
    "message": "Transação não encontrada."
}
```

### Erro: Tipo inválido
**Teste:** POST /transacoes com tipo=gasto (diferente de receita/despesa)

**Resposta Esperada (400):**
```json
{
    "success": false,
    "message": "Tipo deve ser 'receita' ou 'despesa'"
}
```

---

## Ordem de Testes Recomendada para o Vídeo

1. ✅ POST /login → Obter token
2. ✅ GET /transacoes → Listar dados existentes
3. ✅ POST /transacoes → Criar nova (anotar o ID retornado)
4. ✅ GET /transacoes → Mostrar que foi criada
5. ✅ PUT /transacoes/:id → Atualizar a criada
6. ✅ GET /transacoes → Mostrar que foi atualizada
7. ✅ DELETE /transacoes/:id → Deletar a criada
8. ✅ GET /transacoes → Mostrar que foi deletada
9. ❌ GET /transacoes (sem token) → Mostrar erro 401
10. ❌ POST /transacoes (dados incompletos) → Mostrar erro 400
