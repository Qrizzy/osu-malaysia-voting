<template>
  <v-app-bar fixed elevate-on-scroll dense app>
    <img src="../assets/logo.svg" alt="Logo" class="logo mr-2">
    <v-toolbar-title>osu! Malaysia Top 10 Players 2026</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop navigation -->
    <v-toolbar-items class="nav hidden-sm-and-down">
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/about" text>About</v-btn>
      <v-btn to="/vote" text v-if="loggedIn">Vote</v-btn>
      <v-btn to="/past" text>Past results</v-btn>

      <v-divider vertical></v-divider>

      <v-btn v-if="!loggedIn" text @click="logIn()" :loading="loggingIn">Log in</v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="loggedIn" text @click="logOut()" v-on="on" v-bind="attrs" :loading="loggingOut">
            <v-avatar size="28" class="mr-2">
              <img :src="avatarUrl" alt="U">
            </v-avatar>
            Log out
          </v-btn>
        </template>

        <span>Logged in as {{username}}</span>
      </v-tooltip>
    </v-toolbar-items>

    <!-- Mobile navigation -->
    <div class="mobile-nav hidden-md-and-up">
      <v-menu bottom transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/">Home</v-list-item>
          <v-list-item to="/about">About</v-list-item>
          <v-list-item to="/vote" v-if="loggedIn">Vote</v-list-item>
          <v-list-item to="/past">Past results</v-list-item>
          <v-list-item v-if="!loggedIn" @click="logIn()">Log in</v-list-item>
          <v-list-item v-if="loggedIn" @click="logOut()">Log out</v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component
  export default class Header extends Vue {
    @Prop() username: string;
    @Prop() loggedIn: boolean;
    @Prop() loggingIn: boolean;
    @Prop() loggingOut: boolean;
    @Prop() avatarUrl: string;
    @Emit() logIn() { return; };
    @Emit() logOut() { return; };
  }
</script>
