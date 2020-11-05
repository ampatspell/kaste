import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RouteDownloadsDownloadIndexComponent extends Component {

  @action
  open() {
    window.open(this.args.model.url, 'top');
  }

}
