import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { alive, delay } from 'zuglet/utils';


export default class InputButtonConfirmComponent extends Component {

  @tracked
  confiration = false

  @action
  async confirm() {
    this.confiration = true;
    await delay(1000);
    this.onTimeout();
  }

  @alive
  onTimeout() {
    this.confiration = false;
  }

  @action
  confirmed() {
    this.args.onClick();
    this.confiration = false;
  }

}
