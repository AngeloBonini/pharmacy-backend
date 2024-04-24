const Sequelize = require('sequelize');
const db = require('./db');

const Transacao = db.define('transacao', {
    id_pessoa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_transacao: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    valor_transacao: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }


});

//cria a tabela
//Transacao.sync();


module.exports = Transacao;
