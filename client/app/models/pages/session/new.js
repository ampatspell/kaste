import SessionBase from './-base';

export default class SessioNNew extends SessionBase {

  async _perform(auth, email, password) {
    await auth.methods.email.signIn(email, password);
  }

}
