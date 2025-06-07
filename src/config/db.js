const Sequelize = require('sequelize');

//servidor
const MSSQL_HOST = 'localhost';
const MSSQL_USER = 'sa';
const MSSQL_PASSWORD = '123456789';

//dataBase
const MSSQL_DB = 'escolaDeProgramacao';
const MSSQL_PORT = '1433';
const MSSQL_DIALECT = 'mssql';


const sequelize = new Sequelize(MSSQL_DB, MSSQL_USER, MSSQL_PASSWORD, {
    dialect: MSSQL_DIALECT,
    host: MSSQL_HOST,
    port: MSSQL_PORT
});

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log(`Conexao estabelecida com sucesso!`);
//     } catch (error) {
//         console.error(`Não foi possivel conectar ao banco de dados`, error);
//     }
// }


// testConnection();
module.exports = {sequelize};