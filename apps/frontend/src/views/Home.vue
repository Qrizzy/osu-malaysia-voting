<template>
  <div class="home">
    <section>
      <v-parallax src="../assets/bg.jpg" height="800" alt="BG">
        <v-overlay absolute color="#000000" opacity="0.8">
          <h1 class="white--text mb-2 display-2 text-center text-md-left">German top 10 voting</h1>
          <div class="white--text subtitle-1 mb-3 text-center text-md-left">hallowatcher's yearly German top 10 voting for the year 2020</div>

          <div class="d-flex mt-3">
            <div class="text-center text-md-left">
              <v-btn large to="/vote" color="red" v-if="loggedIn">
                Start voting
              </v-btn>
            </div>

            <div class="text-center text-md-left">
              <v-btn large color="pink" v-if="!loggedIn" @click="logIn()" :loading="loggingIn">
                Log in to start voting
              </v-btn>
            </div>

            <div class="text-center text-md-left">
              <v-btn large to="/about" class="ml-3" text>
                About
              </v-btn>
            </div>
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

  @Component({})
  export default class Home extends Vue {
    @auth.State
    loggedIn!: boolean;

    @auth.State
    loggingIn!: boolean;

    @auth.Action
    logIn!: () => void;
  }
</script>
