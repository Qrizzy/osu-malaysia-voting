<template>
  <v-row class="past">
    <v-col md="6" offset-md="3">
      <v-card v-if="currentUser">
        <v-card-title>2026 Voting</v-card-title>
        <v-card-subtitle>Vote for the top 10 osu! Malaysia Players of 2026</v-card-subtitle>

        <v-card-text>

          <v-card>
            <v-card-text>
              <h3>Voting format</h3>
              <p>This year's voting will only account for the Malaysian voters in the top 1000 of Malaysia. International votes will still be possible to have a comparison in the end, but will not count towards the final rankings.</p>
              <p>The point distribution will be as follows: 7, 6, 5, 5, 4, 4, 3, 3, 2, 1</p>
              <p>The point multiplier will apply as follows: 1 - 10 MY x5, 11 - 25 MY x4, 26 - 50 MY x3, 50 - 100 MY x2, > 101 MY x1</p>
            </v-card-text>
          </v-card>

          <v-card class="mt-3">
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="'https://a.ppy.sh/' + currentUser.id"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <span>Logged in as <b>{{ currentUser.username }}</b></span>

                    <v-chip-group>
                      <v-chip small v-if="votingCounts" color="success">Voting counts</v-chip>
                      <v-chip small v-if="!votingCounts" color="amber">Voting will not count</v-chip>
                      <v-chip small v-if="votingCounts" color="primary">Multiplier <b class="ml-1">x{{multiplier}}</b></v-chip>
                    </v-chip-group>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <div class="d-flex align-center justify-center my-5" v-if="loadingChoices">
                <v-progress-circular indeterminate color="primary" width="6" size="46"></v-progress-circular>
              </div>


              <div v-if="!loadingChoices && choices.length > 0">
                <v-alert id="error" border="left" type="error" v-if="errorMessage">{{errorMessage}}</v-alert>
                <v-alert id="success" border="left" type="success" v-if="submitted">Submitted successfully! If you submit again, it will replace your previous submission.</v-alert>

                <ChoiceSelect v-for="index in 10" :key="index" :choices="choices" :selected-choice="getVote(index)" :field-for-rank="index" @select-choice="selectChoice($event, index)"></ChoiceSelect>

                <div class="d-flex align-center justify-end">
                  <span class="font-weight-bold grey--text mr-5" v-if="lastSaved">Last saved {{ lastSaved.fromNow() }}</span>
                  <v-btn @click="submit" color="primary" :loading="submitting">Submit</v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import * as moment from 'moment';
  import { namespace } from 'vuex-class';
  import ChoiceSelect from '../components/ChoiceSelect.vue';

  const auth = namespace('Auth');
  const choice = namespace('Choice');
  const vote = namespace('Vote');

  @Component({
    components: {
      ChoiceSelect
    }
  })
  export default class Vote extends Vue {
    @auth.State currentUser!: any;

    @choice.State loadingChoices: boolean;
    @choice.State choices: any[];
    @choice.Action getChoices!: () => void

    @vote.State errorMessage!: string;
    @vote.State submitting!: boolean;
    @vote.State submitted!: boolean;
    @vote.State lastSaved!: moment.Moment;
    @vote.Getter getVote!: (voteRank: number) => number
    @vote.Action vote!: (payload: { voteRank: number, userId: number }) => void
    @vote.Action submit!: () => void;
    @vote.Action getPreviousVotes!: () => void;

    votingCounts = false;
    multiplier = 0;
    countryCode = 'MY';
    countryRankLimit = 1000;

    // Votes
    first = null;
    second = null;
    third = null;
    fourth = null;
    fifth = null;
    sixth = null;
    seventh = null;
    eight = null;
    ninth = null;
    tenth = null;

    filteredChoices(slot: number) {
      const votesArray = [this.first, this.second, this.third, this.fourth, this.fifth, this.sixth, this.seventh, this.eight, this.ninth, this.tenth].splice(slot, 1);
      return this.choices.filter(e => votesArray.indexOf(e.id) === -1);
    }

    mounted() {
      this.getChoices();
      this.getPreviousVotes();
      this.setMultiplierAndAbilityToVote();

      this.$store.subscribe(action => {
        if (action.type === 'Vote/setErrorMessage' && action.payload) {
          // Scroll to error
          setTimeout(() => {
            this.$vuetify.goTo('#error', { offset: 100 });
          }, 100);
        }

        if (action.type === 'Vote/setSubmitted' && action.payload) {
          // Success
          setTimeout(() => {
            this.$vuetify.goTo('#success', { offset: 100 });
          }, 100);
        }
      });
    }

    setMultiplierAndAbilityToVote() {
      this.votingCounts = this.currentUser.country === this.countryCode && this.currentUser.countryRank <= this.countryRankLimit;
      if (this.votingCounts) {
        if (this.currentUser.countryRank >= 1 && this.currentUser.countryRank <= 10) {
          this.multiplier = 5;
        }

        if (this.currentUser.countryRank >= 11 && this.currentUser.countryRank <= 25) {
          this.multiplier = 4;
        }

        if (this.currentUser.countryRank >= 26 && this.currentUser.countryRank <= 50) {
          this.multiplier = 3;
        }

        if (this.currentUser.countryRank >= 51 && this.currentUser.countryRank <= 100) {
          this.multiplier = 2;
        }

        if (this.currentUser.countryRank >= 101) {
          this.multiplier = 1;
        }
      }
    }

    selectChoice(userId: number, voteRank: number) {
      this.vote({ voteRank, userId });
    }
  }
</script>
