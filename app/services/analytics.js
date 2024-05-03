import Service from '@ember/service';
import { inject as service } from '@ember/service';

const paramsFor = (info) => {
  let params = Object.assign({}, info.params);
  let parent = info.parent;
  if(parent) {
    params = Object.assign(params, paramsFor(parent));
  }
  return params;
}

export default class Analytics extends Service {

  @service router;
  @service store;

  get analytics() {
    return this.store.firebase.analytics();
  }

  pathFor(name, params) {
    if(Object.keys(params).length > 0) {
      return this.router.urlFor(name, params);
    } else {
      return this.router.urlFor(name);
    }
  }

  logEvent(name, opts) {
    this.analytics.logEvent(name, opts);
  }

  onTransition(transition) {
    let name = transition.to.name;
    let params = paramsFor(transition.to);
    this.logEvent('screen_view', {
      firebase_screen: this.pathFor(name, params)
    });
  }

  onDownload(filename) {
    this.logEvent('download', { filename });
  }

}
