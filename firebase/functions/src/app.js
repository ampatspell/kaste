const normalizeConfig = require('./config');

class Application {

  constructor(admin, functions) {
    this.config = normalizeConfig(functions.config());
    this.admin = admin;
    this.functions = functions.region(this.config.environment.region);
    this.auth = admin.auth();
    this.firestore = admin.firestore();
    this.storage = admin.storage();
    this.bucket = this.storage.bucket();

    this.exports = {
      callable_user_setRole: this.require('./callables/set-role'),
      callable_user_getRole: this.require('./callables/get-role'),
      callable_upload_onDownload: this.require('./callables/on-download'),
      uploads_onDelete: this.require('./triggers/uploads/on-delete'),
    };
  }

  require(name) {
    return require(name)(this);
  }

}

module.exports = Application;
