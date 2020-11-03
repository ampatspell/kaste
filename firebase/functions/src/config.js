const assert = require('assert');

const validate = (ok, message) => assert(ok, `Firebase config: ${message}`);

const normalizeUsers = (root={}) => {
  let { admin } = root;
  validate(admin, 'users.admin is required');
  return {
    admin
  };
}

module.exports = root => {
  let { users } = root;
  return {
    users: normalizeUsers(users)
  };
}
