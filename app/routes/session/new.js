import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { route } from 'zuglet/decorators';

@route()
export default class SessionNewRoute extends Route {

  @service
  store

  model() {
    return this.store.models.create('pages/session/new');
  }

}
