import EmberObject from '@ember/object';
import { reads } from 'macro-decorators';
import { formatBytes, formatContentType, formatTimestamp } from '../../utils';
import { inject as service } from '@ember/service';

const data = name => reads(`doc.data.${name}`);

export default class Upload extends EmberObject {

  @service
  store

  doc = null

  @reads('doc.id')
  id

  @data('filename')
  filename

  @data('contentType')
  contentType

  @data('createdAt')
  createdAt

  @data('url')
  url

  @data('size')
  size

  @data('owner')
  owner

  @reads('store.user.uid')
  _uid

  get isOwner() {
    return this._uid === this.owner;
  }

  get formattedSize() {
    return formatBytes(this.size);
  }

  get formattedContentType() {
    return formatContentType(this.contentType);
  }

  get formattedTimestamp() {
    return formatTimestamp(this.createdAt);
  }

  //

  async delete() {
    await this.doc.delete();
  }

}
