const Sequelize = require('sequelize');
const db = require('./db');

const Pessoa = db.define('pessoas', {
    id_pessoa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    CPF: {
        type: Sequelize.INTEGER,
        alowNull: true,  
    },
    CNPJ: {
        type: Sequelize.INTEGER,
        alowNull: true,  
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: true,

    },
 
    rua: {
        type: Sequelize.STRING,
        allowNull: true,

    },

    bairro: {
        type: Sequelize.STRING,
        allowNull: true,

    },

    cidade: {
        type: Sequelize.STRING,
        allowNull: true,

    },
    
    CEP: {
        type: Sequelize.INTEGER,
        allowNull: true,

    },
    
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['caixa', 'farmaceutico', 'gerente', 'cliente', 'fornecedor']],
        },
    }
});

//cria a tabela
//Pessoa.sync();


module.exports = Pessoa;
