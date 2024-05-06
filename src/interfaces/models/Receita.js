const Sequelize = require('sequelize');
const db = require('./db');

const Receita = db.define('receitas', {
    id_receita: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_pessoa_cliente: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    data_emissao: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    id_produto: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

});

//cria a tabela
//Receita.sync();


module.exports = Receita;
