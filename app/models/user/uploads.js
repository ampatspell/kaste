import ZugletObject from 'zuglet/object';
import { inject as service } from '@ember/service';
import { activate, models } from 'zuglet/decorators';
import { load } from 'zuglet/utils';

export default class Uploads extends ZugletObject {

  @service
  store

  @activate().content(({ store }) => store.collection('uploads').orderBy('createdAt', 'desc').query())
  query

  @models().source(({ query }) => query.content).named('user/upload').mapping(doc => ({ doc }))
  models

  async load() {
    await load(this.query);
  }

  byId(id) {
    return this.models.find(model => model.id === id);
  }

}
