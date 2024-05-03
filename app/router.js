import EmberRouter from '@ember/routing/router';
import config from 'kaste/config/environment';
import { inject as service } from '@ember/service';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  @service analytics;

  constructor() {
    super(...arguments);
    this.on('routeDidChange', (transition) => {
      this.analytics.onTransition(transition);
    });
  }
}

Router.map(function() {

  this.route('session', function() {
    this.route('new');
    this.route('delete');
    this.route('denied');
  });

  this.route('uploads', function() {
    this.route('new');
    this.route('upload', { path: '/:upload_id' }, function() {
    });
  });

  this.route('downloads', { path: '/get' }, function() {
    this.route('download', { path: '/:download_id' }, function() {
    });
  })

});
