import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';

const dictionary = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  5: 'fifth',
  6: 'sixth',
  7: 'seventh',
  8: 'eighth',
  9: 'ninth',
  10: 'tenth'
};

@Module({ namespaced: true })
export default class Vote extends VuexModule {
  first = null;
  second = null;
  third = null;
  fourth = null;
  fifth = null;
  sixth = null;
  seventh = null;
  eighth = null;
  ninth = null;
  tenth = null;

  get getVote() {
    return (voteRank: number) => {
      return this[dictionary[voteRank]];
    };
  }

  @Mutation
  setVote(payload: { voteRank: number, userId: number }) {
    console.log(payload);
    this[dictionary[payload.voteRank]] = payload.userId;
  }

  @Action
  vote(payload: { voteRank: number, userId: number }) {
    this.context.commit('setVote', payload);
  }

  @Action
  submit() {
    // Todo
  }
}
