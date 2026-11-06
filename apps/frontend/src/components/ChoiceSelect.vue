<template>
  <div class="mb-4">
    <v-autocomplete :value="selectedChoice" :items="choices" color="white" item-text="username" item-value="id" :label="'#' + fieldForRank + ' Malaysian player'" hide-details="auto" @change="selectChoice">
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
            <img alt="MY" :src="'https://a.ppy.sh/' + data.item.id">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.username"></v-list-item-title>
            <v-list-item-subtitle>#{{ data.item.rank || '?' }} Global, #{{ data.item.countryRank }} MY</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>

    <v-textarea
      v-if="selectedChoice"
      :value="remarks"
      @input="updateRemarks"
      rows="1"
      auto-grow
      dense
      placeholder="Optional remarks for this player (shown on their results page)..."
      prepend-inner-icon="mdi-comment-text-outline"
      class="mt-1 ml-4"
      hide-details="auto"
      counter="500"
      maxlength="500"
    ></v-textarea>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class ChoiceSelect extends Vue {
    @Prop() choices: any[];
    @Prop() selectedChoice: number;
    @Prop() remarks: string;
    @Prop() fieldForRank: number;
    @Emit() selectChoice() { return; }
    @Emit() updateRemarks(val: string) { return val; }
  }
</script>
