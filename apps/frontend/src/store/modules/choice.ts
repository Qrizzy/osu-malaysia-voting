import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';

@Module({ namespaced: true })
export default class Choice extends VuexModule {
  choices: any[] = [];
  loadingChoices = true;

  @Mutation
  setChoices(choices: any[]) {
    this.choices = choices;
  }

  @Mutation
  setLoadingChoices(loading: boolean) {
    this.loadingChoices = loading;
  }

  @Action
  async getChoices() {
    this.context.commit('setLoadingChoices', true);

    try {
      const response = await axios.get('/api/choices');
      this.context.commit('setLoadingChoices', false);
      this.context.commit('setChoices', response.data);
    } catch {
      this.context.commit('setLoadingChoices', false);
    }
  }
}
