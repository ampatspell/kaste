import { initialize } from 'zuglet/initialize';
import Store from '../store';

export default {
  name: 'kaste:store',
  initialize(app) {
    initialize(app, {
      store: {
        identifier: 'store',
        factory: Store
      }
    });
  }
}
