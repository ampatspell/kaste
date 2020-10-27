import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RouteSessionNewComponent extends Component {

  @service
  router

  @action
  async perform() {
    if(!await this.args.model.perform()) {
      return;
    }
    this.router.transitionTo('index');
  }

}
