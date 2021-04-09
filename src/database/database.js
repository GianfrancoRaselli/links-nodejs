const { database } = require("./keys");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(database.database, database.user, database.password, {
    host: database.host,
    dialect: "mysql",
    //port: database.port,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;