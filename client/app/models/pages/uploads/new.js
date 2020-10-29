import EmberObject from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { or, not, bool, reads } from 'macro-decorators';
import { inject as service } from '@ember/service';
import { activate } from 'zuglet/decorators';

export default class PagesUploadsNew extends EmberObject {

  @service
  store

  @tracked file = null
  @tracked error = null
  @tracked isBusy = false

  @bool('file')
  isValid

  @bool('error')
  isError

  @not('isValid')
  isInvalid

  @or('isInvalid', 'isBusy')
  isUploadDisabled

  //

  @activate()
  task

  @reads('task.progress')
  progress

  @tracked
  doc

  //

  async _uploadFile({ path, file: data, filename, contentType }) {
    let ref = this.store.storage.ref(path);
    let task = ref.put({
      type: 'data',
      data,
      metadata: {
        contentType,
        contentDisposition: `filename="${filename}"`
      }
    });

    this.task = task;
    await task.promise;

    let url = await ref.url();

    return {
      url
    };
  }

  async _createDocument({ ref, url, filename, contentType }) {
    let doc = ref.new({
      url,
      filename,
      contentType,
      createdAt: this.store.serverTimestamp
    });
    this.doc = doc;
    await doc.save();
  }

  async _upload() {
    let { file, store } = this;

    let filename = file.name;
    let contentType = file.type;
    let size = file.size;

    let ref = store.collection('uploads').doc();
    let path = ref.path;

    let { url } = await this._uploadFile({ path, file, filename, contentType, size });
    await this._createDocument({ ref, url, filename, contentType });

    let { id } = ref;
    return {
      id
    };
  }

  async upload() {
    if(this.isUploadDisabled) {
      return;
    }
    this.isBusy = true;
    this.error = null;
    try {
      let { id } = await this._upload();
      this.isBusy = false;
      return { status: 'success' , id };
    } catch(err) {
      this.error = err;
      this.isBusy = false;
      return { status: 'error' };
    }
  }

}
