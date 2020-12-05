import ZugletObject from 'zuglet/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PagesSessionBase extends ZugletObject {

  @service
  store

  @tracked isBusy
  @tracked error

  async perform() {
    if(this.isBusy) {
      return;
    }

    this.error = null;
    this.isBusy = true;

    try {
      await this.store.auth.methods.popup.google.signIn();
      return true;
    } catch(err) {
      this.error = err;
      return false;
    } finally {
      this.isBusy = false;
    }
  }

}
