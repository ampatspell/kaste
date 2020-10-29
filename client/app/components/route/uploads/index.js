import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RouteUploadsIndexComponent extends Component {

  @service
  router

  @action
  select(upload) {
    let { id } = upload;
    this.router.transitionTo('uploads.upload', id);
  }

}
