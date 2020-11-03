import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { formatBytes } from '../../utils';

export default class InputFileComponent extends Component {

  @tracked
  file

  get size() {
    return formatBytes(this.file.size);
  }

  @action
  onFiles(e) {
    let files = e.target.files;
    let file = (files && files[0]) || null;
    this.file = file;
    this.args.onFile(file);
  }

}
