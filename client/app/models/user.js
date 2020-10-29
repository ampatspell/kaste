import User from 'zuglet/user';
import { activate } from 'zuglet/decorators';

export default class KasteUser extends User {

  @activate().content(({ store }) => store.models.create('user/uploads'))
  uploads

  async restore() {
    super.restore(...arguments);
    await this.uploads.load();
  }

}
