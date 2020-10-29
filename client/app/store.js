import Store from 'zuglet/store';
import { reads } from 'macro-decorators';
import environment from './config/environment';

let {
  kaste: {
    firebase,
    isDevelopment
  }
} = environment;

const options = {
  firebase,
  firestore: {
    persistenceEnabled: true
  },
  auth: {
    user: 'user'
  },
  functions: {
    region: null
  }
};

export default class DummyStore extends Store {

  options = options
  isDevelopment = isDevelopment

  @reads('auth.user')
  user

  async signOut() {
    await this.auth.signOut();
  }

}
