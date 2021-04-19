import ZugletObject from 'zuglet/object';
import { tracked } from '@glimmer/tracking';
import { or, not, bool } from 'macro-decorators';
import { models } from 'zuglet/decorators';

const files = models()
  .source(({ _files }) =>  _files)
  .named('pages/uploads/new/file')
  .mapping(file => ({ file }));

export default class PagesUploadsNew extends ZugletObject {

  @tracked _files;

  onFiles(files) {
    this._files = files;
  }

  @files files;

  @bool('files.length')
  isValid;

  get errors() {
    return this.files.map(file => file.error).filter(Boolean);
  }

  get error() {
    return this.errors?.[0];
  }

  @bool('error')
  isError;

  @not('isValid')
  isInvalid;

  get isBusy() {
    return !!this.files.find(file => file.isBusy);
  }

  @or('isInvalid', 'isBusy')
  isUploadDisabled;

  get progress() {
    let { files } = this;
    let total = files.reduce((total, { progress }) => {
      if(progress) {
        total = total + progress;
      }
      return total;
    }, 0);
    return Math.round(total / files.length);
  }

  async upload() {
    if(this.isUploadDisabled) {
      return;
    }

    await Promise.all(this.files.map(file => file.upload()));

    if(this.error) {
      return { status: 'error' };
    }

    if(this.files.length === 1) {
      let { id } = this.files[0];
      return {
        status: 'success',
        id
      };
    }

    return { status: 'success' };
  }

}
