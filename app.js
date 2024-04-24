//const fs = require('fs');
//const https = require('https');
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { authToken } = require('./middlewares/auth');
const Pessoa = require('./models/Pessoa');

app.use(cors());
app.use(express.json());


/*

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert")
};

*/

app.get('/gerente', authToken, async (req, res) => {
  try {
    const gerente = await Pessoa.findAll({
      attributes: ['id_pessoa', 'nome', 'email', 'idade'],
      where: {
        tipo: 'gerente'
      }
    });

    return res.json({
      erro: false,
      gerente
    });
  } catch (error) {
    console.error("Erro ao obter os dados dos gerente:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Erro ao obter os dados dos gerente."
    });
  }
});



app.get('/farmaceutico', authToken, async (req, res) => {
  try {
    const farmaceutico = await Pessoa.findAll({
      attributes: ['id_pessoa', 'nome', 'email', 'password', 'idade'],
      where: {
        tipo: 'farmaceutico'
      }
    });

    return res.json({
      erro: false,
      farmaceutico
    });
  } catch (error) {
    console.error("Erro ao obter os dados completos dos farmaceutico:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Erro ao obter os dados completos dos farmaceutico."
    });
  }
});


////////////////////////////


app.post('/cadastrar', authToken, async (req, res) => {
  var dados = req.body;
  console.log('Dados recebidos:', dados); //teste dos dados que estão chegando

  dados.password = await bcrypt.hash(dados.password, 8);

  console.log('Dados com senha criptografada:', dados); // teste da criptografia da senha

  await Pessoa.create(dados)
    .then(() => {
      return res.json({
        erro: false,
        mensagem: "Pessoa cadastrada com sucesso!"
      });
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Não foi possível cadastrar a pessoa!"
      });
    });
});

app.post('/login', async (req, res) => {

    const pessoa = await Pessoa.findOne({
        attributes: ['id_pessoa', 'nome', 'email', 'password', 'tipo'], 
        where: {
            email: req.body.email
        }
    });

    if(pessoa === null){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: usuario ou senha incorreta! Nenhum usuario com este e-mail"
        });
    }

    if(!(await bcrypt.compare(req.body.password, pessoa.password))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: usuario ou senha incorreta! (Senha incorreta, teste)!"
        });
    }




    var token = jwt.sign({id_pessoa: pessoa.id_pessoa}, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", {
        expiresIn: 1200 //20 min
        //expiresIn: 60 //1 min
        //expiresIn: '7d' // 7 dia
    });

  
  

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token,
        tipo: pessoa.tipo,
        nome: pessoa.nome,
        id_pessoa: pessoa.id_pessoa
    });
});


app.get('/obterInformacoesPessoa', (req, res) => {
  // token do cabeçalho de autorização
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: true, mensagem: 'Token não fornecido' });
  }

  // verificação e decoder do token jwt
  jwt.verify(token, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: true, mensagem: 'Token inválido' });
    }

    // id da pessoa a partir do token
    const pessoaId = decoded.id_pessoa;

    try {
      // consulta no bd para obter informações da pessoa pelo id
      const pessoa = await Pessoa.findOne({
        attributes: ['id_pessoa', 'nome', 'email', 'tipo'],
        where: {
          id_pessoa: pessoaId
        }
      });

      if (!pessoa) {
        return res.status(404).json({ erro: true, mensagem: 'pessoa não encontrada' });
      }

      
      return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token,
        tipo: pessoa.tipo,
        nome: pessoa.nome,
        id_pessoa: pessoa.id_pessoa,
        
    });
    } catch (error) {
      console.error('Erro ao buscar informações da pessoa:', error);
      res.status(500).json({ erro: true, mensagem: 'Erro interno do servidor' });
    }
  });
});





// atualiza os dados do farmaceutico
app.put('/atualizarDadosFarmaceutico/:id_pessoa', authToken, async (req, res) => {
  try {
    const farmaceuticoId = req.params.id_pessoa;
    const novosDados = req.body;

    // farmaceutico existe?
    const farmaceutico = await Pessoa.findOne({ where: { id_pessoa: farmaceuticoId, tipo: 'farmaceutico' } });
    if (!farmaceutico) {
      return res.status(404).json({
        erro: true,
        mensagem: 'farmaceutico não encontrado.'
      });
    }

    // atualiza os dados do farmaceutico
    await farmaceutico.update(novosDados);

    return res.json({
      erro: false,
      mensagem: 'Dados do farmaceutico atualizados com sucesso.'
    });
  } catch (error) {
    console.error("Erro ao atualizar dados do farmaceutico:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Erro ao atualizar os dados do farmaceutico."
    });
  }
});


// atualiza os dados de uma pessoa
app.put('/atualizarDadosPessoa/:id_pessoa', authToken, async (req, res) => {
  try {
    const pessoaId = req.params.id_pessoa;
    const novosDados = req.body;

    // pessoa existe?
    const pessoa = await Pessoa.findOne({ where: { id_pessoa: pessoaId, tipo: 'pessoa' } });
    if (!pessoa) {
      return res.status(404).json({
        erro: true,
        mensagem: 'pessoa não encontrada.'
      });
    }

    // atualiza os dados da pessoa no bd
    await pessoa.update(novosDados);

    return res.json({
      erro: false,
      mensagem: 'Dados da pessoa atualizados com sucesso.'
    });
  } catch (error) {
    console.error("Erro ao atualizar dados da pessoa:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Erro ao atualizar os dados da pessoa."
    });
  }
});


// altera a senha do farmaceutico
app.put('/alterarSenhaFarmaceutico/:id_pessoa', authToken, async (req, res) => {
  try {
    const farmaceuticoId = req.params.id_pessoa;
    const novaSenha = req.body.novaSenha;

    // verifica se o farmaceutico existe
    const farmaceutico = await Pessoa.findOne({ where: { id_pessoa: farmaceuticoId, tipo: 'cliente' } });
    if (!farmaceutico) {
      return res.status(404).json({
        erro: true,
        mensagem: 'farmaceutico não encontrado.'
      });
    }

    // criptografar a nova senha
    const senhaCriptografada = await bcrypt.hash(novaSenha, 8);

    // atualiza a senha do cliente no bd
    await cliente.update({ password: senhaCriptografada });

    return res.json({
      erro: false,
      mensagem: 'Senha do farmaceutico atualizada com sucesso.'
    });
  } catch (error) {
    console.error("Erro ao alterar a senha do farmaceutico:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Erro ao alterar a senha do farmaceutico."
    });
  }
});


// exclui pessoa pelo ID
app.delete('/excluir/:id_pessoa', authToken, async (req, res) => {
  const pessoaId = req.params.id_pessoa;

  try {
    const pessoa = await Pessoa.findByPk(pessoaId);
    
    if (!pessoa) {
      return res.status(404).json({
        erro: true,
        mensagem: 'pessoa não encontrada.'
      });
    }

    await pessoa.destroy();
    
    return res.json({
      erro: false,
      mensagem: 'pessoa excluida com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro ao excluir pessoa.'
    });
  }
});


/////////////////////////////////////////////// createServer


app.listen(8080, () => {
  console.log("Servidor HTTP iniciado na porta 8080: http://localhost:8080");
});

/*
https.createServer(options, app).listen(8080, () => {
  console.log("Servidor HTTPS iniciado na porta 8080: https://localhost:8080");
})
*/