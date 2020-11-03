import EmberObject from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { or, and, not } from 'macro-decorators';
import { inject as service } from '@ember/service';

export default class PagesSessionBase extends EmberObject {

  @service
  store

  @tracked email
  @tracked password
  @tracked isBusy
  @tracked error

  @and('email', 'password')
  isValid

  @not('isValid')
  isInvalid

  @or('isBusy', 'isInvalid')
  isActionDisabled

  async perform() {
    if(this.isActionDisabled) {
      return;
    }

    this.error = null;
    this.isBusy = true;

    let { store: { auth }, email, password } = this;

    try {
      await this._perform(auth, email, password);
      return true;
    } catch(err) {
      this.error = err;
      return false;
    } finally {
      this.isBusy = false;
    }
  }

}
