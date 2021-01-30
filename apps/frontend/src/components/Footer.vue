<template>
  <v-footer app padless absolute>
    <v-card flat tile width="100%" class="lighten-1 text-center">
      <v-card-text>
        <v-btn class="mx-4 white--text" icon href="https://twitter.com/loliwatcher" target="_blank"><v-icon size="24px">mdi-twitter</v-icon></v-btn>
        <v-btn class="mx-4 white--text" icon href="https://discord.gg/wTH32DSJUF" target="_blank"><v-icon size="24px">mdi-discord</v-icon></v-btn>
        <v-btn class="mx-4 white--text" icon href="https://hwc.hr" target="_blank"><v-icon size="24px">mdi-web</v-icon></v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="pb-0">
        Created by <strong>hallowatcher</strong>.
      </v-card-text>

      <v-card-text class="pt-0">
        {{ new Date().getFullYear() }} – plz enjoy game
      </v-card-text>
    </v-card>
  </v-footer>
</template>
