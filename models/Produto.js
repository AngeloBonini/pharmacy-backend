const Sequelize = require('sequelize');
const db = require('./db');

const Produto = db.define('produtos', {
    id_produto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    controlado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    preco: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    quantidade: {
        type: Sequelize.INTEGER,
        alowNull: false,  
    }
        
});

//cria a tabela
//Produto.sync();


module.exports = Produto;
