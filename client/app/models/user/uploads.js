import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';
import { activate, models } from 'zuglet/decorators';
import { load } from 'zuglet/utils';

export default class Uploads extends EmberObject {

  @service
  store

  @activate().content(({ store }) => store.collection('uploads').query())
  query

  @models('query.content').named('user/upload').mapping(doc => ({ doc }))
  models

  async load() {
    load(this.query);
  }

}
