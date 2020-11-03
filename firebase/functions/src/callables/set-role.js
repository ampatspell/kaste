module.exports = app => app.functions.https.onCall((data, context) => {

  const { withValidatedAdmin, error } = require('./utils')(app);

  return withValidatedAdmin(context, async () => {

    if(!data.uid) {
      return error('data.uid is required');
    }

    if(!data.role) {
      data.role = null;
    }

    let auth = app.auth;
    try {
      await auth.setCustomUserClaims(data.uid, {
        role: data.role
      });
    } catch(err) {
      return error(`${err.message} ${err.code}`);
    }

    return {
      status: 'success',
      uid: data.uid,
      role: data.role
    };
  });
});
