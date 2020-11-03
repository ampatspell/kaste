import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';
import { activate } from 'zuglet/decorators';
import { load } from 'zuglet/utils';
import { reads } from 'macro-decorators';
import { formatBytes, formatContentType } from '../../../utils';

const data = name => reads(`doc.data.${name}`);

export default class PagesDownloadsDownload extends EmberObject {

  @service
  store

  id = null

  @activate().content(({ store, id }) => store.doc(`uploads/${id}`).existing())
  doc

  @reads('doc.exists')
  exists

  @data('filename')
  filename

  @data('contentType')
  contentType

  @data('url')
  url

  @data('size')
  size

  get formattedSize() {
    return formatBytes(this.size);
  }

  get formattedContentType() {
    return formatContentType(this.contentType);
  }

  async load() {
    let { doc } = this;
    await load(doc);
  }

}
