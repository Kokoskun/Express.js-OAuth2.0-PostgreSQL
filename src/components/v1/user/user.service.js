const DB = require("../../../models");
const User = DB.users;
const Op = DB.Sequelize.Op;
exports.create = body => {
  return User.create(body, { returning: ["id"] });
};
exports.findAll = body => {
  const email = body.email;
  const firstName = body.first_name;
  const lastName = body.last_name;
  const attributes = ["id", "email", "first_name", "last_name"];
  if (email || firstName || lastName) {
    let conditions = {};
    if (email) {
      conditions.email = { [Op.iLike]: `%${email}%` };
    }
    if (firstName) {
      conditions.first_name = { [Op.iLike]: `%${firstName}%` };
    }
    if (lastName) {
      conditions.last_name = { [Op.iLike]: `%${lastName}%` };
    }
    return User.findAll({ attributes: attributes, where: conditions });
  } else {
    return User.findAll({ attributes: attributes });
  }
};
exports.findOne = id => {
  return User.findOne({ attributes: ["id", "email", "first_name", "last_name"], where: { id: id } });
};
exports.update = (body, id) => {
  // You must be using Postgres and have set returning: true for this second data to return
  return User.update(body, {
    where: { id: id },
    returning: ["id", "email", "first_name", "last_name"],
    plain: true
  });
};
exports.destroy = id => {
  return User.destroy({ where: { id: id } });
};
exports.destroyAll = () => {
  return User.destroy({ where: {}, truncate: false });
};
