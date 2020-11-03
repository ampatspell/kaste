module.exports = app => app.functions.https.onCall((data, context) => {

  const { withValidatedAdmin, error } = require('./utils')(app);

  return withValidatedAdmin(context, async () => {

    if(!data.uid) {
      return error('data.uid is required');
    }

    let auth = app.auth;
    let user;
    try {
      user = await auth.getUser(data.uid);
    } catch(err) {
      return error(`${err.message} ${err.code}`);
    }

    let { uid, email, customClaims } = user;

    let role = customClaims && customClaims.role;

    return {
      status: 'success',
      uid,
      email,
      role
    };
  });
});