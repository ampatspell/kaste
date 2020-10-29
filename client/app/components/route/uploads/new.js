import Component from '@glimmer/component';
import { action } from '@ember/object';
import { reads } from 'macro-decorators';
import { alive } from 'zuglet/utils';
import { inject as service } from '@ember/service';

export default class RouteUploadsNewComponent extends Component {

  @service
  router

  @reads('args.model')
  model

  @action
  onFile(file) {
    this.model.file = file;
  }

  @alive()
  didUpload({ id }) {
    this.router.transitionTo('uploads.upload', id);
  }

  @action
  async onSubmit() {
    let { status, id } = await this.model.upload();
    if(status === 'success') {
      this.didUpload({ id });
    }
  }

}
