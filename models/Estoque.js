const Sequelize = require('sequelize');
const db = require('./db');

const Estoque = db.define('estoque', {
    id_estoque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    localizacao: {
        type: Sequelize.STRING,
        allowNull: true,
    }

});

//cria a tabela
//Estoque.sync();


module.exports = Estoque;
