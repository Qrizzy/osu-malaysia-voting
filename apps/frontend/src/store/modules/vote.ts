import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
import * as moment from 'moment';

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

  errorMessage = null;

  submitting = false;
  submitted = false;

  lastSaved = null;
  totalVotes = 0;

  get getVote() {
    return (voteRank: number) => {
      return this[dictionary[voteRank]];
    };
  }

  @Mutation
  setVote(payload: { voteRank: number, userId: number }) {
    this[dictionary[payload.voteRank]] = payload.userId;
  }

  @Mutation
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  @Mutation
  setSubmitting(submitting: boolean) {
    this.submitting = submitting;
  }

  @Mutation
  setSubmitted(submitted: boolean) {
    this.submitted = submitted;
  }

  @Mutation
  setLastSaved(lastSavedDate: moment.Moment) {
    this.lastSaved = lastSavedDate;
  }

  @Mutation
  setTotalVotes(totalVotes: number) {
    this.totalVotes = totalVotes;
  }

  @Action
  vote(payload: { voteRank: number, userId: number }) {
    this.context.commit('setVote', payload);
    this.context.commit('setErrorMessage', null);
  }

  @Action
  async getTotalVotes() {
    try {
      const result = await axios.get('/api/votes');
      this.context.commit('setTotalVotes', result.data.totalVotes);
    } catch {}
  }

  @Action
  async submit() {
    try {
      this.context.commit('setErrorMessage', null);
      this.context.commit('setSubmitted', false);
      this.context.commit('setSubmitting', true);

      const votes = Object.keys(dictionary).map(e => ({ userId: this[dictionary[e]], ranking: +e }));
      await axios.post('/api/votes', { votes });

      this.context.commit('setSubmitting', false);
      this.context.commit('setSubmitted', true);
      this.context.commit('setLastSaved', moment());
    } catch (e) {
      this.context.commit('setErrorMessage', e.response?.data?.message || e.message);
      this.context.commit('setSubmitting', false);
    }
  }

  @Action
  async getPreviousVotes() {
    const votes = await axios.get('/api/votes/me');

    if (votes.data && votes.data.voteList.length > 0) {
      for (const vote of votes.data.voteList) {
        this.context.commit('setVote', { voteRank: vote.ranking, userId: vote.choiceId });
      }

      this.context.commit('setLastSaved', moment(votes.data.updatedAt));
    }
  }
}
