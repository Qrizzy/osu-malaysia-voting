<template>
  <v-row class="past">
    <v-col md="6" offset-md="3">
      <v-card v-if="currentUser">
        <v-card-title>2026 Voting</v-card-title>
        <v-card-subtitle>Vote for the top 10 osu! Malaysia Players of 2026</v-card-subtitle>

        <v-card-text>

          <v-expansion-panels focusable class="mb-4">
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold">
                <span><v-icon left color="red">mdi-calculator-variant</v-icon> Scoring Formula &amp; Point Calculation</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                <ul>
                  <li class="mb-2">
                    Players are awarded points from <b>1st – 10th</b> placement linearly:<br>
                    <code>10p, 9p, 8p, 7p, 6p, 5p, 4p, 3p, 2p, 1p</code>
                  </li>
                  <li class="mb-2">
                    <b>Outlier Trimming:</b> One instance of the highest and one instance of the lowest voted placement are removed from every player.<br>
                    <span class="grey--text text--lighten-1 caption">
                      Example: If a player receives point votes of <code>1-5-2-5-3-1-9-10-10-7-6</code>, one each of the <code>1p</code> and <code>10p</code> votes are removed, leaving <code>5-2-5-3-1-9-10-7-6</code>. This enhances accuracy and discourages "boosting" votes.
                    </span>
                  </li>
                  <li>
                    The remaining points are totalled up, and the player with the highest total earns the top spot.
                  </li>
                </ul>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold">
                <span><v-icon left color="amber">mdi-gavel</v-icon> Voting Rules &amp; Eligibility Criteria</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                <h4 class="mb-1">Candidate Eligibility</h4>
                <ul class="mb-3">
                  <li>Must possess the <b>Malaysian flag</b> on their osu! profile.</li>
                  <li>Must be within the <b>top 150 countrywide</b> by the end of the voting period (meeting the minimum pp threshold of the #150 Malaysian player).</li>
                  <li>Must not be inactive throughout the entirety of the voting year.</li>
                </ul>

                <h4 class="mb-1">Voter &amp; List Requirements</h4>
                <ul class="mb-3">
                  <li><b>Anyone from any country can vote!</b></li>
                  <li>Your osu! account must be created prior to the voting cutoff date (before November 1st of the voting year).</li>
                  <li>Your list must contain <b>EXACTLY 10 players</b>—no more, no less. If you wish to mention Honorable Mentions, please share them in the forum thread.</li>
                  <li>Your list <b>cannot contain yourself</b>.</li>
                </ul>

                <h4 class="mb-1">Guidelines &amp; Fair Play</h4>
                <ul class="mb-3">
                  <li>Please vote strictly based on a player's <b>performance during the current voting year</b>. Past years' achievements stay in their respective years.</li>
                  <li><b>Troll voting</b> (disregarding player skill or voting for completely inactive players) will be voided. If your list contains controversial or unpopular placements, it is advised to write a few sentences in the forum post explaining your reasoning.</li>
                  <li>You can freely change and update your votes on the website throughout the voting phase. The voting section will close automatically at the deadline.</li>
                </ul>

                <v-alert dense outlined type="info" class="mt-3 mb-0 caption">
                  We reserve the right to veto any votes that do not abide by the rules stated above. Should there be any rule changes, a notification will be sent to the osu! Malaysia Discord Server. For inquiries, please contact <b>qrizzy</b> on Discord.
                </v-alert>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

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
                      <v-chip small color="success" v-if="isVotingOpen">Eligible to vote</v-chip>
                      <v-chip small color="warning" v-else>{{ hasVotingEnded ? 'Voting closed' : 'Voting opens 30.11.2026' }}</v-chip>
                    </v-chip-group>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-alert border="left" type="info" class="my-4" v-if="!isVotingOpen">
                <template v-if="hasVotingEnded">
                  Voting for 2026 ended on <b>30.12.2026</b>. Thank you for participating!
                </template>
                <template v-else>
                  Voting is currently closed and will open on <b>30.11.2026</b> until <b>30.12.2026</b>.
                </template>
              </v-alert>

              <template v-else>
                <div class="d-flex align-center justify-center my-5" v-if="loadingChoices">
                  <v-progress-circular indeterminate color="primary" width="6" size="46"></v-progress-circular>
                </div>

                <div v-if="!loadingChoices && choices.length > 0">
                  <v-alert id="error" border="left" type="error" v-if="errorMessage">{{errorMessage}}</v-alert>
                  <v-alert id="success" border="left" type="success" v-if="submitted">Submitted successfully! If you submit again, it will replace your previous submission.</v-alert>

                  <ChoiceSelect
                    v-for="index in 10"
                    :key="index"
                    :choices="choices"
                    :selected-choice="getVote(index)"
                    :remarks="getRemark(index)"
                    :field-for-rank="index"
                    @select-choice="selectChoice($event, index)"
                    @update-remarks="updateRemark($event, index)"
                  ></ChoiceSelect>

                  <div class="d-flex align-center justify-end">
                    <span class="font-weight-bold grey--text mr-5" v-if="lastSaved">Last saved {{ lastSaved.fromNow() }}</span>
                    <v-btn @click="submit" color="primary" :loading="submitting">Submit</v-btn>
                  </div>
                </div>
              </template>
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

  const VOTING_OPEN_DATE = new Date('2026-11-30T00:00:00+08:00');
  const VOTING_CLOSE_DATE = new Date('2026-12-30T23:59:59+08:00');

  @Component({
    components: {
      ChoiceSelect
    }
  })
  export default class Vote extends Vue {
    @auth.State currentUser!: any;

    get isVotingOpen(): boolean {
      const now = new Date();
      return now >= VOTING_OPEN_DATE && now <= VOTING_CLOSE_DATE;
    }

    get hasVotingEnded(): boolean {
      return new Date() > VOTING_CLOSE_DATE;
    }

    @choice.State loadingChoices: boolean;
    @choice.State choices: any[];
    @choice.Action getChoices!: () => void

    @vote.State errorMessage!: string;
    @vote.State submitting!: boolean;
    @vote.State submitted!: boolean;
    @vote.State lastSaved!: moment.Moment;
    @vote.Getter getVote!: (voteRank: number) => number
    @vote.Getter getRemark!: (voteRank: number) => string
    @vote.Action vote!: (payload: { voteRank: number, userId: number }) => void
    @vote.Action remark!: (payload: { voteRank: number, remarks: string }) => void
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

    updateRemark(remarks: string, voteRank: number) {
      this.remark({ voteRank, remarks });
    }
  }
</script>
