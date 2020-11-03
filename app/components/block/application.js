import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class BlockApplicationComponent extends Component {

  @service
  store

}
