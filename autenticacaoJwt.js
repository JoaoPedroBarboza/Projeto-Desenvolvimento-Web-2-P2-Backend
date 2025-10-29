var jwt = require('jsonwebtoken');

exports.gerarTokenJwt = async function (idUsuario) {
   return jwt.sign({ 'CodUsuario': idUsuario }, 'Componente@Programacao-Web-II', { expiresIn: 60 });
};

exports.verificaTokenJwt = async function (req, res, next) {
   const token = req.headers['authorization'];

   if (!token) return res.status(401).json({ auth: false, message: 'Token não informado.' });

   jwt.verify(token, 'Componente@Programacao-Web-II', function (err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Token Inválido.' });

      var decoded = jwt.decode(token, { complete: true });
      console.log('Decodificando Token:', decoded.payload.CodUsuario, decoded.payload);
      next();
   });
};
