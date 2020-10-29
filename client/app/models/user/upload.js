import EmberObject from '@ember/object';
import { reads } from 'macro-decorators';
import { formatBytes, formatContentType, formatTimestamp } from '../../utils';

const data = name => reads(`doc.data.${name}`);

export default class Uploads extends EmberObject {

  doc = null

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

  get formattedSize() {
    return formatBytes(this.size);
  }

  get formattedContentType() {
    return formatContentType(this.contentType);
  }

  get formattedTimestamp() {
    return formatTimestamp(this.createdAt);
  }

}
