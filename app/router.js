import EmberRouter from '@ember/routing/router';
import config from 'kaste/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {

  this.route('session', function() {
    this.route('new');
    this.route('delete');
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
