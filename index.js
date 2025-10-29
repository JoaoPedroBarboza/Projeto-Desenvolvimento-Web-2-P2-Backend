const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const md5 = require('md5');
const multer = require('multer');
const upload = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = require('./conexaobd');
const autenticacao = require('./autenticacaoJwt.js');

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
   app.use(cors());
   next();
});

// Rota inicial
app.get('/', function (req, res) {
   res.send('API Sistema de Gestão Financeira - Funcionando!');
});

// ============================================
// ENDPOINT DE AUTENTICAÇÃO (LOGIN)
// ============================================
app.post('/login', upload.none(), async function (req, res) {
   try {
      const { username, password } = req.body;

      if (!username || !password) {
         return res.status(400).json({
            success: false,
            message: "Usuário e senha devem ser informados."
         });
      }

      const senhaHash = md5(password);
      const query = 'SELECT * FROM usuarios WHERE username = ? AND senha = ?';
      const [resultado] = await connection.execute(query, [username, senhaHash]);

      if (resultado.length > 0) {
         const token = await autenticacao.gerarTokenJwt(resultado[0].id);
         res.status(200).json({
            success: true,
            nome: resultado[0].username,
            email: resultado[0].email,
            tokenAcesso: token
         });
      } else {
         res.status(401).json({
            success: false,
            message: "Usuário ou Senha inválidos"
         });
      }
   } catch (erro) {
      console.error("Erro ao autenticar:", erro);
      res.status(500).json({
         success: false,
         message: "Erro interno no servidor."
      });
   }
});

// ============================================
// ENDPOINT 1: LISTAR TRANSAÇÕES (GET)
// Método: GET
// Rota: /transacoes
// Requer: Token JWT
// ============================================
app.get('/transacoes', autenticacao.verificaTokenJwt, async function (req, res) {
   try {
      const [transacoes] = await connection.execute('SELECT * FROM transacoes_financeiras ORDER BY data DESC');
      res.status(200).json({
         success: true,
         data: transacoes
      });
   } catch (erro) {
      console.error("Erro ao listar transações:", erro);
      res.status(500).json({
         success: false,
         message: "Erro ao buscar transações."
      });
   }
});

// ============================================
// ENDPOINT 2: CRIAR TRANSAÇÃO (POST)
// Método: POST
// Rota: /transacoes
// Requer: Token JWT
// ============================================
app.post('/transacoes', autenticacao.verificaTokenJwt, upload.none(), async function (req, res) {
   try {
      const { descricao, valor, tipo, categoria, data, usuario_id } = req.body;

      // Validação de campos obrigatórios
      if (!descricao || !valor || !tipo || !categoria || !data || !usuario_id) {
         return res.status(400).json({
            success: false,
            message: "Todos os campos são obrigatórios: descricao, valor, tipo, categoria, data, usuario_id"
         });
      }

      // Validação do tipo (receita ou despesa)
      if (tipo !== 'receita' && tipo !== 'despesa') {
         return res.status(400).json({
            success: false,
            message: "Tipo deve ser 'receita' ou 'despesa'"
         });
      }

      const query = `
            INSERT INTO transacoes_financeiras (descricao, valor, tipo, categoria, data, usuario_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

      const [resultado] = await connection.execute(query, [descricao, valor, tipo, categoria, data, usuario_id]);

      if (resultado.affectedRows > 0) {
         return res.status(201).json({
            success: true,
            message: "Transação cadastrada com sucesso.",
            id: resultado.insertId
         });
      } else {
         return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar transação."
         });
      }

   } catch (erro) {
      console.error("Erro ao criar transação:", erro);
      return res.status(500).json({
         success: false,
         message: "Erro interno ao cadastrar transação."
      });
   }
});

// ============================================
// ENDPOINT 3: ATUALIZAR TRANSAÇÃO (PUT)
// Método: PUT
// Rota: /transacoes/:id
// Requer: Token JWT
// ============================================
app.put('/transacoes/:id', autenticacao.verificaTokenJwt, upload.none(), async function (req, res) {
   try {
      const { id } = req.params;
      const { descricao, valor, tipo, categoria, data } = req.body;

      if (!id || isNaN(parseInt(id))) {
         return res.status(400).json({
            success: false,
            message: "ID de transação inválido."
         });
      }

      // Monta dinamicamente os campos a atualizar
      const campos = [];
      const valores = [];

      if (descricao) {
         campos.push("descricao = ?");
         valores.push(descricao);
      }

      if (valor) {
         campos.push("valor = ?");
         valores.push(valor);
      }

      if (tipo) {
         if (tipo !== 'receita' && tipo !== 'despesa') {
            return res.status(400).json({
               success: false,
               message: "Tipo deve ser 'receita' ou 'despesa'"
            });
         }
         campos.push("tipo = ?");
         valores.push(tipo);
      }

      if (categoria) {
         campos.push("categoria = ?");
         valores.push(categoria);
      }

      if (data) {
         campos.push("data = ?");
         valores.push(data);
      }

      if (campos.length === 0) {
         return res.status(400).json({
            success: false,
            message: "Nenhum campo foi informado para atualização."
         });
      }

      valores.push(id);

      const query = `
            UPDATE transacoes_financeiras
            SET ${campos.join(', ')}
            WHERE id = ?
        `;

      const [resultado] = await connection.execute(query, valores);

      if (resultado.affectedRows > 0) {
         return res.status(200).json({
            success: true,
            message: "Transação atualizada com sucesso."
         });
      } else {
         return res.status(404).json({
            success: false,
            message: "Transação não encontrada."
         });
      }

   } catch (erro) {
      console.error("Erro ao atualizar transação:", erro);
      return res.status(500).json({
         success: false,
         message: "Erro interno ao atualizar transação."
      });
   }
});

// ============================================
// ENDPOINT 4: DELETAR TRANSAÇÃO (DELETE)
// Método: DELETE
// Rota: /transacoes/:id
// Requer: Token JWT
// ============================================
app.delete('/transacoes/:id', autenticacao.verificaTokenJwt, async function (req, res) {
   try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
         return res.status(400).json({
            success: false,
            message: "ID de transação inválido."
         });
      }

      // Verifica se a transação existe
      const [verifica] = await connection.execute(
         "SELECT id FROM transacoes_financeiras WHERE id = ?",
         [id]
      );

      if (verifica.length === 0) {
         return res.status(404).json({
            success: false,
            message: "Transação não encontrada."
         });
      }

      // Deleta a transação
      const [resultado] = await connection.execute(
         "DELETE FROM transacoes_financeiras WHERE id = ?",
         [id]
      );

      if (resultado.affectedRows > 0) {
         return res.status(200).json({
            success: true,
            message: "Transação excluída com sucesso."
         });
      } else {
         return res.status(500).json({
            success: false,
            message: "Erro ao tentar excluir a transação."
         });
      }

   } catch (erro) {
      console.error("Erro ao excluir transação:", erro);
      return res.status(500).json({
         success: false,
         message: "Erro interno ao excluir transação."
      });
   }
});

// Inicia o servidor
app.listen(3000, () => {
   console.log('API Sistema de Gestão Financeira rodando na porta 3000!');
});
