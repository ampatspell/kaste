import User from 'zuglet/user';
import { activate } from 'zuglet/decorators';
import { tracked } from '@glimmer/tracking';

export default class KasteUser extends User {

  @tracked
  isUploader = false

  @activate().content(({ store, isUploader }) => {
    if(!isUploader) {
      return;
    }
    return store.models.create('user/uploads');
  })
  uploads

  async _restoreToken() {
    let { claims } = await this.token({ type: 'json' });
    let { role } = claims || {};
    let isUploader = role === 'uploader';
    if(isUploader !== this.isUploader) {
      this.isUploader = isUploader;
    }
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
