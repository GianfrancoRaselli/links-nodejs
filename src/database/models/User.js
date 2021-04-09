const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class User extends Model { }
User.init({
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The username can not be null"
            },
            len: {
                args: [6, 16],
                msg: "The username has to be between 6 and 16 characters"
            },
            isUnique: async (value, next) => {
                const user = await User.findOne({
                    where: {
                        username: value
                    }
                });
                if (user != null) {
                    throw new Error("The username is already registered");
                } else {
                    next();
                }
            }
        }
    },
    password: DataTypes.STRING,
    fullname: DataTypes.STRING
}, {
    sequelize,
    modelName: "users",
    tableName: "users",
    timestamps: false
});

module.exports = User;