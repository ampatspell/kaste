import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RouteDownloadsDownloadIndexComponent extends Component {

  @service analytics;

  @action
  open() {
    this.analytics.onDownload(this.args.model.filename);
    window.open(this.args.model.url, 'top');
  }

}
