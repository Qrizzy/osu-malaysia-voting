<template>
  <v-app>
    <template v-if="checked">
      <Header :username="username" :avatar-url="avatar" :logged-in="loggedIn" :logging-in="loggingIn" :logging-out="loggingOut" v-on:log-in="logIn()" v-on:log-out="logOut()" />

      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>

      <Footer />
    </template>

    <template v-else><Loading /></template>
  </v-app>
</template>

<style lang="scss">
  .logo {
    height: 60%;
    width: auto;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';
  import Loading from './components/Loading.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  const auth = namespace('Auth');

  @Component({
    components: {
      Loading,
      Header,
      Footer
    }
  })
  export default class App extends Vue {
    @auth.State
    loggedIn!: boolean;

    @auth.State
    loggingIn!: boolean;

    @auth.State
    loggingOut!: boolean;

    @auth.State
    checked!: boolean;

    @auth.Action
    logIn!: () => void;

    @auth.Action
    logOut!: () => void;

    @auth.Action
    checkLoggedIn!: () => void;

    @auth.Getter
    username!: string;

    @auth.Getter
    avatar!: string;

    mounted() {
      this.checkLoggedIn();
    }
  }
</script>
