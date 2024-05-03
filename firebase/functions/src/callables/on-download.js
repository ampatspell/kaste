const { firestore } = require('firebase-admin');

module.exports = app => app.functions.https.onCall(async (data) => {

  let { id } = data;

  let ref = app.firestore.doc(`uploads/${id}`);

  await ref.update({
    downloads: firestore.FieldValue.increment(1),
  });
});
