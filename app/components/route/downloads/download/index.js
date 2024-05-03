import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RouteDownloadsDownloadIndexComponent extends Component {

  @service analytics;
  @service store;

  @action
  open() {
    const model = this.args.model;
    this.analytics.onDownload(model.filename);
    this.store.onDownload(this.args.model.id);
    window.open(model.url, 'top');
  }

}
