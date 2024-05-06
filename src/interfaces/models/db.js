const Sequelize = require('sequelize');
// Postgresql no ElephantSQL
const sequelize = new Sequelize("usuario", "bd", "senha", {
    host: "host",
    port:5432,
    dialect: "postgres"
});

sequelize.authenticate()
.then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch( (erro)=> {
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso! Erro gerado: " + erro);
});

module.exports = sequelize;