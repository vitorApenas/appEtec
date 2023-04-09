const Sequelize = require('sequelize');

//Login no banco de dados (mudar isso quando for para um servidor externo)
const sequelize = new Sequelize('dbEtec', 'root', '', {dialect: 'mysql', host:'localhost'});

export default sequelize;