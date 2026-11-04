<template>
  <div class="home">
    <section>
      <v-parallax src="../assets/bg.jpg" height="800" alt="BG">
        <v-overlay absolute color="#000000" opacity="0.8">
          <div class="d-flex flex-column align-center justify-center">
            <h1 class="white--text mb-2 display-2 text-center text-md-left">
              Malaysian top 10 voting
            </h1>
            <div class="white--text subtitle-1 text-center text-md-left">
              osu! Malaysia yearly top 10 voting for the year 2026
            </div>
            <div class="grey--text subtitle-2 mb-4 text-center text-md-left">
              Currently at <b>{{ totalVotes }}</b> submissions.
            </div>
          </div>

          <div class="d-flex mt-3 align-center justify-center">
            <v-btn large to="/vote" color="red" v-if="loggedIn">
              Start voting
            </v-btn>

            <v-btn
              large
              color="pink"
              v-if="!loggedIn"
              @click="logIn()"
              :loading="loggingIn"
            >
              Log in to start voting
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

@Component({})
export default class Home extends Vue {
  @auth.State
  loggedIn!: boolean;

  @auth.State
  loggingIn!: boolean;

  @auth.Action
  logIn!: () => void;

  @vote.State
  totalVotes!: number;

  @vote.Action
  getTotalVotes!: () => void;

  mounted() {
    this.getTotalVotes();
  }
}
</script>
