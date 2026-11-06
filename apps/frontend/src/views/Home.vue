<template>
  <div class="home">
    <section>
      <v-parallax src="../assets/bg.jpg" height="800" alt="BG">
        <v-overlay absolute color="#000000" opacity="0.8">
          <div class="d-flex flex-column align-center justify-center">
            <h1 class="white--text mb-2 display-2 text-center text-md-left">
              osu! Malaysia Top 10 Players 2026
            </h1>
            <div class="white--text subtitle-1 text-center text-md-left">
              osu! Malaysia yearly top 10 voting for the year 2026
            </div>
            <div class="grey--text subtitle-2 mb-4 text-center text-md-left">
              Currently at <b>{{ totalVotes }}</b> submissions.
            </div>
          </div>

          <div class="d-flex mt-3 align-center justify-center">
            <template v-if="isVotingOpen || isDev">
              <v-btn large to="/vote" color="pink" v-if="loggedIn">
                {{ isVotingOpen ? 'Start voting' : 'Start voting (Dev)' }}
              </v-btn>

              <v-btn
                large
                color="pink"
                v-if="!loggedIn"
                @click="logIn()"
                :loading="loggingIn"
              >
                {{ isVotingOpen ? 'Log in to start voting' : 'Log in (Dev)' }}
              </v-btn>
            </template>

            <v-btn large disabled v-else>
              {{ hasVotingEnded ? 'Voting has ended' : 'Voting opens on 30.11.2026' }}
            </v-btn>

            <v-btn large to="/past" class="ml-3" text>
              Past results
            </v-btn>

            <v-btn large to="/about" class="ml-3" text>
              About
            </v-btn>
          </div>
        </v-overlay>
      </v-parallax>
    </section>
  </div>
</template>

<style lang="scss">
.home {
  margin: -12px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const auth = namespace('Auth');
const vote = namespace('Vote');

const VOTING_OPEN_DATE = new Date('2026-11-30T00:00:00+08:00');
const VOTING_CLOSE_DATE = new Date('2026-12-30T23:59:59+08:00');

@Component({})
export default class Home extends Vue {
  @auth.State
  loggedIn!: boolean;

  @auth.State
  loggingIn!: boolean;

  @auth.State
  currentUser!: any;

  @auth.Action
  logIn!: () => void;

  @vote.State
  totalVotes!: number;

  @vote.Action
  getTotalVotes!: () => void;

  get isDev(): boolean {
    return Boolean(
      (this.currentUser && (this.currentUser.id === 8226107 || (this.currentUser.username && this.currentUser.username.toLowerCase() === 'chiyuu'))) ||
      (this.$route && this.$route.query && this.$route.query.dev !== undefined)
    );
  }

  get isVotingOpen(): boolean {
    const now = new Date();
    return now >= VOTING_OPEN_DATE && now <= VOTING_CLOSE_DATE;
  }

  get hasVotingEnded(): boolean {
    return new Date() > VOTING_CLOSE_DATE;
  }

  mounted() {
    this.getTotalVotes();
  }
}
</script>
