import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { reads } from 'macro-decorators';

export default class BlockApplicationHeaderComponent extends Component {

  @service
  store

  @reads('store.user.email')
  email

  defaultName = 'Maija Sjomkāne'

  get name() {
    return this.email || this.defaultName;
  }

}
