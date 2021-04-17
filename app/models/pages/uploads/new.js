import ZugletObject from 'zuglet/object';
import { tracked } from '@glimmer/tracking';
import { or, not, bool } from 'macro-decorators';
import { models } from 'zuglet/decorators';

export default class PagesUploadsNew extends ZugletObject {

  @tracked _files;

  @models()
    .source(({ _files }) =>  _files)
    .named('pages/uploads/new/file')
    .mapping(file => ({ file }))
  files;

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

  get progress() {
    let { files } = this;
    let total = files.reduce((total, file) => total + file.progress, 0);
    return Math.round(total / files.length);
  }

  @or('isInvalid', 'isBusy')
  isUploadDisabled;

  onFiles(files) {
    this._files = files;
  }

  async upload() {
    if(this.isUploadDisabled) {
      return;
    }

    await Promise.all(this.files.map(file => file.upload()));

    if(this.errors.length) {
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
