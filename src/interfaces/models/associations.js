const Pessoa = require('./Pessoa');
const Estoque = require('./Estoque');
const Produto = require('./Produto');
const Receita = require('./Receita');
const SaldoCaixa = require('./SaldoCaixa');
const Transacao = require('./Transacao');

// associação pessoa - estoque
Pessoa.hasMany(Estoque, { foreignKey: 'id_pessoa' });
Estoque.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });
// associação produto - estoque
Produto.hasMany(Estoque, { foreignKey: 'id_produto' });
Estoque.belongsTo(Produto, { foreignKey: 'id_produto' });
// associação pessoa - receita
Pessoa.hasMany(Receita, { foreignKey: 'id_pessoa_cliente' });
Receita.belongsTo(Pessoa, { foreignKey: 'id_pessoa_cliente' });
// associação pessoa - saldocaixa
Pessoa.hasOne(SaldoCaixa, { foreignKey: 'id_pessoa' });
SaldoCaixa.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });
//associação pessoa - transacao
Pessoa.hasMany(Transacao, { foreignKey: 'id_pessoa' });
Transacao.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });

module.exports = { Pessoa, Estoque, Produto, Receita, SaldoCaixa, Transacao };
