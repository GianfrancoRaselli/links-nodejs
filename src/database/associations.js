const User = require("./models/User");
const Link = require("./models/Link");

User.hasMany(Link, { as: "links", foreignKey: "id_user" });
Link.belongsTo(User, { as: "user", foreignKey: "id_user" });