import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { route } from 'zuglet/decorators';

@route()
export default class DownloadsDownloadRoute extends Route {

  @service
  store

  model({ download_id: id }) {
    return this.store.models.create('pages/downloads/download', { id });
  }

  async load(model) {
    await model.load();
  }

}
