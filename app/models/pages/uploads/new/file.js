import ZugletObject from 'zuglet/object';
import { tracked } from '@glimmer/tracking';
import { reads } from 'macro-decorators';
import { inject as service } from '@ember/service';
import { activate } from 'zuglet/decorators';

export default class PagesUploadsNewFile extends ZugletObject {

  @service
  store;

  file = null;

  @tracked error = null;
  @tracked isBusy = false;

  constructor(owner, { file }) {
    super(owner);
    this.file = file;
  }

  @activate()
  task;

  @reads('task.progress')
  progress;

  @tracked
  doc;

  //

  async _uploadFile({ path, file: data, filename, contentType }) {
    let ref = this.store.storage.ref(path);
    let task = ref.put({
      type: 'data',
      data,
      metadata: {
        contentType,
        contentDisposition: `attachment; filename="${filename}"`
      }
    });

    this.task = task;
    await task.promise;

    let url = await ref.url();

    return {
      url
    };
  }

  async _createDocument({ ref, url, filename, contentType, size }) {
    let { store, store: { user: { uid: owner } } } = this;
    let doc = ref.new({
      owner,
      url,
      filename,
      contentType,
      size,
      createdAt: store.serverTimestamp
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

    let { url } = await this._uploadFile({ path, file, filename, contentType });
    await this._createDocument({ ref, url, filename, size, contentType });

    let { id } = ref;
    this.id = id;
  }

  _didUpload() {
    let { id } = this;
    return { status: 'success' , id };
  }

  async upload() {
    if(this.isSuccess) {
      return this._didUpload();
    }
    this.isBusy = true;
    this.error = null;
    try {
      await this._upload();
      this.isBusy = false;
      this.isSuccess = true;
      return this._didUpload();
    } catch(err) {
      this.error = err;
      this.isBusy = false;
      return { status: 'error' };
    }
  }

}
