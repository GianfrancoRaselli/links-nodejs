const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Link extends Model {}
Link.init({
    id_link: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    created_at: DataTypes.DATE
}, {
    sequelize,
    modelName: "links",
    tableName: "links",
    timestamps: false
});

module.exports = Link;