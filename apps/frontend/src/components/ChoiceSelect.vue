<template>
  <v-autocomplete :value="selectedChoice" :items="choices" color="white" item-text="username" item-value="id" :label="'#' + fieldForRank + ' German player'" @change="selectChoice">
    <template v-slot:selection="data">
      <v-avatar left size="24" class="mr-2">
        <v-img :src="'https://a.ppy.sh/' + data.item.id"></v-img>
      </v-avatar>
      {{ data.item.username }}
    </template>

    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img alt="DE" :src="'https://a.ppy.sh/' + data.item.id">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.username"></v-list-item-title>
          <v-list-item-subtitle>#{{data.item.rank}} Worldwide, #{{data.item.countryRank}} DE</v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class ChoiceSelect extends Vue {
    @Prop() choices: any[];
    @Prop() selectedChoice: number;
    @Prop() fieldForRank: number;
    @Emit() selectChoice() { return; }
  }
</script>
