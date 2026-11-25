<template>
  <v-app>
    <Header />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <Footer />
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
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  @Component({
    components: {
      Header,
      Footer
    }
  })
  export default class App extends Vue {}
</script>
