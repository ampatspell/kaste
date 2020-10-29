import EmberObject from '@ember/object';
import { reads } from 'macro-decorators';

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

}
