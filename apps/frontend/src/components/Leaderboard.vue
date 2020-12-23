<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left" style="width: 10%;">#</th>
        <th class="text-left" style="width: 75%;">Username</th>
        <th class="text-left" style="width: 15%;"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in leaderboard" :key="user.username">
        <td>{{ user.rank }}</td>
        <td>
          <v-avatar size="36">
            <img :src="'https://a.ppy.sh/' + user.osuId" alt="John">
          </v-avatar>

          <v-badge bordered color="red" content="owc" inline :value="user.owc ? user.owc : false">
            <span class="ml-3">{{ user.username }}</span>
          </v-badge>
        </td>
        <td style="text-align: right;">
          <v-btn x-small text @click="openProfile(user.osuId)">profile</v-btn>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style lang="scss" scoped>
  tr:hover {
    background: transparent !important;
  }
</style>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  export interface User {
    rank: number;
    osuId: number;
    owc?: boolean;
    username: string;
  }

  @Component
  export default class Leaderboard extends Vue {
    @Prop() leaderboard: User[];

    openProfile(osuId: number) {
      window.open(`https://osu.ppy.sh/users/${osuId}`, '_blank');
    }
  }
</script>
