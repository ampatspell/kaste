import Component from '@glimmer/component';
import { inject as service } from '@ember/service'
import { reads } from 'macro-decorators';
import { action } from '@ember/object';
import { setGlobal } from 'zuglet/utils';

export default class BlockStatsComponent extends Component {

  @service
  store

  @reads('store.stores.stats')
  stats

  @action
  select(model) {
    setGlobal({ model });
  }

}
