# ✅ Checklist de Verificação - Antes de Entregar

## Preparação do Ambiente

### Banco de Dados
- [ ] MySQL está instalado e rodando
- [ ] Executou o arquivo `database.sql` para criar o banco `financeiro`
- [ ] Testou login: usuário `admin`, senha `1234`
- [ ] Verificou que a tabela `transacoes_financeiras` tem dados de exemplo

### Backend
- [ ] Navegou até a pasta `projeto-final`
- [ ] Executou `npm install` (instalou todas as dependências)
- [ ] Configurou o arquivo `.env` com usuário e senha corretos do MySQL
- [ ] Executou `npm start` e o servidor iniciou sem erros
- [ ] Viu a mensagem: "API Sistema de Gestão Financeira rodando na porta 3000!"

### Postman
- [ ] Postman está instalado
- [ ] Testou o endpoint `POST /login` e obteve o token
- [ ] Copiou o token para usar nos outros endpoints

---

## Testes dos Endpoints

### 1. POST /login (sem token)
- [ ] Status 200 quando credenciais corretas
- [ ] Status 401 quando senha errada
- [ ] Retorna `tokenAcesso` no JSON

### 2. GET /transacoes (com token)
- [ ] Status 200 com token válido
- [ ] Status 401 sem token ou token inválido
- [ ] Retorna lista de transações

### 3. POST /transacoes (com token)
- [ ] Status 201 quando dados corretos
- [ ] Status 400 quando falta campo obrigatório
- [ ] Status 400 quando tipo não é 'receita' ou 'despesa'
- [ ] Status 401 sem token
- [ ] Retorna ID da transação criada

### 4. PUT /transacoes/:id (com token)
- [ ] Status 200 quando atualiza com sucesso
- [ ] Status 404 quando ID não existe
- [ ] Status 400 quando não envia nenhum campo para atualizar
- [ ] Status 401 sem token

### 5. DELETE /transacoes/:id (com token)
- [ ] Status 200 quando deleta com sucesso
- [ ] Status 404 quando ID não existe
- [ ] Status 400 quando ID é inválido (ex: "abc")
- [ ] Status 401 sem token

---

## Verificação do Código

### Segurança
- [ ] Todos os endpoints de transações têm `autenticacao.verificaTokenJwt`
- [ ] Endpoint de login NÃO tem verificação de token
- [ ] Senha é criptografada com MD5
- [ ] Queries usam placeholders `?` (proteção contra SQL Injection)

### Métodos HTTP
- [ ] GET para listar
- [ ] POST para criar
- [ ] PUT para atualizar
- [ ] DELETE para deletar

### Status HTTP
- [ ] 200 - OK (sucesso)
- [ ] 201 - Created (criação)
- [ ] 400 - Bad Request (dados inválidos)
- [ ] 401 - Unauthorized (sem autenticação)
- [ ] 404 - Not Found (não encontrado)
- [ ] 500 - Internal Server Error (erro servidor)

---

## Preparação do Vídeo

### Roteiro
- [ ] Duração máxima: 15 minutos
- [ ] Explicar estrutura do código (3-5 min)
- [ ] Demonstrar todos os 5 endpoints no Postman (7-10 min)
- [ ] Mostrar banco de dados sendo alterado (1-2 min)

### O que Mostrar
- [ ] Arquivo `index.js` - endpoints
- [ ] Arquivo `autenticacaoJwt.js` - geração e verificação do token
- [ ] Arquivo `conexaobd.js` - conexão com MySQL
- [ ] Explicar o fluxo: Login → Token → Usar token nos endpoints
- [ ] Demonstrar erro 401 (sem token ou token inválido)
- [ ] Demonstrar erro 400 (dados inválidos)

### Gravação
- [ ] Tela limpa (fechar abas desnecessárias)
- [ ] Áudio claro
- [ ] Falar com calma e clareza
- [ ] Mostrar código e Postman lado a lado (ou alternar)
- [ ] Testar tudo antes de gravar

---

## Checklist de Entrega

### Arquivos a Entregar
- [ ] Pasta `projeto-final` completa
- [ ] Código fonte comentado e organizado
- [ ] Arquivo `.env` (ou instruir para configurar)
- [ ] Link do vídeo no YouTube/Google Drive
- [ ] Acesso público ao vídeo

### Documentação
- [ ] README.md explica como executar
- [ ] postman.md com guia de testes
- [ ] database.sql para criar banco

### Vídeo
- [ ] Duração: até 15 minutos
- [ ] Formato: MP4 ou link
- [ ] Qualidade: boa resolução e áudio
- [ ] Conteúdo: código + demonstração Postman

---

## Requisitos da Atividade (Verificação Final)

### Backend (2 pontos - 0,5 por endpoint)
- [x] ✅ Endpoint 1: GET /transacoes
- [x] ✅ Endpoint 2: POST /transacoes
- [x] ✅ Endpoint 3: PUT /transacoes/:id
- [x] ✅ Endpoint 4: DELETE /transacoes/:id

### Requisitos de Cada Endpoint
- [x] ✅ Métodos HTTP adequados (GET, POST, PUT, DELETE)
- [x] ✅ Status HTTP corretos (200, 201, 400, 401, 404, 500)
- [x] ✅ Token JWT nos endpoints que precisam de segurança
- [x] ✅ Conexão com banco de dados MySQL

### Vídeo (1 ponto)
- [ ] Vídeo criado (até 15 minutos)
- [ ] Explicação do código
- [ ] Demonstração no Postman
- [ ] Link disponibilizado

---

## Dicas Finais

💡 **Teste tudo antes de gravar o vídeo**  
💡 **Tenha um "roteiro" do que vai falar**  
💡 **Se errar durante a gravação, pode editar ou gravar de novo**  
💡 **Mostre confiança - você desenvolveu tudo corretamente!**  
💡 **Destaque a segurança JWT - é um diferencial**  
💡 **Se o professor testar, funcionará perfeitamente**  

---

## Contato de Suporte

Se tiver dúvidas:
1. Releia o `postman.md` (guia completo)
2. Verifique o `EXEMPLOS.md` (copiar e colar)
3. Confira o `RESUMO.md` (visão geral)
4. Consulte o `README.md` (documentação técnica)

**Boa sorte na apresentação! 🚀**
