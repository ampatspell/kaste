import SessionBase from './-base';

export default class PagesSessioNNew extends SessionBase {

  async _perform(auth, email, password) {
    await auth.methods.email.signIn(email, password);
  }

}
