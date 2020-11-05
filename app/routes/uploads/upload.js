import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { route } from 'zuglet/decorators';

@route()
export default class UploadsUploadRoute extends Route {

  @service
  store

  model({ upload_id }) {
    let uploads = this.modelFor('uploads');
    let upload = uploads.byId(upload_id);
    if(!upload) {
      this.transitionTo('uploads');
      return;
    }
    return upload;
  }

}
