import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { formatBytes } from '../../utils';

export default class InputFileComponent extends Component {

  @tracked
  files;

  get size() {
    return formatBytes(this.file.size);
  }

  get total() {
    let { files } = this;
    if(!files || files.length === 0) {
      return null;
    }
    let count = files.length;
    let total = files.reduce((total, file) => total + file.size, 0);
    let size = formatBytes(total);
    return `${count} ${count === 1 ? 'file' : 'files'} (${size} in total)`;
  }

  @action
  onFiles(e) {
    let files = [ ...e.target.files ];
    this.files = files;
    this.args.onFiles(files);
  }

}
