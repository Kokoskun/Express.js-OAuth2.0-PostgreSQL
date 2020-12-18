const UserService = require("./user.service");
const outputResponse = require("../../../utils/output.response");
// Create and Save a new User
exports.create = (req, res) => {
  const body = req.body;
  const password = body.password;
  const email = body.email;
  if (email && password && password.length >= 6) {
    const user = {
      email: email.toLowerCase(),
      password: password,
      first_name: body.first_name ? body.first_name : null,
      last_name: body.last_name ? body.last_name : null
    };
    UserService.create(user)
      .then(data => {
        let id = null;
        if (data) {
          id = data.id;
        }
        return outputResponse.ok(res, {
          id: id
        });
      })
      .catch(err => {
        const errName = err.name;
        if (errName && errName === "SequelizeUniqueConstraintError") {
          return outputResponse.badRequest(res, null, "Email is already in use!");
        } else {
          return outputResponse.internalServerError(res, null, "Some error occurred during service");
        }
      });
  } else {
    return outputResponse.badRequest(res, null, "Email, Password can not be empty and Password more than 6 characters");
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const query = req.query;
  const body = {
    email: query.email,
    first_name: query.first_name,
    last_name: query.last_name
  };
  UserService.findAll(body)
    .then(data => {
      let array = [];
      if (data) {
        array = data;
      }
      return outputResponse.ok(res, {
        count: array.length,
        data: array
      });
    })
    .catch(err => {
      return outputResponse.internalServerError(res, null, "Some error occurred during service");
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  UserService.findOne(id)
    .then(data => {
      if (data) {
        return outputResponse.ok(res, data);
      } else {
        return outputResponse.badRequest(res, null, "User Not Found");
      }
    })
    .catch(err => {
      return outputResponse.internalServerError(res, null, "Some error occurred during service");
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const password = body.password;
  const email = body.email;
  const firstName = body.first_name;
  const lastName = body.last_name;
  let isBody = false;
  let user = {};
  if (email) {
    isBody = true;
    user.email = email.toLowerCase();
  }
  if (password) {
    if (password.length >= 6) {
      isBody = true;
      user.password = password;
    } else {
      return outputResponse.badRequest(res, null, "Password more than 6 characters");
    }
  }
  if (firstName) {
    isBody = true;
    user.first_name = firstName;
  }
  if (lastName) {
    isBody = true;
    user.last_name = lastName;
  }
  if (isBody) {
    UserService.update(user, id)
      .then(data => {
        let result = {};
        if (data && data[1]) {
          result = data[1];
        }
        return outputResponse.ok(res, result);
      })
      .catch(err => {
        const errName = err.name;
        if (errName && errName === "SequelizeUniqueConstraintError") {
          return outputResponse.badRequest(res, null, "Email is already in use!");
        } else {
          return outputResponse.internalServerError(res, null, "Some error occurred during service Or User was not found!");
        }
      });
  } else {
    return outputResponse.badRequest(res, null, `Cannot update User with id=${id}. Body is empty!`);
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  UserService.destroy(id)
    .then(num => {
      if (num > 0) {
        res.send({
          count: num
        });
      } else {
        return outputResponse.badRequest(res, null, "User Not Found");
      }
    })
    .catch(err => {
      return outputResponse.internalServerError(res, null, "Some error occurred during service");
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  UserService.destroyAll()
    .then(nums => {
      res.send({
        count: nums
      });
    })
    .catch(err => {
      return outputResponse.internalServerError(res, null, "Some error occurred during service");
    });
};
