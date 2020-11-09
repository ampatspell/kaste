import User from 'zuglet/user';
import { model } from 'zuglet/decorators';
import { tracked } from '@glimmer/tracking';

export default class KasteUser extends User {

  @tracked
  isUploader = false

  @model().named(({ isUploader }) => {
    if(isUploader) {
      return 'user/uploads';
    }
  })
  uploads

  async _restoreToken() {
    let { claims } = await this.token({ type: 'json' });
    let { role } = claims || {};
    this.isUploader = role === 'uploader';
  }

  async restore() {
    super.restore(...arguments);
    await this._restoreToken();
    let { uploads } = this;
    if(uploads) {
      await uploads.load();
    }
  }

}
