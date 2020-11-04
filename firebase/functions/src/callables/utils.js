module.exports = app => {

  let { config } = app;

  const error = error => ({ status: 'error', error });

  const withValidatedAdmin = (context, cb) => {
    if(!context.auth) {
      return error('not signed in');
    }
    if(config.users.admin !== context.auth.uid) {
      return error(`${context.auth.uid} is not admin`);
    }
    return cb();
  }

  return {
    error,
    withValidatedAdmin
  };
}