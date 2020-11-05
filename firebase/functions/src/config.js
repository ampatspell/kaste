const assert = require('assert');

const validate = (ok, message) => assert(ok, `Firebase config: ${message}`);

const normalizeEnvironment = (root={}) => {
  let { region } = root;
  validate(region, 'environment.region is required');
  return {
    region
  };
}

const normalizeUsers = (root={}) => {
  let { admin } = root;
  validate(admin, 'users.admin is required');
  return {
    admin
  };
}

module.exports = root => {
  let { environment, users } = root;
  return {
    environment: normalizeEnvironment(environment),
    users: normalizeUsers(users)
  };
}
