import Store from 'zuglet/store';
import { reads } from 'macro-decorators';
import environment from './config/environment';

let {
  kaste: {
    firebase,
    functions
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
  functions
};

export default class DummyStore extends Store {

  options = options

  @reads('auth.user')
  user

  async signOut() {
    await this.auth.signOut();
  }

  async getRole(uid) {
    let { data } = await store.functions.call('callable_user_getRole', { uid });
    return data;
  }

  async setRole(uid, role) {
    let { data } = await store.functions.call('callable_user_setRole', { uid, role });
    return data;
  }

}
