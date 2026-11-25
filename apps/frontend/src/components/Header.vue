<template>
  <v-app-bar fixed elevate-on-scroll dense app>
    <img src="../assets/logo.svg" alt="Logo" class="logo mr-2">
    <v-toolbar-title class="text-subtitle-1 text-sm-h6 text-truncate">osu! Malaysia Top 15 Players 2026</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop navigation -->
    <v-toolbar-items class="nav hidden-sm-and-down">
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/past" text>Past results</v-btn>
      <v-btn to="/about" text>About</v-btn>

      <v-divider vertical></v-divider>

      <v-btn
        text
        color="#ff66aa"
        href="https://omy.sh145.site"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vote Site
        <v-icon right small>mdi-open-in-new</v-icon>
      </v-btn>
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
          <v-list-item to="/past">Past results</v-list-item>
          <v-list-item to="/about">About</v-list-item>
          <v-list-item href="https://omy.sh145.site" target="_blank" rel="noopener noreferrer">
            <span class="pink--text text--accent-2">Vote Site</span>
            <v-icon right small color="#ff66aa">mdi-open-in-new</v-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Header extends Vue {}
</script>
