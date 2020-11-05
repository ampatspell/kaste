import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RouteUploadsUploadIndexComponent extends Component {

  @service
  router

  get url() {
    let path = this.router.urlFor('downloads.download', this.args.model.id);
    let origin = window.location.origin;
    return `${origin}${path}`;
  }

  @tracked
  isDeleting = false

  @action
  async delete() {
    this.isDeleting = true;
    await this.args.model.delete();
    this.router.transitionTo('uploads');
  }

}
