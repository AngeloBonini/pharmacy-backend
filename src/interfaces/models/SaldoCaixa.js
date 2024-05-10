const Sequelize = require('sequelize');
const db = require('./db');

const SaldoCaixa = db.define('saldocaixa', {
    id_pessoa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    saldo: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }

});

//cria a tabela
//SaldoCaixa.sync();


module.exports = SaldoCaixa;
