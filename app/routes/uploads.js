import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { route } from 'zuglet/decorators';

@route()
export default class UploadsRoute extends Route {

  @service
  store

  beforeModel() {
    if(!this.store.user) {
      this.transitionTo('index');
      return;
    }
    if(!this.store.user.isUploader) {
      this.transitionTo('session.denied');
      return;
    }
  }

  model() {
    return this.store.user.uploads;
  }

  async load(uploads) {
    await uploads.load();
  }

}
