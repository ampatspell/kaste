const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

let storage = admin.storage();
let bucket = storage.bucket();

const deleteFile = async (path, opts) => {
  let { optional } = assign({ optional: false }, opts);
  try {
    await bucket.file(path).delete();
    return true;
  } catch(err) {
    if(optional && err.code === 404) {
      return false;
    }
    throw err;
  }
}

module.exports.uploads_onDelete = functions.firestore.document('uploads/{upload}').onDelete(async snapshot => {

  let { path } = snapshot.ref;

  console.log('path', path);

  await deleteFile(path, { optional: true });

});
