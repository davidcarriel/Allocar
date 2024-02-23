const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('allocar', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log('Conexão com o banco de dados efetuada'); // Retirar depois
}).catch(function(){
    console.log('Erro na autenticação com o banco de dados'); // Retirar depois
})

module.exports = sequelize;