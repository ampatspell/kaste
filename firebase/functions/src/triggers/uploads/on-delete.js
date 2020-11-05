const {
  assign
} = Object;

module.exports = app => app.functions.firestore.document('uploads/{upload}').onDelete(async snapshot => {

  let { bucket } = app;

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

  let { path } = snapshot.ref;

  console.log('path', path);

  await deleteFile(path, { optional: true });

});
