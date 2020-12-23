import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  loggedIn = false;
  loggingIn = false;
  loggingOut = false;
  checked = false;
  currentUser: any = null;

  get username() {
    return this.currentUser?.username;
  }

  get avatar() {
    return this.currentUser?.avatarUrl;
  }

  @Mutation
  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    this.checked = true;
  }

  @Mutation
  setUser(user: any) {
    this.currentUser = user;
  }

  @Mutation
  setLoggingIn(loggingIn: boolean) {
    this.loggingIn = loggingIn;
  }

  @Mutation
  setLoggingOut(loggingOut: boolean) {
    this.loggingOut = loggingOut;
  }

  @Action
  logIn() {
    this.context.commit('setLoggingIn', true);
    window.document.location.href = '/api/auth/login';
  }

  @Action
  logOut() {
    this.context.commit('setLoggingOut', true);
    window.document.location.href = '/api/auth/logout';
  }

  @Action
  async checkLoggedIn() {
    try {
      const response = await axios.get('/api/auth/user');
      this.context.commit('setLoggedIn', true);
      this.context.commit('setUser', response.data);
    } catch {
      this.context.commit('setLoggedIn', false);
    }
  }
}
