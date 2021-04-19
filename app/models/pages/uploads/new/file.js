import ZugletObject from 'zuglet/object';
import { tracked } from '@glimmer/tracking';
import { reads } from 'macro-decorators';
import { inject as service } from '@ember/service';
import { activate } from 'zuglet/decorators';

export default class PagesUploadsNewFile extends ZugletObject {

  @service
  store;

  file = null;
  ref = null;

  @tracked error = null;
  @tracked isBusy = false;

  constructor(owner, { file }) {
    super(owner);
    this.file = file;
    this.ref = this.store.collection('uploads').doc();
  }

  @reads('ref.id') id;

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
    let { file, ref } = this;

    let filename = file.name;
    let contentType = file.type;
    let size = file.size;
    let path = ref.path;

    let { url } = await this._uploadFile({ path, file, filename, contentType });
    await this._createDocument({ ref, url, filename, size, contentType });
  }

  async upload() {
    if(this.isSuccess) {
      return;
    }
    this.isBusy = true;
    this.error = null;
    try {
      await this._upload();
      this.isBusy = false;
      this.isSuccess = true;
    } catch(err) {
      this.error = err;
      this.isBusy = false;
    }
  }

}
